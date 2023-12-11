<?php
    include_once("cors.php");
    $data = json_decode(file_get_contents("php://input"));
    include_once("api.php");
    $update = updateAdmin($data);
    echo json_encode($update);

?>