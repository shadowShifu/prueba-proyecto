<?php
    include_once("cors.php");

    $server = $_SERVER['HTTP_HOST'];

    echo json_encode($server);
?>