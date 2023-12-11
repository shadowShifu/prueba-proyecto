<?php
    include_once("cors.php");
    $data = json_decode(file_get_contents("php://input"));
    include_once("api.php");
    $assistance = updateAssistance($data);
    echo json_encode($assistance);
?>