<?php


$objects = json_decode(file_get_contents('objects.compiled.json'),true);
$labels = array_filter($objects, function($object) {
    return $object['type'] == 'label';
});



function getRoute($labels,$uri){

    $uri = trim($uri,'/');

    foreach ($labels as $object){
        if(trim($object['uri'],'/') == $uri){
            return $object;
        }
        //echo(':'.$object['id'] .' == '. $uri."\n");
        if(':'.$object['id'] == $uri){
            return $object;
        }
    }
}




$route = getRoute($labels,explode('?',$_SERVER['REQUEST_URI'])[0]);
$routeRoot = getRoute($labels,'/');

//echo(1);
//print_r($route);


if(!$route){

    $route = $routeRoot;
    http_response_code(404);

}


if($route == $routeRoot){

    $title = $routeRoot['name'];

}else{

    $title = $route['name'].' | '.$routeRoot['name'];

}



$fullUrl = 'http://'.$_SERVER['HTTP_HOST'].$route['uri'];
$fullScreenshotUrl = 'http://'.$_SERVER['HTTP_HOST'].'/'.$route['screenshot'];



if(isset($_GET['comments'])){
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Comments</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    <body>
    <div id="fb-root"></div>
    <<?php ?>script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v2.8&appId=602465393294706";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
    <div class="fb-comments" data-href="<?=addslashes($fullUrl)?>" data-mobile="1" data-num-posts="7"></div>

    </body>
    </html>
    <?php
    exit;
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=htmlspecialchars($title)?></title>



    <link rel="stylesheet" href="src/viewer/style/viewer.css">







    <!-- Dependencies -->
    <!--<script src="/node_modules/react/dist/react.js"></script>
    <script src="/node_modules/react-dom/dist/react-dom.js"></script>
    <script src="/node_modules/react-draggable/dist/react-draggable.js"></script>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script src="/node_modules/jszip/dist/jszip.min.js"></script>
    <script src="/node_modules/file-saver/FileSaver.min.js"></script>
    <script src="/node_modules/mustache/mustache.min.js"></script>
    <script src="/node_modules/html2canvas/dist/html2canvas.js"></script>
    <script src="/node_modules/jsuri/Uri.js"></script>
    <script src="/node_modules/lodash/lodash.js"></script>
    <script src="/node_modules/babylonjs/babylon.js"></script>
    <script src="/node_modules/handjs/hand.min.js"></script>-->










    <meta property="og:image" content="<?=addslashes($fullScreenshotUrl)?>"/>


</head>
<body>









<div id="app"></div>



<!--=================================================================================================================-->



<!--todo move to header-->
<script src="/dist/viewer.js"></script>
<script>


    console.log(GALLERY);


    function runApp(objects,deployObjects,analyticsObject){


        /**/
        var compiled_objects = new GALLERY.Objects.CompiledArray(objects);



        if (deployObjects) {
            deployObjects = new GALLERY.Objects.Array(deployObjects);
        }


        if (analyticsObject) {
            analyticsObject = new GALLERY.Objects.Analytics(analyticsObject);
        }




        var viewerApp = new GALLERY.Viewer.GalleryApp(
            compiled_objects,
            document.getElementById('app'),
            {
                mode: 'develop',
                state: location.toString(),
                deployObjects: deployObjects,
                analyticsObject: analyticsObject
            },
            function (newState) {
                //...
            }
        );

        console.log('Objects:: ', GALLERY.Viewer.objects);

        //viewerApp.gameMode();


        window.onpopstate = function (event) {

            viewerApp.setState(window.document.location.toString());

        };


        window.addEventListener("resize", function () {
            viewerApp.resize();
        });


        viewerApp.setState('/');
        viewerApp.onStateChange(function (state) {

            alert(state);


        });
        /**/
        //viewerApp.getState();

    }


    if(localStorage.getItem('preview-compiledObjects')) {//todo make preview = true localstorage item


        var objects = JSON.parse(localStorage.getItem('preview-compiledObjects'));
        var deployObjects = JSON.parse(localStorage.getItem('preview-deployObjects'));
        var analyticsObject = JSON.parse(localStorage.getItem('preview-analyticsObject'));

        runApp(objects,deployObjects,analyticsObject);


    }

</script>



<!--GALLERY SCRIPT-->


</body>
</html>