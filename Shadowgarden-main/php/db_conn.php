<?php

    $sname = "localhost";
    $umae = "root"
    $password = ""

    $db_name = "test_db";

    $conn = mysqli_connect($sname, $umae, $password, $db_name);

    if(!conn) {
        echo "Connection Failed";
    }