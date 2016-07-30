<?php

if(isset($_GET['gallery'])) {

    $gallery = $_GET['gallery'];

}else{

    require 'nogallery.php';
    exit;

}




?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>3D Galerie</title>
    </head>


    <script>
        var r = console.log.bind(console);
        var gallery = '<?=$gallery?>';

    </script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script src="../script/images.js"></script>
    <script src="../script/uri-plugin.js"></script>
    <script src="script/message.js"></script>
    <script src="script/outer-html.js"></script>
    <script src="script/position.js"></script>
    <script src="script/create-html.js"></script>
    <script src="script/create-map.js"></script>
    <script src="script/load.js"></script>
    <script src="script/save.js"></script>
    <script src="script/new.js"></script>
    <script src="script/keys.js"></script>



    <link rel="stylesheet" href="style/main.css">



<body>

    <main>

        <section id="admin-world">
        </section>


        <div id="selected-toolbox">

            <!--<i class="delete fa fa-trash" aria-hidden="true"></i>
            <i class="resize fa fa-square" aria-hidden="true"></i>
            <i class="rotate fa fa-circle" aria-hidden="true"></i>-->


        </div>

    </main>


    <div id="save"></div>



    <nav id="menu-left">
        <fieldset class="palette" id="selected-properties">
        </fieldset>
    </nav>




    <nav id="menu-right">


        <fieldset class="palette" id="admin-tools">
            <legend>Akce</legend>
            <a href="../?gallery=<?=$gallery?>" target="show-gallery"><button>Zobrazit</button></a>
        </fieldset>



        <fieldset class="palette">
            <legend>Budova</legend>
            <div class="block" data-shape="none" title="Mimo budovu"></div>
            <div class="block" data-shape="room" title="Místnost"></div>
            <div class="block" data-shape="wall" title="Zeď"></div>
            <div class="block" data-shape="door" title="Dveře"></div>
            <div class="block" data-shape="window" title="Okno"></div>
        </fieldset>




        <fieldset class="palette">
            <legend>Předměty</legend>
            <div class="light"><i class="fa fa-sun-o" aria-hidden="true" title="Světlo"></i></div>
            <div class="label"><i class="fa fa-arrow-circle-o-up" aria-hidden="true" title="Odkaz"></i></div>
           </fieldset>



        <div id="message-zone">
        </div>





    </nav>





    <script src="script/palette.js"></script>
    <script src="script/filedrop.js"></script>


</body>
</html>