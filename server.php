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

if(isset($_POST['allPlaces'])){
    $result = $con->query("SELECT DISTINCT * FROM places");
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($out != "") {$out .= ",";}
            $out .= '{"id_place":"'  . $rs["id_place"] . '",';
            $out .= '"name_place":"'   . $rs["name_place"]        . '",';
            $out .= '"description":"'   . $rs["description"]        . '",';
            $out .= '"coordinateX":"'   . $rs["coordinateX"]        . '",';
            $out .= '"coordinateY":"'   . $rs["coordinateY"]        . '",';
            $out .= '"address":"'   . $rs["address"]        . '",';
            $out .= '"id_type":"'. $rs["id_type"]     . '"}';
    }
    $out = '{"places":['.$out.']}';
}

if(isset($_POST['type'])){
    $type = $_POST['type'];
    $result = $con->query("SELECT DISTINCT * FROM places WHERE id_type = $type");
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($out != "") {$out .= ",";}
            $out .= '{"id_place":"'  . $rs["id_place"] . '",';
            $out .= '"name_place":"'   . $rs["name_place"]        . '",';
            $out .= '"description":"'   . $rs["description"]        . '",';
            $out .= '"coordinateX":"'   . $rs["coordinateX"]        . '",';
            $out .= '"coordinateY":"'   . $rs["coordinateY"]        . '",';
            $out .= '"address":"'   . $rs["address"]        . '",';
            $out .= '"id_type":"'. $rs["id_type"]     . '"}';
    }
    $out = '{"places":['.$out.']}';
}

if(isset($_POST['chooseIdPlace'])){
    $chooseIdPlace = $_POST['chooseIdPlace'];
    $result = $con->query("SELECT DISTINCT * FROM places WHERE id_place = $chooseIdPlace");
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($out != "") {$out .= ",";}
            $out .= '{"id_place":"'  . $rs["id_place"] . '",';
            $out .= '"name_place":"'   . $rs["name_place"]        . '",';
            $out .= '"description":"'   . $rs["description"]        . '",';
            $out .= '"coordinateX":"'   . $rs["coordinateX"]        . '",';
            $out .= '"coordinateY":"'   . $rs["coordinateY"]        . '",';
            $out .= '"address":"'   . $rs["address"]        . '",';
            $out .= '"id_type":"'. $rs["id_type"]     . '"}';
    }
    $out = '{"chooseIdPlace":['.$out.']}';
}

$con->close();
echo($out);
?>