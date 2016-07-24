<?php

error_reporting(E_ALL & ~E_NOTICE);



$map_file = __DIR__.'/data/map.json';
$objects = json_decode(file_get_contents($map_file),true);


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

    <!-- Babylon.js -->
    <script src="script/babylon/hand.minified-1.2.js"></script>
    <script src="script/babylon/cannon.js"></script>
    <!--<script src="script/babylon/oimo.js"></script>-->
    <script src="script/babylon/babylon.js"></script>
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








<canvas id="scene"></canvas>
<script src="script/scene.js"></script>
<script src="script/map.js"></script>
<script src="script/keys.js"></script>
<script src="script/move-to.js"></script>


<script>
    document.getElementById("scene").focus();
</script>


</body>
</html>