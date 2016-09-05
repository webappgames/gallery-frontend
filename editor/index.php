<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Administrace | Virtuální galerie</title>
    </head>


    <script>
        var r = console.log.bind(console);
    </script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">





    <script
            src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
    <script
            src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
            integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E="
            crossorigin="anonymous"></script>





    <script src="../viewer/script/images.js"></script>
    <script src="../viewer/script/uri-plugin.js"></script>









    <?php

    if ( ! function_exists('glob_recursive'))
    {
        // Does not support flag GLOB_BRACE
       function glob_recursive($pattern, $flags = 0)
       {
         $files = glob($pattern, $flags);
         foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir)
         {
           $files = array_merge($files, glob_recursive($dir.'/'.basename($pattern), $flags));
         }
      return $files;
      }
    }

    $files = glob_recursive('script/*.js');
    sort($files);
    foreach($files as $file){
        echo('<script src="'.$file.'"></script>'."\n");
    }

    ?>






    <link rel="stylesheet" href="style/main.css">



<body>


    <form id="select-gallery">

        <div class="popup">

            <div class="header">Administrace virtuálních galerií</div>


            <p>Založte novou galerii napsáním jejího názvu a přístupového hesla k ní:</p>

            <div>
                <label>Galerie:</label>
                <input type="text" name="gallery" pattern="([a-z]|[A-Z]|[0-9]|-){2,15}" title="Zadejte název pouze z písmen, čísel a pomlček, který má 2-15 znaků." >
            </div>
            <div>
                <label>Heslo:</label>
                <input type="password" name="password" required>
            </div>

            <input type="submit" name="submit" value="Vstoupit">

            <p>Nebo klikněte na už existující galerii a upravte ji (pokud k ní máte přístupové heslo):</p>
            <ul></ul>


            <a href="/"><button>Procházet jednotlivé galerie</button></a>


        </div>


    </form>




    <main>




        <section id="admin-storeys">
            <div id="admin-world-basement">
            </div>
            <div id="admin-world">
            </div>
        </section>






        <div id="dot"></div>


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

            <a href="" id="show-gallery" target="show-gallery"><button>Zobrazit</button></a>
            <button onclick="logout();">Odhlásit se</button>

            <button onclick="runGenerator(GALLERY.Plugins.Generators.SimpleGarden);">Generátory</button>

        </fieldset>





        <fieldset class="palette">
            <legend>Prostor</legend>




            <fieldset class="select-storeys">
                <legend>Podlaží</legend>
                <ul></ul>
            </fieldset>


            <fieldset class="select-zooms">
                <legend>Zoom</legend>
                <ul></ul>
            </fieldset>


        </fieldset>






        <fieldset class="palette">
            <legend>Budova</legend>


            <fieldset class="select-materials">
                <legend>Materiály</legend>
            </fieldset>



            <fieldset class="select-shapes">
                <legend>Tvary</legend>
            </fieldset>







        </fieldset>




        <fieldset class="palette">
            <legend>Předměty</legend>
            <div class="light" title="Světlo"><i class="fa fa-sun-o" aria-hidden="true"></i></div>
            <div class="label" title="Odkaz"><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></div>
            <div class="tree" title="Strom"><i class="fa fa-pagelines" aria-hidden="true"></i></div>
            <div class="stairs" title="Schody"><i class="fa fa-level-up" aria-hidden="true"></i></div>
           </fieldset>



        <div id="message-zone">
        </div>





    </nav>





    <script src="script/20-palette.js"></script>
    <script src="script/10-filedrop.js"></script>


</body>
</html>