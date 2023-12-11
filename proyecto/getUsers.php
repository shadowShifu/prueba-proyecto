<?php
    include_once("cors.php");
    include_once("api.php");

    $users = getUsers();

    echo json_encode($users);
?>