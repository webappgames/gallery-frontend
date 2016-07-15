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

            if(!block.material)return;

            var position = new BABYLON.Vector3(
                block.position.x * -BLOCK_SIZE,
                BLOCK_SIZE*BLOCK_SIZE_VERTICAL/2,
                block.position.y * BLOCK_SIZE
            );


            if(block.material=='wall' || block.material=='door') {


                //Simple crate
                var box = new BABYLON.Mesh.CreateBox("crate", BLOCK_SIZE, scene);
                box.material = new BABYLON.StandardMaterial("Mat", scene);
                box.material.diffuseColor = new BABYLON.Color3(0.2,0.2,0.2);
                //box.material.diffuseTexture = new BABYLON.Texture("images/textures/crate.png", scene);
                //box.material.diffuseTexture.hasAlpha = true;
                box.position = position;
                box.scaling.y = BLOCK_SIZE_VERTICAL;
                box.checkCollisions = true;


                if(block.material=='door') {
                    box.scaling.y = BLOCK_SIZE_VERTICAL-BLOCK_SIZE_DOOR;
                    box.position.y += BLOCK_SIZE_DOOR*BLOCK_SIZE;
                }


            }else
            if(block.material=='light'){

                r('creating light');
                new BABYLON.PointLight("Omni", position, scene);

            }





            
        });

        
        
        
        
        
        
        
    });



});