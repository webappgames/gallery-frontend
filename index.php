<?php

$config = json_decode(file_get_contents('config.json'),true);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Virtuální galerie</title>

    <script>
        var r = console.log.bind(console);
    </script>
</head>
<body>

<b>Vyberte galerii:</b>

<ul>
    <?php


    $galleries = json_decode(file_get_contents($config['GALLERY_API_URL'].'galleries'),true);
    foreach($galleries as $gallery){

        echo('<li><a href="gallery?gallery='.htmlspecialchars(urlencode($gallery)).'">'.htmlspecialchars($gallery).'</a></li>'."\n");


    }

    ?>
</ul>


<a href="/admin/">Vytvořte si vlastní galerii</a>


</body>
</html>