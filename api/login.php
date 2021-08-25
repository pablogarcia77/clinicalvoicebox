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
  // Crear un nuevo pedido
  if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = json_decode(file_get_contents('php://input'),true);
    $sql = $dbConn->prepare("SELECT id_persona as id,apellido,nombre,sexo,documento,domicilio,telefono,email,fecha_nacimiento FROM personas WHERE telefono=:telefono AND documento=:documento");
    bindAllValues($sql, $input);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    try{
      $ok = $sql->execute();
      if($ok){
        header("HTTP/1.1 200 OK");

        $data = $sql->fetch();
        $id = $data['id'];
        $tipo = $dbConn->prepare("SELECT t.id_terapeuta as id,tt.nombre as tipo,t.matricula,t.domicilio_legal as consultorio,t.habilitado,t.muestra FROM terapeutas t, tipos_terapeutas tt WHERE t.id_tipo_terapeuta=tt.id_tipo_terapeuta AND t.id_persona = $id");
        $tipo->setFetchMode(PDO::FETCH_ASSOC);
        try{
          $tipo->execute();
          $who = $tipo->fetch();
          if($who){
            $who['habilitado'] = ($who['habilitado'] == 1) ? true : false;
            $who['muestra'] = ($who['muestra'] == 1) ? true : false;
            $data['terapeuta'] = $who;
            echo json_encode($data);
          }else{
            $tipo = $dbConn->prepare("SELECT p.id_paciente as id,p.id_antecedentes as antecedentes,pat.patologia,pro.profesion,d.diagnostico,p.lesion,p.observaciones,p.habilitado,p.muestra,p.aceptoTOS FROM pacientes p, profesiones pro, patologias pat, dfp d WHERE pat.id_patologia=p.id_patologia AND p.id_profesion=pro.id_profesion AND p.id_dfp=d.id_dfp AND p.id_persona = $id");
            $tipo->setFetchMode(PDO::FETCH_ASSOC);
            $tipo->execute();
            $paciente = $tipo->fetch();
            $paciente['habilitado'] = ($paciente['habilitado'] == 1) ? true : false;
            $paciente['muestra'] = ($paciente['muestra'] == 1) ? true : false;
            $paciente['aceptoTOS'] = ($paciente['aceptoTOS'] == 1) ? true : false;
            $data['paciente'] = $paciente;
            echo json_encode($data);
          }
        }catch(PDOException $e){
          echo json_encode(false);
        }

        

        exit();
      }
    }catch(PDOException $e){
      header("HTTP/1.1 200 OK");
      $code = $e->getCode();
      echo json_encode($e->getMessage());
    }
    
  }

  //En caso de que ninguna de las opciones anteriores se haya ejecutado
  header("HTTP/1.1 400 Bad Request");

?>