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
    if (!isset($_GET['id'])){
      //Mostrar todos los usuarios
      $sql = $dbConn->prepare("SELECT id_tarea, nombre, descripcion FROM tareas");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      $array = $sql->fetchAll();
      $response = array();
      foreach ($array as $valor) {
        $obj['id_tarea'] = intVal($valor['id_tarea']);
        $obj['nombre'] = $valor['nombre'];
        $obj['descripcion'] = $valor['descripcion'];
        array_push($response, $obj);
      }
      header("HTTP/1.1 200 OK");
      echo json_encode($response);
      exit();
    }else {
      //Mostrar un usuario especifico
      $sql = $dbConn->prepare("SELECT * FROM cursos WHERE id=:id");
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
    $input = json_decode(file_get_contents('php://input'), true);
    $countIndicaciones = count($input['indicaciones']);
    $indicaciones = $input['indicaciones'];
    try{
      for($i=0 ; $i < $countIndicaciones ; $i++) {
        // INSERT de practicas seleccionadas
        $sql = $dbConn->prepare("INSERT INTO tarea_cuestionario (id_sesion,id_tarea,tipo) VALUES (".$input['sesion'].", ".$indicaciones[$i]['id'].", '".$input['tipo']."')");
        $sql->execute();
        $idTC = $dbConn->lastInsertId();
        // INSERT de practicas del ultimo id anterior
        $sql2 = $dbConn->prepare("INSERT INTO practicas (id_tarea_sesion) VALUES (".$idTC.")");
        $sql2->execute();
        $idPractica[] = $dbConn->lastInsertId();
        
      }

      // INSERT observaciones
      $observacion = $dbConn->prepare("INSERT INTO evolucion_paciente (id_paciente, comentario) VALUES (".$input['paciente'].", '".$input['evolucion']."')");
      $observacion->execute();

      // INSERT pautas higiene vocal
      $higiene = $dbConn->prepare("INSERT INTO resultados_practicas (id_practica,id_tarea,id_valoracion) VALUES (".$idPractica[0].",0,".$input['indicaciones'][0]['indicacion']['valoracion'].")");
      $higiene->execute();
      $index = 0;
      foreach($indicaciones as $indicacion) {
        if ($indicacion['id'] == 0) { $index = 1; }
      }
      for($i = $index; $i < $countIndicaciones; $i++) {
        // INSERT de indicaciones terapeuticas
        $insertIT = "INSERT INTO indicaciones_terapeuticas (gli_asc,gli_desc,";
        $arreglo = $indicaciones[$i]['indicacion'];
        // Armo el string con los campos de notas y vocales que se van a mandar
        $insertIT .= obtainNotas($arreglo['notas'], true);
        $insertIT .= ",".obtainVocales($arreglo['vocales'], true).") VALUES (";
        // Armo el string con los valores de los glissandos presentes
        $glissandos = "";
        if (count($arreglo['glissandos']) == 1) {
          $glissando = $arreglo['glissandos'][0];
          if ($glissando['id_valoracion'] == "114") {
            $glissandos .= "'".$glissando['valoracion']."', NULL,";
          } else {
            $glissandos .= "NULL,'".$glissando['valoracion']."',";
          }
        } else {
          foreach($arreglo['glissandos'] as $glissando) {
            $glissandos .= "'".$glissando['valoracion']."',";
          }
        }
        $insertIT .= $glissandos;
        // Armo el string con los valores de las notas y vocales presentes
        $insertIT .= obtainNotas($arreglo['notas'], false);
        $insertIT .= ",".obtainVocales($arreglo['vocales'], false).")";
        $sql3 = $dbConn->prepare($insertIT);
        $sql3->execute();
        $lastITID = $dbConn->lastInsertId();
        $quer = "INSERT INTO resultados_practicas (id_practica,id_tarea,id_valoracion,notas) VALUES (".$idPractica[$i].", ".$indicaciones[$i]['id'].", ".$indicaciones[$i]['indicacion']['valoracion'].", $lastITID)";
        $sql4 = $dbConn->prepare($quer);
        $sql4->execute();
        // $query [] = $quer;
      }
      header("HTTP/1.1 200 OK");
      echo json_encode(true);
      exit();
    } catch (PDOException $e) {
      echo json_encode($e->getMessage());
    }
    

    // el tipo es el value del radiobutton de objetivo terapeutico H (habiliacion) E (entrenamiento) P (preparacion) R (rehabilitacion)
    // $values = "";
    // $sql = $dbConn->prepare("INSERT INTO tarea_cuestionario (id_sesion, id_tarea, tipo) VALUES (:)");
    // bindAllValues($sql, $input);
    // try{
    //   $sql->execute();
    //   $cursoId = $dbConn->lastInsertId();
    //   if($cursoId){
    //     $input['id'] = $cursoId;
    //     header("HTTP/1.1 200 OK");
    //     echo json_encode(true);
    //     exit();
    //   }
    // }catch(PDOException $e){
    //   header("HTTP/1.1 200 OK");
    //   $code = $e->getCode();
    //   echo json_encode($e->getMessage());   
    // }
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