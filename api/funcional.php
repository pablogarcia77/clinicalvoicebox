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
    if (!isset($_GET['paciente']) && !isset($_GET['sesion'])){
      //Mostrar todos los usuarios
      $sql = $dbConn->prepare("SELECT f.e_sostenida,f.i_sostenida,f.fonacion_debil,f.fonacion_media,f.fonacion_intensa,f.fonacion_aguda,f.fonacion_media1,f.fonacion_grave,f.fon_reg_falsete,f.fon_reg_modal,f.fon_reg_frito,f.gli_asc,f.gli_desc,f.bordes_pliegues,f.coloracion,f.simetria,f.respiracion,f.tos,f.fon_inspirada,f.cierre_glo,f.onda_mucosa,f.amplitud,f.actividad_supraglotica,f.observaciones 
      FROM evaluacion_funcional f, sesiones s
      WHERE s.id_sesion=f.id_sesion AND s.id_paciente=:paciente
      ORDER BY id_evaluacion DESC LIMIT 1");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
      exit();
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT f.e_sostenida,f.i_sostenida,f.fonacion_debil,f.fonacion_media,f.fonacion_intensa,f.fonacion_aguda,f.fonacion_media1,f.fonacion_grave,f.fon_reg_falsete,f.fon_reg_modal,f.fon_reg_frito,f.gli_asc,f.gli_desc,f.bordes_pliegues,f.coloracion,f.simetria,f.respiracion,f.tos,f.fon_inspirada,f.cierre_glo,f.onda_mucosa,f.amplitud,f.actividad_supraglotica,f.observaciones 
      FROM evaluacion_funcional f, sesiones s
      WHERE s.id_sesion=f.id_sesion AND s.id_paciente=:paciente AND s.id_sesion=:sesion 
      ORDER BY id_evaluacion DESC LIMIT 1");
      $sql->bindValue(':paciente', $_GET['paciente']);
      $sql->bindValue(':sesion', $_GET['sesion']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      $response = $sql->fetch();
      $response['e_sostenida'] = intVal($response['e_sostenida']) == 1 ? true : false;
      $response['i_sostenida'] = intVal($response['i_sostenida']) == 1 ? true : false;
      $response['fon_reg_falsete'] = intVal($response['fon_reg_falsete']) == 1 ? true : false;
      $response['fon_reg_frito'] = intVal($response['fon_reg_frito']) == 1 ? true : false;
      $response['fon_reg_modal'] = intVal($response['fon_reg_modal']) == 1 ? true : false;
      $response['fonacion_aguda'] = intVal($response['fonacion_aguda']) == 1 ? true : false;
      $response['fonacion_debil'] = intVal($response['fonacion_debil']) == 1 ? true : false;
      $response['fonacion_media'] = intVal($response['fonacion_media']) == 1 ? true : false;
      $response['fonacion_grave'] = intVal($response['fonacion_grave']) == 1 ? true : false;
      $response['fonacion_intensa'] = intVal($response['fonacion_intensa']) == 1 ? true : false;
      $response['fonacion_media1'] = intVal($response['fonacion_media1']) == 1 ? true : false;
      $response['gli_asc'] = intVal($response['gli_asc']) == 1 ? true : false;
      $response['gli_desc'] = intVal($response['gli_desc']) == 1 ? true : false;
      header("HTTP/1.1 200 OK");
      echo json_encode( $response );
      exit();
    }
  }

  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("INSERT INTO evaluacion_funcional 
    (id_sesion, e_sostenida, i_sostenida, fonacion_debil, fonacion_media, fonacion_intensa, fonacion_aguda, fonacion_media1, fonacion_grave, fon_reg_falsete, fon_reg_modal, fon_reg_frito, gli_asc, gli_desc, bordes_pliegues, coloracion, simetria, respiracion, tos, fon_inspirada, cierre_glo, onda_mucosa, amplitud, actividad_supraglotica, observaciones) VALUES 
    (:id_sesion, :e_sostenida, :i_sostenida, :fonacion_debil, :fonacion_media, :fonacion_intensa, :fonacion_aguda, :fonacion_media1, :fonacion_grave, :fon_reg_falsete, :fon_reg_modal, :fon_reg_frito, :gli_asc, :gli_desc, :bordes_pliegues, :coloracion, :simetria, :respiracion, :tos, :fon_inspirada, :cierre_glo, :onda_mucosa, :amplitud, :actividad_supraglotica, :observaciones)");
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
  // if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
  // {
  //   $id = $_GET['id'];
  //   $estado = $_GET['estado'];
  //   $statement = $dbConn->prepare("UPDATE usuario SET estado=:estado WHERE id=:id");
  //   $statement->bindValue(':id', $id);
  //   $statement->bindValue(':estado', $estado);
  //   $statement->execute();
  //   header("HTTP/1.1 200 OK");
  //   exit();
  // }

  //Actualizar
  if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
      $_PUT = file_get_contents('php://input');
      $array = json_decode($_PUT,true);
      $fields = getParams($array);
      $sql = "UPDATE cursos SET $fields WHERE id=:id";
      $statement = $dbConn->prepare($sql);
      bindAllValues($statement,$array);
      try{
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode(true);
      }catch(PDOException $e){
        header("HTTP/1.1 200 ERROR");
        echo json_encode($e->getMessage());
      }
      exit();
  }


  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 Bad Request");

?>