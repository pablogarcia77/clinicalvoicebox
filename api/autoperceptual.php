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
    if(isset($_GET['sesion'])){
      //Mostrar todos los pacientes de un terapeuta
      $sql = $dbConn->prepare("SELECT estado,id_titulo FROM cuestionarios_sesion WHERE id_sesion=:sesion");
      $sql->bindValue(':sesion', $_GET['sesion']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      $array = $sql->fetchAll();
      echo json_encode($array);
    }else{
      $sql = $dbConn->prepare("SELECT titulos.id_titulo, titulos.siglas FROM titulos_tests titulos, tipos_tests tipo WHERE titulos.id_tipo_test=tipo.id_tipo_test AND tipo.denominacion LIKE 'CUEST%' ORDER BY titulos.orden ASC");
      $sql->bindValue(':terapeuta', $_GET['terapeuta']);
      $sql->bindValue(':paciente', $_GET['paciente']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
    }
    exit();
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);

    $cantidad = count($input['titulos']);
    $query = "INSERT INTO cuestionarios_sesion (id_sesion,id_titulo) VALUES ";
    for ($i=0; $i<$cantidad; $i++) {
      $query = $query."(".$input['sesion'].", ".$input['titulos'][$i]."),";
    }
    $resultQuery = rtrim($query, ",");
    $sql = $dbConn->prepare($resultQuery);
    try{
      $sql->execute();
      $sesionId = $dbConn->lastInsertId();
      if($sesionId){
        $sql2 = $dbConn->prepare("INSERT INTO c_cuestionario_sesion (id_cuestionario_sesion) VALUES (:ultimo)");
        $sql2->bindValue(':ultimo', $sesionId);
        $sql2->execute();
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
    $input = json_decode(file_get_contents('php://input'), true);
    $campos = getParamsDelete($input);
    $query = "DELETE FROM cuestionarios_sesion WHERE (id_sesion, id_titulo) IN ($campos)";
    $statement = $dbConn->prepare($query);
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