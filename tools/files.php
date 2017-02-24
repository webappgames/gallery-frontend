<?php

function list_recursive($path){

    $list = array();

    $dir = new DirectoryIterator($path);
    foreach ($dir as $file) {

        if (!$file->isDot()) {

            if ($file->isDir()) {
                $list = array_merge($list, list_recursive($file->getPathname()));
            }

            $list[] = $file->getPathname();


        }
    }

    return ($list);
}



function chmod_recursive($path,$mod){

    chmod($path, $mod);

    $files = list_recursive($path);
    foreach ($files as $file) {
        chmod($file, $mod);
    }
}

function unlink_recursive($path){

    $files = list_recursive($path);
    foreach ($files as $file) {
        if(is_dir($file)){
            rmdir($file);
        }else{
            unlink($file);
        }

    }

    rmdir($path);
}




//--------------------------------------------------------------------------------ftp



function ftp_list_recursive($conn_id,$directory){

    $list = array();

    echo("$directory\n");
    $dir = ftp_nlist($conn_id,$directory);


    foreach ($dir as $node) {

        if($node!='.' && $node!='..'){

            $node = $directory.'/'.$node;

            if (ftp_is_dir( $conn_id,  $node )) {
                $list = array_merge($list, ftp_list_recursive($conn_id, $node));
            }

            $list[] = $node;


        }



    }

    return ($list);

}



function ftp_is_dir( $conn_id,  $dir ){
    if( @ftp_chdir( $conn_id, $dir ) ) {
        ftp_chdir( $conn_id, '/../' );
        return true;
    } else {
        return false;
    }
}






function ftp_put_directory($conn_id, $src_dir, $dst_dir) {
    $d = dir($src_dir);
    while($file = $d->read()) { // do this for each file in the directory
        if ($file != "." && $file != "..") { // to prevent an infinite loop
            if (is_dir($src_dir."/".$file)) { // do the following if it is a directory
                if (!@ftp_chdir($conn_id, $dst_dir."/".$file)) {
                    ftp_mkdir($conn_id, $dst_dir."/".$file); // create directories that do not yet exist
                    ftp_chmod($conn_id,0777,$dst_dir."/".$file);
                }
                ftp_put_directory($conn_id, $src_dir."/".$file, $dst_dir."/".$file); // recursive part
            } else {
                $upload = ftp_put($conn_id, $dst_dir."/".$file, $src_dir."/".$file, FTP_BINARY); // put the files
                ftp_chmod($conn_id,0777,$dst_dir."/".$file);
            }
        }
    }
    $d->close();
}





function ftp_upload_file($conn_id, $file_remote, $file_local){//todo params
    $fp = fopen($file_local, 'r');
    $result = ftp_fput($conn_id, $file_remote, $fp, FTP_BINARY);
    fclose($fp);
    return $result;
}




//--------------------------------------------------------------------------------ssh

function ssh_put_directory($conn_id, $src_dir, $dst_dir) {
    $d = dir($src_dir);
    while($file = $d->read()) { // do this for each file in the directory
        if ($file != "." && $file != "..") { // to prevent an infinite loop
            if (is_dir($src_dir."/".$file)) { // do the following if it is a directory
                


				/*if (!@ftp_chdir($conn_id, $dst_dir."/".$file)) {
                    ftp_mkdir($conn_id, $dst_dir."/".$file); // create directories that do not yet exist
                    ftp_chmod($conn_id,0777,$dst_dir."/".$file);
                }*/



                ftp_put_directory($conn_id, $src_dir."/".$file, $dst_dir."/".$file); // recursive part


            } else {

				ssh2_scp_send ( $conn_id , $src_dir."/".$file , $dst_dir."/".$file , 0777 );
                //$upload = ftp_put($conn_id, $dst_dir."/".$file, $src_dir."/".$file, FTP_BINARY); // put the files
                //ftp_chmod($conn_id,0777,$dst_dir."/".$file);
            }
        }
    }
    $d->close();
}


?>
