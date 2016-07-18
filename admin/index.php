<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>


    <script>
        var r = console.log.bind(console);
    </script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script src="script/position.js"></script>
    <script src="script/create-html.js"></script>
    <script src="script/create-map.js"></script>
    <script src="script/load.js"></script>
    <script src="script/save.js"></script>
    <script src="script/new.js"></script>


    <?php

    foreach(glob('style/*.css') as $file){
        echo('<link rel="stylesheet" href="'.$file.'">');
    }

    ?>
    

<body>

    <section id="admin-world">
    </section>


    <div id="selected-toolbox">

        <i class="delete fa fa-trash" aria-hidden="true"></i>
        <i class="resize fa fa-square" aria-hidden="true"></i>
        <i class="rotate fa fa-circle" aria-hidden="true"></i>


    </div>



    <!--<nav id="menu-left">

        <fieldset class="palette">
            <legend>galerie</legend>
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
        </fieldset>
        
    </nav>-->
 



    <nav id="menu-right">


        <fieldset class="palette" id="admin-tools">
            
            <legend>Akce</legend>
            <button class="save">Uložit</button>
            <button class="new">Nový</button>
            
        </fieldset>

        
        
        <fieldset class="palette">

            <legend>Bloky</legend>

            <div class="block" data-shape="room"></div>
            <div class="block" data-shape="wall"></div>
            <div class="block" data-shape="door"></div>
        </fieldset>




        <fieldset class="palette">
            <legend>Předměty</legend>
            <div class="light"></div>
            <div class="label"></div>

        </fieldset>




    </nav>


    <script src="script/palette.js"></script>
    <script src="script/filedrop.js"></script>


</body>
</html>