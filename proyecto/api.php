<?php

function getAdmin()
{
    $bd = getConection();
    $sentence = $bd->query("SELECT * FROM admin");
    return $sentence->fetchAll();

}

function updateAdmin($data)
{
    $bd = getConection();
    $sentence = $bd->prepare("UPDATE admin SET usuarioAdmin = ?, contraAdmin = ?");
    return $sentence->execute([$data->user, $data->password]);
}

function deleteUser($data)
{
    $bd = getConection();
    $sentence = $bd->prepare("DELETE FROM personal WHERE id = ?");
    return $sentence->execute([$data->id]);
}

function getUsers()
{
    $bd = getConection();
    $sentence = $bd->query("SELECT * FROM personal");
    return $sentence->fetchAll();
}

function getUser($data)
{

        $bd = getConection();
        $sentence = $bd->prepare("SELECT * FROM personal WHERE id = ?");
        $sentence->execute([$data]);
        $res = $sentence->fetch();
        if ($res) {
            return $res;
        }
    return false;
}

function getUsersT($data)
{
    $bd = getConection();
    $sentence = $bd->prepare("SELECT *, CONCAT(nombre, ' ', apellidoP, ' ' ,apellidoM) nomcomp FROM personal WHERE turno = ?");
    $sentence->execute([$data]);
    return $sentence->fetchAll();
}

function updateUser($data)
{   
    $bd = getConection();
    $sentence = $bd->prepare("UPDATE personal SET id = ?, nombre = ?, apellidoP = ?, apellidoM = ?, cargo = ?, contacto = ?, direccion = ?, fechaN = ?, genero = ?, turno = ?, docSanidad = ? WHERE id = ?");
    return $sentence->execute(
        [
        $data['id'],
        $data['nombre'],
        $data['apellidoP'],
        $data['apellidoM'],
        $data['cargo'],
        $data['contacto'],
        $data['direccion'],
        $data['fechaN'],
        $data['genero'],
        $data['turno'],
        $data['ruta'],
        $data['id2']
        ]);
}

function createUser($data)
{
        try {
            $bd = getConection();
            $sentence = $bd->prepare("INSERT INTO personal (id, nombre, apellidoP, apellidoM, cargo, contacto, direccion, fechaN, genero, turno, docSanidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            return $sentence->execute([
                $data['id'], 
                $data['nombre'], 
                $data['apellidoP'], 
                $data['apellidoM'], 
                $data['cargo'], 
                $data['contacto'], 
                $data['direccion'], 
                $data['fechaN'], 
                $data['genero'], 
                $data['turno'], 
                $data['ruta']]);
        } catch (\Throwable $th) {
            $bd->rollBack();
            echo $th;
            return false;
        }
}

function putAssistance($data)
{
   if(isset($data->idUser) && !empty($data->idUser) &&
    isset($data->horaEntrada) && !empty($data->horaEntrada) &&
    isset($data->horaSalida) && !empty($data->horaSalida) &&
    isset($data->fecha) && !empty($data->fecha) &&
    isset($data->control) && !empty($data->control)){
        $bd = getConection();
        $sentenceD = $bd->prepare("DELETE t1 FROM registro t1  INNER JOIN registro t2 WHERE t1.idUser = t2.idUser AND t1.fecha = t2.fecha AND t1.turno = t2.turno");
        $sentenceD->execute();
        
        $sentence = $bd->prepare("INSERT INTO registro (idUser, horaEntrada, horaSalida, fecha, rg, control, turno) VALUES (?,?,?,?,?,?,?)");
        $sentence->execute([
                $data->idUser, 
                $data->horaEntrada, 
                $data->horaSalida, 
                $data->fecha, 
                $data->rg,
                $data->control,
                $data->turno]);
        return true;
    }
    return false;
    
}

function updateAssistance($data)
{

    if (isset($data->idUser) && !empty($data->idUser) &&
    isset($data->horaSalida) && !empty($data->horaSalida) &&
    isset($data->rg) && !empty($data->rg)
    ) {
        $bd = getConection();
        $sentence = $bd->prepare("UPDATE registro SET horaSalida = ?, rg = ? WHERE idUser = ? AND rg = 0");
        $sentence->execute([  
            $data->horaSalida, 
            $data->rg,
            $data->idUser,]);
            return true;
        }
    return false;
   
}

function getEnvironmentVars($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function getConection()
{
    $password = getEnvironmentVars("MYSQL_PASSWORD");
    $user = getEnvironmentVars("MYSQL_USER");
    $dbName = getEnvironmentVars("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}