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



    <script
            src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
    <script
            src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
            integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="
            crossorigin="anonymous"></script>

    <link rel="stylesheet" href="/viewer/style/viewer.css">


    <script src="/node_modules/jszip/dist/jszip.min.js"></script>
    <script src="/node_modules/file-saver/FileSaver.min.js"></script>
    <script src="/node_modules/mustache/mustache.min.js"></script>



    <script src="http://cssrefresh.frebsite.nl/js/cssrefresh.js"></script>
    <!--<script src="https://cdn.ravenjs.com/3.9.1/raven.min.js"></script>-->






    <meta property="og:image" content="<?=addslashes($fullScreenshotUrl)?>"/>


</head>
<body>









<canvas id="scene"></canvas>


<div class="fps" style="display: none;"></div>





<!--<button class="bottomright" id="pointer-lock">
    <i class="fa fa-gamepad" aria-hidden="true"></i> Herní mód
</button>-->





<div class="bottomright" id="wasd" style="display: none;">
   <table>
       <tr>
           <td colspan="3"><p class="hint">Pohybujte se těmito klávesy<!--Move in gallery with theese keys--> <i class="fa fa-hand-o-down" aria-hidden="true"></i></p></td>
       </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td><div class="key"><p>W</p></div></td>
            <td></td>
        </tr>
        <tr>
            <td><div class="key"><p>A</p></div></td>
            <td><div class="key"><p>S</p></div></td>
            <td><div class="key"><p>D</p></div></td>
        </tr>
    </table>
</div>











<div class="overlay" style="display: none;"></div>
<div class="popup-window" style="display: none;">
    <div class="header"></div>
    <div class="content"></div>


    <!--<div class="back js-popup-window-back" style="display: none;" onclick="window.history.back();"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>-->
    <div class="close js-popup-window-close"><i class="fa fa-times"></i></div>
</div>








<section id="zones">
</section>



<!--<nav>
    <div class="turn-left" onclick="GALLERY.Viewer.appStateTurnLeft();"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
    <div class="turn-right" onclick="GALLERY.Viewer.appStateTurnRight();"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
</nav>-->



<!--=================================================================================================================-->



<script src="/viewer/script/lib/babylon.js"></script>
<script src="/node_modules/handjs/hand.min.js"></script>


<!--<script src="http://www.babylonjs.com/hand.minified-1.2.js"></script>
<script src="http://www.babylonjs.com/babylon.js"></script>-->





<script src="/viewer/script/viewer.js"></script>
<script>
    $.get('/objects.compiled.json').done(function(response){
        GALLERY.Viewer.run(new GALLERY.Objects.CompiledArray(response));
    });
</script>



<!--GALLERY SCRIPT-->


</body>
</html>