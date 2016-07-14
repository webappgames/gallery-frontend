/**
 * Created by Pavel on 14.07.2016.
 */



$(function(){



    $.get({
        url: 'api/map.php'
    })
        .fail(function (response) {

        console.log('fail',response);

        }).done(function (response) {




        console.log('done', response);




        var blocks = '';
        response.forEach(function (block) {

            //console.log(block);

            if(block.material) {


                //Simple crate
                var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
                box.material = new BABYLON.StandardMaterial("Mat", scene);
                box.material.diffuseColor = new BABYLON.Color3(0.2,0.2,0.2);
                //box.material.diffuseTexture = new BABYLON.Texture("images/textures/crate.png", scene);
                //box.material.diffuseTexture.hasAlpha = true;
                box.position = new BABYLON.Vector3(block.position.x * 2, 2*3/2, block.position.y * 2);
                box.scaling.y = 3;
                box.checkCollisions = true;

            }
            
        });

        
        
        
        
        
        
        
    });



});