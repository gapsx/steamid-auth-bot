<?php
    $db_host = '************';
    $db_username = '************';
    $db_name = '************';
    $db_pass = '************';
    $connect = mysqli_connect($db_host, $db_username, $db_pass) or die("erro ao conectar a database");
    $sql= "SELECT * FROM `idsbot` WHERE steamid";
    $result = mysqli_query($connect, $sql);
        while($row = mysqli_fetch_array($result)) {
        echo $row['steamid']; 
        echo "<br>";
    }
?>
