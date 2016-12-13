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




// set up basic connection
$conn_id = ftp_connect($server);
if(!$conn_id){
    http_response_code(404);
    die(json_encode(array("success"=>false,"message"=>'cant connect to server')));
}




// login with username and password
$login_result = ftp_login($conn_id, $username, $password);





if(!$login_result){
    http_response_code(403);
    die(json_encode(array("success"=>false,"message"=>'cant login to server')));
}




/*
if(!file_exists($ftp_root.'/.gallery')){
    http_response_code(403);
    die('non virtual gallery');
}*/







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



        ftp_put_directory($conn_id,$localDir,$remoteDir);


        /*$localFiles = list_recursive($localDir);
        foreach ($localFiles as $localFile) {
            if(is_dir($localFile)){

            }else{
                $remoteFile = str_replace($localDir,$remoteDir.'/',$localFile);

                //echo("$localFile\n");
                //echo("$remoteFile\n");

                $localFileSize = filesize($localFile);
                $remoteFileSize = ftp_size($conn_id,$remoteFile);

                if($localFileSize!=$remoteFileSize){

                    if($remoteFileSize!=-1){
                        ftp_delete($conn_id,$remoteFile);
                    }

                    ftp_upload_file($conn_id,$remoteFile,$localFile);

                }


            }

        }*/







        unlink_recursive($localDir);



        die(json_encode(array("success"=>true,"message"=>'deployed')));


    } else {

        http_response_code(500);
        die(json_encode(array("success"=>false,"message"=>'cant open to zip')));

    }


}




ftp_close($conn_id);//todo throw error
exit;



?>