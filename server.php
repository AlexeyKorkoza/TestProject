<?php
$host = 'localhost';
$database = 'map';
$user = 'root';
$password = '';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$con = mysqli_connect($host,$user,$password,$database);
$out = "";

if(isset($_POST['allTypes'])){
    $result = $con->query("SELECT * FROM types");
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($out != "") {$out .= ",";}
            $out .= '{"id_type":"'  . $rs["id_type"] . '",';
            $out .= '"name_type":"'   . $rs["name_type"]        . '",';
            $out .= '"marker_img":"'. $rs["marker_img"]     . '"}';
    }
    $out = '{"types":['.$out.']}';
}
$con->close();
echo($out);
?>