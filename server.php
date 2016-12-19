<?php
$host = 'localhost';
$database = 'map';
$user = 'root';
$password = '';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$con = mysqli_connect($host,$user,$password,$database);
$out = array();
$jsondecode = json_decode(file_get_contents("php://input"));
if($jsondecode->allTypes =='allTypes') {

    if($result = mysqli_query($con,"SELECT * FROM types"))
    {
      $count = mysqli_num_rows($result);

      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
          $out[$cr]['id_type']    = $row['id_type'];
          $out[$cr]['name_type']  = $row['name_type'];
          $out[$cr]['marker_img'] = $row['marker_img'];
          $cr++;
      }
    }
}

if($jsondecode->allPlaces =='allPlaces'){

    if($result = mysqli_query($con,"SELECT DISTINCT * FROM places"))
        {
          $count = mysqli_num_rows($result);

          $cr = 0;
          while($row = mysqli_fetch_assoc($result))
          {
              $out[$cr]['id_place']    = $row['id_place'];
              $out[$cr]['name_place']  = $row['name_place'];
              $out[$cr]['description'] = $row['description'];
              $out[$cr]['coordinateX']    = $row['coordinateX'];
              $out[$cr]['coordinateY']  = $row['coordinateY'];
              $out[$cr]['address'] = $row['address'];
              $out[$cr]['id_type'] = $row['id_type'];
              $cr++;
          }
     }
}

if($jsondecode->type){
    $type = $jsondecode->type;
    if($result = mysqli_query($con,"SELECT DISTINCT * FROM places WHERE id_type = $type"))
            {
              $count = mysqli_num_rows($result);

              $cr = 0;
              while($row = mysqli_fetch_assoc($result))
              {
                  $out[$cr]['id_place']    = $row['id_place'];
                  $out[$cr]['name_place']  = $row['name_place'];
                  $out[$cr]['description'] = $row['description'];
                  $out[$cr]['coordinateX']    = $row['coordinateX'];
                  $out[$cr]['coordinateY']  = $row['coordinateY'];
                  $out[$cr]['address'] = $row['address'];
                  $out[$cr]['id_type'] = $row['id_type'];
                  $cr++;
              }
         }
}

if($jsondecode->chooseIdPlace){
    $chooseIdPlace = $jsondecode->chooseIdPlace;
    if($result = mysqli_query($con,"SELECT DISTINCT * FROM places WHERE id_place = $chooseIdPlace"))
                {
                  $count = mysqli_num_rows($result);

                  $cr = 0;
                  while($row = mysqli_fetch_assoc($result))
                  {
                      $out[$cr]['id_place']    = $row['id_place'];
                      $out[$cr]['name_place']  = $row['name_place'];
                      $out[$cr]['description'] = $row['description'];
                      $out[$cr]['coordinateX']    = $row['coordinateX'];
                      $out[$cr]['coordinateY']  = $row['coordinateY'];
                      $out[$cr]['address'] = $row['address'];
                      $out[$cr]['id_type'] = $row['id_type'];
                      $cr++;
                  }
             }
}

$json = json_encode($out);
echo $json;

?>