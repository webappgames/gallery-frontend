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





namespace GALLERY.Editor{



    export function publishHTML(){



        /*let promises =

        [
            '../viewer/index.template.html',
            '../viewer/viewer.js'


        ].map(function(url){

            return new Promise(function(resolve, reject){
                $.ajax(url).done(resolve).fail(reject);
            });

        });

        r(promises);


        Promise.all(promises).then(function (responses) {

            r(responses);

        });*/


        $.when(

            $.ajax({url: '../viewer/index.template.html',dataType: "text"}),
            $.ajax({url: '../viewer/style/viewer.css',dataType: "text"}),
            $.ajax({url: '../viewer/script/lib/babylon.js',dataType: "text"}),
            $.ajax({url: '../viewer/viewer.js',dataType: "text"}),

        )/*.then(function (a,b) {

            r('then');
            r(a,b);

        })*/.done(function(html,viewercss,babylonjs,viewerjs){



            var compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);
            r('Publishing '+compiled_objects.getAll().length+' objects created from '+objects.getAll().length+' objects.');




            html = html[0]
                .split('{{title}}').join('Ahoj')
                //.split('{{viewercss}}').join(viewercss[0])
                //.split('{{babylonjs}}').join(babylonjs[0])
                //.split('{{viewerjs}}').join(viewerjs[0])
                .split('{{objects}}').join(JSON.stringify(compiled_objects.getAll()))
            ;



            var zip = new JSZip();
            var root = zip.folder(gallery);


            root.file("index.html", html);
            root.file("babylon.js", babylonjs[0]);
            root.file("viewer.js", viewerjs[0]);
            root.file("viewer.css", viewercss[0]);





            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    // see FileSaver.js
                    saveAs(content, gallery+".zip");
                });




        });



    }




}


