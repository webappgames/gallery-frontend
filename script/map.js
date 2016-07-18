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
        response.forEach(function (object) {


            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                BLOCK_SIZE*BLOCK_SIZE_VERTICAL/2,
                object.position.y * BLOCK_SIZE
            );




            if(object.type=='block') {
                if (object.shape == 'wall' || object.shape == 'door') {

                    //Simple crate
                    var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                    box.material = new BABYLON.StandardMaterial("Mat", scene);
                    box.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                    //box.material.diffuseTexture = new BABYLON.Texture("images/textures/crate.png", scene);
                    //box.material.diffuseTexture.hasAlpha = true;
                    box.position = position;
                    box.scaling.y = BLOCK_SIZE_VERTICAL;
                    box.checkCollisions = true;


                    if (object.material == 'door') {
                        box.scaling.y = BLOCK_SIZE_VERTICAL - BLOCK_SIZE_DOOR;
                        box.position.y += BLOCK_SIZE_DOOR * BLOCK_SIZE;
                    }


                }
            }else
            if(object.type=='light'){

                //r('creating light');
                new BABYLON.PointLight("light", position, scene);


            }else
            if(object.type=='image'){

                //Simple crate
                var box = new BABYLON.Mesh.CreateBox("image", BLOCK_SIZE, scene);
                //box.material = new BABYLON.StandardMaterial("Mat", scene);
                //box.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

                box.material = new BABYLON.StandardMaterial("texture4", scene);
                box.material.diffuseTexture = new BABYLON.Texture(object.src, scene);
                box.material.diffuseTexture.vOffset = 1;//Vertical offset of 10%
                box.material.diffuseTexture.uOffset = 1;//Horizontal offset of 40%
                box.material.diffuseTexture.hasAlpha = true;//Has an alpha

                box.position = position;
                box.scaling.x = object.size.width;
                box.scaling.y = object.size.width;
                box.scaling.z = 0.1;

                box.rotation.y=Math.PI;

                box.position.y = EYE_VERTICAL * BLOCK_SIZE;

                box.checkCollisions = true;



            }









            
        });

        
        
        
        
        
        
        
    });



});