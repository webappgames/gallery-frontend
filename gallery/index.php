<?php

error_reporting(E_ALL & ~E_NOTICE);

$config = json_decode(file_get_contents('../config.json'),true);





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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=htmlspecialchars($page['name'])?></title>

    <script>
        var r = console.log.bind(console);
    </script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">



    <!-- Babylon.js -->
    <script src="script/babylon/hand.minified-1.2.js"></script>
    <script src="script/babylon/cannon.js"></script>
    <!--<script src="script/babylon/oimo.js"></script>-->
    <script src="script/babylon/babylon.js"></script>
    <script src="script/babylon-plugins/babylon-tree.js"></script>
    <script src="script/babylon-plugins/babylon-stairs.js"></script>
    <script src="script/uri-plugin.js"></script>



    <script src="node_modules/jquery/dist/jquery.min.js"></script>



    
    <?php

    foreach(glob('style/*.css') as $file){
        echo('<link rel="stylesheet" href="'.$file.'">');
    }

    ?>


</head>
<body>





<nav id="menu">


    <a onclick="moveTo(<?=$index_label['position']['x']?>,<?=$index_label['position']['y']?>,<?=$index_label['rotation']?>);" id="menu-title">
        <img src="<?=htmlspecialchars($page['favicon'])?>" alt="<?=htmlspecialchars($page['name'])?>">
        <h1><?=htmlspecialchars($page['name'])?></h1>
    </a>

    <ul>

        <?php



        foreach($objects as $object) {


            if($object['type']=='label') {

                if ($object['uri'] == '/')continue;

                ?>

                <li>
                    <a onclick="moveTo(<?=$object['position']['x']?>,<?=$object['position']['y']?>,<?=$object['rotation']?>);"><?=$object['name']?></a>

                </li>

                <?php

            }
        }
        ?>

    </ul>

    <!--<div id="languages" >
        <a href="http://pavolhejny.com" class="selected"><img src="images/locale/en.png" alt="en flag" title="English"></a>
        <a href="http://pavolhejny.cz" class=""><img src="images/locale/cs.png" alt="cs flag" title="Čeština"></a>
    </div>-->

</nav>



<div class="key topleft" id="pointer-lock"><p><i class="fa fa-arrows" aria-hidden="true"></i></p></div>




<div class="overlay" style="display: none;"></div>
<div class="popup-window" style="display: none;">
    <div class="header"></div>
    <div class="content"></div>


    <!--<div class="back js-popup-window-back" style="display: none;" onclick="window.history.back();"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>-->
    <div class="close js-popup-window-close"><i class="fa fa-times"></i></div>
</div>






<canvas id="scene"></canvas>
<script src="script/scene.js"></script>
<script src="script/map.js"></script>
<script src="script/keys.js"></script>
<script src="script/move-to.js"></script>
<script src="script/pointer-lock.js"></script>
<script src="script/popup-window.js"></script>

<script>
    document.getElementById("scene").focus();
    runGallery(<?=json_encode($objects)?>);

</script>


</body>
</html>