<?php

  //Abrir conexion a la base de datos
  function connect($db)
  {
      try {
          $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']}", $db['username'], $db['password']);

          // set the PDO error mode to exception
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          return $conn;
      } catch (PDOException $exception) {
          exit($exception->getMessage());
      }
  }


 //Obtener parametros para updates
 function getParams($input){
    $filterParams = [];
    foreach($input as $param => $value){
      $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
	}

  //Asociar todos los parametros a un sql
	function bindAllValues($statement, $params){
		foreach($params as $param => $value){
			$statement->bindValue(':'.$param, $value);
		}
		return $statement;
  }

  function bindIntValues($statement, $params)
  {
		foreach($params as $param => $value)
    {
				$statement->bindValue(':'.$param, $value, PDO::PARAM_INT);
		}
		return $statement;
   }

  function removeAttr($array, $atributo){
    $arr = array_filter($array, function($k) use ($atributo){
      return $k != $atributo;
    }, ARRAY_FILTER_USE_KEY);
    return $arr;
  }

  function unique_multidim_array($array, $key) {
    $temp_array = array();
    $i = 0;
    $key_array = array();
   
    foreach($array as $val) {
        if (!in_array($val[$key], $key_array)) {
            $key_array[$i] = $val[$key];
            $temp_array[$i] = $val;
        }
        $i++;
    }
    return array_values($temp_array);
  }

  function getParamsDelete($input){
    $filterParams = [];
    $sesion = intVal($input['sesion']);
    foreach($input['titulos'] as $param){
      $val = intVal($param);
      $filterParams[] = "($sesion, $val)";
    }
    return implode(", ", $filterParams);
	}

  function obtainNotas($array, $isField){
    $notas = "";
    foreach($array as $valor){
      $notas .= ($isField) ? "`".$valor."`," : "'".$valor."',";
    }
    return rtrim($notas,",");
  }

  function obtainVocales($array, $isField){
    $vocales = "";
    foreach($array as $valor){
      $vocales .= ($isField) ? "`".$valor['valoracion']."`," : "'".$valor['valoracion']."',";
    }
    return rtrim($vocales,",");
  }
 ?>