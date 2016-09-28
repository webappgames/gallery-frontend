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





$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
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
});





var compiled_objects;




namespace GALLERY.Editor{


    export function compile(){

        compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);
        r(compiled_objects);

        previewHTML();

    }



    export function previewHTML(){


        var preview = window.open("../viewer", "gallery-preview");


        //r(preview.moveToBegining);


        setTimeout(function () {
            preview.objects = compiled_objects;
            preview.moveToBegining.call(preview);
        },1000);




        /*var theWindow = window.open("../viewer", "gallery-preview"),
            theDoc = theWindow.document,
            theScript = document.createElement('script');
        function injectThis() {
            // The code you want to inject goes here
            alert(document.body.innerHTML);
        }
        theScript.innerHTML = 'window.onload = ' + injectThis.toString() + ';';
        theDoc.body.appendChild(theScript);*/



        /*preview.onload = function () {

            r('loaded');

            preview.objects = compiled_objects;
            preview.moveToBegining();

        };

        */



    }






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




        let sources = [

            'viewer/index.html',
            'viewer/style/viewer.css',
            'viewer/script/lib/babylon.js',
            'viewer/script/viewer.js',


            'media/images/backgrounds/menu.png',
            'media/images/backgrounds/page.png',

            'media/images/skybox/TropicalSunnyDay_px.jpg',
            'media/images/skybox/TropicalSunnyDay_py.jpg',
            'media/images/skybox/TropicalSunnyDay_pz.jpg',
            'media/images/skybox/TropicalSunnyDay_nx.jpg',
            'media/images/skybox/TropicalSunnyDay_ny.jpg',
            'media/images/skybox/TropicalSunnyDay_nz.jpg',

            'media/images/textures/clay-bricks.jpg',
            'media/images/textures/clay-roof.jpg',
            'media/images/textures/iron-plates.jpg',
            'media/images/textures/stone-bricks.jpg',
            'media/images/textures/stone-plain.jpg',
            'media/images/textures/wood-boards.jpg',
            'media/images/textures/wood-fence.jpg',
            'media/images/textures/wood-raw.jpg',
            'media/images/textures/grass.jpg',
            'media/images/textures/bark.jpg',
            'media/images/textures/color-white.jpg',
            'media/images/textures/color-light-gray.jpg',
            'media/images/textures/color-dark-gray.jpg',

            'media/sound/link-key.mp3',
            'media/sound/link-teleport.mp3',
            'media/sound/link-key-none.mp3',
            'media/sound/gate-locked.mp3',
            'media/sound/step-stairs.mp3',
            'media/sound/step-ground.mp3',
            'media/sound/step-room.mp3'
        ];


        let promises = sources.map(function (url) {

            let dataType:string;

            //r(url.substr(-4));
            if(['.mp3','.jpg','.png'].indexOf(url.substr(-4))!==-1){//todo better

                dataType = 'binary';

            }else{

                dataType = 'text';

            }


            return($.ajax({url: '../'+url,dataType: dataType}));
        });



        $.when(...promises).done(function(...results){

            r(results);


            var compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);


            results[0][0] = results[0][0]
                .split('{{title}}').join('Ahoj')
                .split('{{objects}}').join(JSON.stringify(compiled_objects.getAll()))
            ;



            var zip = new JSZip();
            var root = zip.folder(gallery);


            //root.file("index.html", html);



            for(let i=0,l=results.length;i<l;i++){

                root.file(sources[i],results[i][0]);


            }




            /*root.file("babylon.js", babylonjs[0]);
            root.file("viewer.js", viewerjs[0]);
            root.file("viewer.css", viewercss[0]);


            r(sound,image);

            root.file("test.mp3", sound[0]);
            root.file("test.png", image[0]);*/




            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    // see FileSaver.js
                    saveAs(content, gallery+".zip");
                });




        });



    }




}


