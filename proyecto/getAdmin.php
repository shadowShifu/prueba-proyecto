<?php
    include_once("cors.php");
    include_once("api.php");

    $admin = getAdmin();

    echo json_encode($admin);
?>