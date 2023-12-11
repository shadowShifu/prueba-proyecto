<?php
    include_once "cors.php";
    $data = json_decode(file_get_contents("php://input"));
    $dt = $_REQUEST['id'];
    include_once "api.php";
    $user = getUser($dt);
    echo json_encode($user);
?>