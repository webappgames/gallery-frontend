<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>3D Galerie</title>
</head>


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
<link rel="stylesheet" href="style/main.css">

<body>



You should select gallery!


<ul>

<?php
foreach(glob( __DIR__.'/../data/*') as $gallery){

    echo('<li><a href="?gallery='.basename($gallery).'">'.htmlspecialchars(basename($gallery)).'</a></li>');


}
?>
</ul>




<form id="create-gallery">

    <input type="text" name="gallery">
    <!--<input type="password" name="password">-->
    <input type="submit" value="OK">


</form>

<script>

    $('#create-gallery').submit(function(e){

        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/galleries/'+$(this).find('input[name="gallery"]').val(),
            contentType: "application/json",
            data: JSON.stringify([])



        }).done(function (response) {

            console.log('done',response);


        }).fail(function (response) {

            console.log('fail',response);

        });

    });

</script>






</body>
</html>