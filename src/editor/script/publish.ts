/// <reference path="reference" />



/*<?php

    error_reporting(E_ALL & ~E_NOTICE);

$config = json_decode(file_get_contents('../config.json'),true);


if(isset($_GET['gallery'])) {

    $gallery = $_GET['gallery'];

}else{

    http_response_code(404);
    die('Galerie neexistuje!');

}




$response = file_get_contents($config['GALLERY_API_URL'].'galleries/'.($gallery));
if($response) {

    $objects = json_decode($response, true);

}else{

    http_response_code(404);
    die('Galerie neexistuje!');

}


$page = array();
foreach($objects as $object) {

    if ($object['uri'] == '/') {

        $page['name'] = $object['name'];
        $index_label = $object;

    }
    if ($object['name'] == 'favicon') {

        $page['favicon'] = $object['src'];

    }
}


?>
*/


/*$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
                // setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
                    async = options.async || true,
                    // blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null,
                    username = options.username || null,
                    password = options.password || null;

                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});*/





var compiled_objects;




module GALLERY.Editor{


    export function compile(){

        compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);
        r(compiled_objects);

        previewHTML();

    }



    export function previewHTML(){



        let gallery_domain: string;
        let gallery_password: string;




        let analyticsObject = objects.filterTypes('analytics').findBy('analyticsType','gallery');
        let deployObjects = objects.filterTypes('deploy');//.findBy('deployType','ftp');



        localStorage.setItem('preview-compiledObjects', JSON.stringify(compiled_objects));

        localStorage.setItem('preview-analyticsObject', JSON.stringify(analyticsObject));//todo deprecated
        localStorage.setItem('preview-deployObjects', JSON.stringify(deployObjects));



        let previewWindow = window.open("/#preview", "gallery-preview");




    }








    /*
    export function publishOnWeb(){


        var deploys = objects.filterTypes('deploy');
        if(deploys.length == 1){


            var message = Message.info();




            var deploy = deploys.getAll()[0];
            compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);


            var xmlHttpRequest = new XMLHttpRequest();




            xmlHttpRequest.open('POST', deploy.url+'/update.php?password='+deploy.password, true);
            //xmlHttpRequest.setRequestHeader('Content-Type', mimeType);
            //xmlHttpRequest.setRequestHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');





            var formData = new FormData();
            formData.append('compiled', JSON.stringify(compiled_objects.getAll()));
            formData.append('script', VIEWER_SCRIPT);
            formData.append('style', VIEWER_STYLE);
            xmlHttpRequest.send(formData);


            message.text('Nahrávání na server...');
            r('Sending request to '+deploy.url);



            xmlHttpRequest.onload = function () {
                r('Status of request changed to '+xmlHttpRequest.status);

                if (xmlHttpRequest.status == 200) {

                    message.text('Uploaded!','success').close();

                }else{

                    message.text('Error when deploying, maybe wrong password or url.','error').close();

                }
            };


        }else{

            alert('There is '+deploys.length+' deploy objects!');
        }







    }/**/




}


