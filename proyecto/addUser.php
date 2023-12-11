<?php
    include_once("cors.php");

    include_once("api.php");

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellidoP = $_POST['apellidoP'];
    $apellidoM = $_POST['apellidoM'];
    $cargo = $_POST['cargo'];
    $contacto = $_POST['contacto'];
    $direccion = $_POST['direccion'];
    $fechaN = $_POST['fechaN'];
    $genero = $_POST['genero'];
    $turno = $_POST['turno'];

    $archivo = $_FILES['archivo'];

    $dir = "documentos/";
        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }
    
    $nuevoNombre = $dir.$nombre.'.pdf';
    
    $archivo = $_FILES["archivo"];
    $resultado = move_uploaded_file($archivo["tmp_name"], $nuevoNombre);

    $array = array(
        "id"=>$id,
        "nombre"=>$nombre,
        "apellidoP"=>$apellidoP,
        "apellidoM"=>$apellidoM,
        "cargo"=>$cargo,
        "contacto"=>$contacto,
        "direccion"=>$direccion,
        "fechaN"=>$fechaN,
        "genero"=>$genero,
        "turno"=>$turno,
        "ruta"=>$nuevoNombre,
    );

    if ($resultado) {
        createUser($array);
    } else {
        echo "Error al subir archivo";
    }


?>