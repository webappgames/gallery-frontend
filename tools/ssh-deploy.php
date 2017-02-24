<?php

//print_r($_FILES);
//print_r($_POST);

require 'files.php';

$server = $_POST['server'];
$username = $_POST['username'];
$password = $_POST['password'];
$remoteDir = $_POST['directory'];



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type");
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}



$methods = array(
    'kex' => 'diffie-hellman-group1-sha1',
    'client_to_server' => array(
        'crypt'            => '3des-cbc',
        'comp'             => 'none'),
    'server_to_client' => array(
        'crypt'            => 'aes256-cbc,aes192-cbc,aes128-cbc',
        'comp'             => 'none'));



// set up basic connection
$conn_id = ssh2_connect($server, 22,$methods);
if(!$conn_id){
    http_response_code(404);
    die(json_encode(array("success"=>false,"message"=>'cant connect to server')));
}




// login with username and password
$login_result = ssh2_auth_password($conn_id, $username, $password);





if(!$login_result){
    http_response_code(403);
    die(json_encode(array("success"=>false,"message"=>'cant login to server')));
}











if(!isset($_FILES['update'])) {

    http_response_code(200);
    die(json_encode(array("success"=>true,"message"=>'prepaired to deploy')));

}else{


    $zip = new ZipArchive;
    if ($zip->open($_FILES['update']['tmp_name']) === TRUE) {


        $localDir = __DIR__.'/tmp/'.uniqid('zip_',true).'/';


        mkdir($localDir);
        $zip->extractTo($localDir);
        $zip->close();
        chmod_recursive($localDir,0777);



        ssh_put_directory($conn_id,$localDir,$remoteDir);



        unlink_recursive($localDir);



        die(json_encode(array("success"=>true,"message"=>'deployed')));


    } else {

        http_response_code(500);
        die(json_encode(array("success"=>false,"message"=>'cant open to zip')));

    }


}




//ftp_close($conn_id);
exit;



?>
