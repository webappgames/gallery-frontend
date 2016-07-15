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



    <section id="admin-gallery">
        
        <img src="">
        
    </section>


    <section id="admin-world">
    </section>



    <nav id="admin-tools">
    <button class="save">Uložit</button>
    <button class="new">Nový</button>


        <div class="palette">
            <div class="block" data-material=""></div>
            <div class="block" data-material="wall"></div>
            <div class="block" data-material="door"></div>
            <div class="block" data-material="light"></div>
        </div>

    </nav>


    <script src="script/palette.js"></script>


</body>
</html>