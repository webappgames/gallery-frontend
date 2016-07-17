<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$map_file = __DIR__.'/../data/map.json';
if(!file_exists($map_file)){
    file_put_contents($map_file,'[]');
    chmod($map_file,0777);
}



$method = strtoupper($_SERVER['REQUEST_METHOD']);
if($method == 'OPTIONS'){

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


}elseif($method=='GET'){

    header("Content-type: application/json");
    readfile($map_file);

    
}elseif($method=='POST') {

    
    $data = file_get_contents("php://input");
    //$data = json_decode($data,true);
    file_put_contents($map_file,$data);

    header("Content-type: application/json");
    echo('{"success": true}');


}else{

    http_response_code(400);//Bad Request

}




?>