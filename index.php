<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gallery</title>

    <script>
        var r = console.log.bind(console);
    </script>

    <!-- Babylon.js -->
    <script src="script/babylon/hand.minified-1.2.js"></script>
    <script src="script/babylon/cannon.js"></script>
    <!--<script src="script/babylon/oimo.js"></script>-->
    <script src="script/babylon/babylon.js"></script>



    <script src="node_modules/jquery/dist/jquery.min.js"></script>


    <script src="script/images.js"></script>

    
    <?php

    foreach(glob('style/*.css') as $file){
        echo('<link rel="stylesheet" href="'.$file.'">');
    }

    ?>


</head>
<body>





<nav id="menu">

    <a href="#about" id="menu-title">
        <img src="http://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=30&r=pg&d=mm" alt="Pavol Hejný">
        <h1>Pavol Hejný</h1>
    </a>

    <ul>
        <li>
            <a href="#articles">Articles + Talks</a>



        </li>
        <li>
            <a href="#projects">Projects</a>



        </li>
        <li>
            <a href="#gallery">Gallery</a>



        </li>
        <li>
            <a href="#contact">Contact</a>



        </li>


    </ul>

    <div id="languages" >

        <a href="http://pavolhejny.com" class="selected"><img src="images/locale/en.png" alt="en flag" title="English"></a>

        <a href="http://pavolhejny.cz" class=""><img src="images/locale/cs.png" alt="cs flag" title="Čeština"></a>



    </div>
</nav>








<canvas id="scene"></canvas>
<script src="script/scene.js"></script>
<script src="script/map.js"></script>
<script src="script/keys.js"></script>


<script>
    document.getElementById("scene").focus();
</script>


</body>
</html>