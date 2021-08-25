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
    if (!isset($_GET['paciente'])){
      if(isset($_GET['terapeuta'])){
        //Mostrar todos los pacientes de un terapeuta
        $sql = $dbConn->prepare("SELECT p.id_persona as id, p.apellido,p.nombre,pa.id_paciente,pa.habilitado as habilitado,p.fecha_nacimiento ,pa.muestra as muestra
        FROM pacientes pa, pacientes_terapeutas pate, personas p 
        WHERE pa.muestra= 1 AND pa.id_persona=p.id_persona AND pate.id_paciente=pa.id_paciente AND pate.id_terapeuta=:terapeuta 
        ORDER BY p.apellido ASC");
        $sql->bindValue(':terapeuta', $_GET['terapeuta']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        $array = $sql->fetchAll();
        $response = array();
        
        foreach($array as $paciente){
          $res = array();
          $res['id'] = $paciente['id'];
          $res['apellido'] = $paciente['apellido'];
          $res['nombre'] = $paciente['nombre'];
          $res['fecha_nacimiento'] = $paciente['fecha_nacimiento'];
          $res['paciente']['habilitado'] = ($paciente['habilitado'] == '0') ? false : true;
          $res['paciente']['muestra'] = ($paciente['muestra'] == '0') ? false : true;
          $res['paciente']['id'] = $paciente['id_paciente'];
          array_push($response,$res);
        }
        echo json_encode($response);
        exit();
      }else{
        header("HTTP/1.1 200 OK");
        echo json_encode(false);
      }
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT * FROM pacientes WHERE id_paciente=:id");
      $sql->bindValue(':id', $_GET['id']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
    }
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("INSERT INTO cursos (curso) VALUES (:curso)");
    bindAllValues($sql, $input);
    try{
      $sql->execute();
      $cursoId = $dbConn->lastInsertId();
      if($cursoId){
        $input['id'] = $cursoId;
        header("HTTP/1.1 200 OK");
        echo json_encode(true);
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