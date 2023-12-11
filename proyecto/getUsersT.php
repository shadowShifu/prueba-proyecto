<?php
    include_once("cors.php");
    $data = json_decode(file_get_contents("php://input"));
    $dat = $_REQUEST['turno'];
    include_once("api.php");
    $get = getUsersT($dat);
    echo json_encode($get);
?>