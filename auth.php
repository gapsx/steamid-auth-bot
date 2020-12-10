<?php
    $db_host = '13.65.184.214';
    $db_username = 'lucksbot';
    $db_name = 'lucksbot';
    $db_pass = 'luck$b0t';
    $connect = mysqli_connect($db_host, $db_username, $db_pass) or die("erro ao conectar a database1");
    mysqli_select_db($connect, $db_name) or die("erro ao conectar a database2");
    $sql= "SELECT * FROM `idsbot` WHERE steamid";
    $result = mysqli_query($connect, $sql);
        while($row = mysqli_fetch_array($result)) {
        echo $row['steamid']; 
        echo "<br>";
    }
?>