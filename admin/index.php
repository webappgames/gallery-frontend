<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>


    <script>
        var r = console.log.bind(console);
    </script>

    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
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



    <nav id="menu-left">

        <fieldset class="palette">
            <legend>galerie</legend>
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
        </fieldset>
        
    </nav>
 



    <nav id="menu-right">


        <fieldset class="palette" id="admin-tools">
            
            <legend>Akce</legend>
            <button class="save">Uložit</button>
            <button class="new">Nový</button>
            
        </fieldset>

        
        
        <fieldset class="palette">

            <legend>Bloky</legend>

            <div class="block" data-material=""></div>
            <div class="block" data-material="wall"></div>
            <div class="block" data-material="door"></div>
            <div class="block" data-material="light"></div>
        </fieldset>




        <fieldset class="palette">
            <legend>Předměty</legend>
            <div class="item" data-material="light"></div>
        </fieldset>




    </nav>


    <script src="script/palette.js"></script>


</body>
</html>