<?php
    include_once "cors.php";
    $data = json_decode(file_get_contents("php://input"));
    include_once "api.php";
    $ok = deleteUser($data);
    echo json_encode($ok);
?>