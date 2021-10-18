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
      // $sql = $dbConn->prepare("SELECT pe.apellido,pe.nombre,pe.sexo,pe.documento,pe.domicilio,pe.telefono,pe.email,pe.fecha_nacimiento,pe.id_pais as pais FROM pacientes pa, personas pe WHERE pa.id_persona=pe.id_persona AND pa.id_paciente=:id");
      $sql = $dbConn->prepare("SELECT pa.id_persona as id, p.apellido,p.nombre,p.sexo,p.documento,p.domicilio,p.telefono,p.email,p.id_pais,pa.id_paciente,pa.habilitado,p.fecha_nacimiento,pa.aceptoTOS,pa.id_antecedentes,pa.id_patologia,pa.id_profesion,pa.id_dfp,pa.lesion,pa.observaciones
      FROM pacientes pa, pacientes_terapeutas pate, personas p 
      WHERE pa.muestra= 1 AND pa.id_persona=p.id_persona AND pate.id_paciente=pa.id_paciente AND pa.id_paciente=:id");
      $sql->bindValue(':id', $_GET['paciente']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      $response = array();
      $paciente = $sql->fetch();
      $response['id'] = $paciente['id'];
      $response['apellido'] = $paciente['apellido'];
      $response['nombre'] = $paciente['nombre'];
      $response['fecha_nacimiento'] = $paciente['fecha_nacimiento'];
      $response['sexo'] = $paciente['sexo'];
      $response['documento'] = $paciente['documento'];
      $response['domicilio'] = $paciente['domicilio'];
      $response['telefono'] = $paciente['telefono'];
      $response['email'] = $paciente['email'];
      $response['pais'] = $paciente['id_pais'];
      $response['paciente']['id'] = $paciente['id_paciente'];
      $response['paciente']['habilitado'] = ($paciente['habilitado'] == 1) ? true : false;
      $response['paciente']['aceptoTOS'] = ($paciente['aceptoTOS'] == 1) ? true : false;
      $response['paciente']['antecedentes'] = $paciente['id_antecedentes'];
      $response['paciente']['observaciones'] = $paciente['observaciones'];
      $response['paciente']['patologia'] = $paciente['id_patologia'];
      $response['paciente']['profesion'] = $paciente['id_profesion'];
      $response['paciente']['dfp'] = $paciente['id_dfp'];
      $response['paciente']['lesion'] = $paciente['lesion'];
      echo json_encode( $response );
      exit();
    }
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("INSERT INTO personas (apellido,nombre,sexo,documento,domicilio,telefono,email,fecha_nacimiento,id_pais) VALUES (:apellido,:nombre,:sexo,:documento,:domicilio,:telefono,:email,:fecha_nacimiento,:id_pais)");
    $idProfesion = $input['id_profesion'];
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