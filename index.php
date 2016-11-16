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
    }
}




$route = getRoute($labels,$_SERVER['REQUEST_URI']);



if(!$route){

    $route = getRoute($labels,'/');
    http_response_code(404);

}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=htmlspecialchars($route['name'])?></title>



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


    <meta property="og:image" content="<?=addslashes($route['screenshot'])?>"/>


</head>
<body>






<canvas id="scene"></canvas>






<div class="key topleft hints" id="pointer-lock">
    <p><i class="fa fa-arrows" aria-hidden="true"></i></p>

    <img src="/media/images/ui/mouse-lock.png" width="200">

</div>



<div class="bottomright hints" id="wasd">


    <img src="/media/images/ui/keys-text.png" width="200">
    <table>
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



<!--=================================================================================================================-->




<!--<script src="viewer/script/lib/jquery.jfeed.js"></script>-->
<script src="/viewer/script/lib/babylon.js"></script>
<script src="/node_modules/handjs/hand.min.js"></script>
<script src="/viewer/script/viewer.js"></script>
<script>
    $.get('/objects.compiled.json').done(function(response){
        GALLERY.Viewer.run(new GALLERY.Objects.CompiledArray(response));
    });
</script>




</body>
</html>