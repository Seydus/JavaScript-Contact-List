<?php
$host = "localhost";
$uname = "root";
$pword = "";
$dbname = "contactsdb";

$conn = mysqli_connect($host, $uname, $pword, $dbname);

/*
if(!$conn)
{
    die("Connection Failed");
}
else
{
    echo "Connection Established!<br><br>";
}
*/