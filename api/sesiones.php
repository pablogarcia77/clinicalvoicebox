<?php
  include "config.php";
  include "utils.php";


  $dbConn =  connect($db);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  header("Access-Control-Expose-Headers: Content-Length, X-JSON");
  header("Content-Type: application/json");
  header("Access-Control-Max-Age: 60");
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  return 0;    
  }
  /*
    listar todos los usuarios
  */
  if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    // $GET = json_decode(file_get_contents('php://input'),true);
    if(isset($_GET['terapeuta']) && isset($_GET['paciente'])){
      //Mostrar todos los pacientes de un terapeuta
      $sql = $dbConn->prepare("SELECT s.estado,s.id_sesion,s.fecha,p.apellido,p.nombre FROM sesiones s, pacientes pa, personas p WHERE s.id_paciente=pa.id_paciente AND pa.id_persona=p.id_persona AND s.id_paciente=:paciente AND s.id_terapeuta=:terapeuta");
      $sql->bindValue(':terapeuta', $_GET['terapeuta']);
      $sql->bindValue(':paciente', $_GET['paciente']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      $array = $sql->fetchAll();
      $response['apellido'] = $array[0]['apellido'];
      $response['nombre'] = $array[0]['nombre'];
      $response['sesiones'] = array();
      foreach($array as $sesion){
        $obj = [];
        $obj['id'] = $sesion['id_sesion'];
        $obj['fecha'] = $sesion['fecha'];
        $obj['estado'] = ($sesion['estado'] == 1) ? true : false;
        array_push($response['sesiones'],$obj);
      }
      echo json_encode($response);
      exit();
    }else{
      header("HTTP/1.1 200 OK");
      echo json_encode(false);
    }
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("INSERT INTO sesiones (id_paciente,id_terapeuta) VALUES (:paciente,:terapeuta)");
    $sql->bindValue(':paciente',$personaId);
    $sql->bindValue(':terapeuta',$idProfesion);
    $pac = removeAttr($input,'id_profesion');
    bindAllValues($sql, $pac);

    // echo json_encode($pac);
    try{
      $sql->execute();
      $personaId = $dbConn->lastInsertId();
      if($personaId){
        $input['id'] = $personaId;
        $paciente = $dbConn->prepare("INSERT INTO pacientes (id_persona,id_profesion) VALUES (:id_persona,:id_profesion)");
        $paciente->bindValue(':id_persona',$personaId);
        $paciente->bindValue(':id_profesion',$idProfesion);
        $paciente->execute();
        $input['paciente']['id'] = $dbConn->lastInsertId();
        $input['paciente']['id_profesion'] = $idProfesion;
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
        exit();
      }
    }catch(PDOException $e){
      header("HTTP/1.1 200 OK");
      $code = $e->getCode();
      echo json_encode($e->getMessage());
    }
    
  }

  //Borrar
  if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $id = $_GET['id'];
    $muestra = $_GET['muestra'];
    $statement = $dbConn->prepare("UPDATE pacientes SET muestra=:muestra WHERE id_paciente=:id");
    $statement->bindValue(':id', $id);
    $statement->bindValue(':muestra', $muestra);
    $state = $statement->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode($state);
    exit();
  }

  //Actualizar
  if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
      $_PUT = file_get_contents('php://input');
      $array = json_decode($_PUT,true);
      $fields = getParams($array);
      $sql = "UPDATE pacientes SET $fields WHERE id_paciente=:id_paciente";
      $statement = $dbConn->prepare($sql);
      bindAllValues($statement,$array);
      try{
        $state = $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($state);
      }catch(PDOException $e){
        header("HTTP/1.1 200 ERROR");
        echo json_encode($e->getMessage());
      }
      exit();
  }


  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 Bad Request");

?>