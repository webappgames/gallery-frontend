<?php

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





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=htmlspecialchars($page['name'])?></title>



    <script
            src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
    <script
            src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
            integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="
            crossorigin="anonymous"></script>




    <link rel="stylesheet" href="style/viewer.css">








</head>
<body>





<nav id="menu">

    <a onclick="moveTo(<?=$index_label['position']['x']?>,<?=$index_label['position']['y']?>,<?=$index_label['rotation']?>,'<?=$index_label['world']?>','<?=$index_label['storey']?>',false);" id="menu-title">
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
                    <a onclick="moveTo(<?=$object['position']['x']?>,<?=$object['position']['y']?>,<?=$object['rotation']?>,'<?=$object['world']?>','<?=$object['storey']?>',false);"><?=$object['name']?></a>

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




        <script src="script/lib/babylon.js"></script>
        <script src="viewer.js"></script>

<script>

    var objects = new GALLERY.Objects.Array(<?=json_encode($objects)?>);
    moveTo(<?=$index_label['position']['x']?>,<?=$index_label['position']['y']?>,<?=$index_label['rotation']?>,'<?=$index_label['world']?>','<?=$index_label['storey']?>');

</script>






</body>
</html>