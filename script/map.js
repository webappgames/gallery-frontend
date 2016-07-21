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


        var objects = response;





        var building_blocks = [];
        var lights = [];

        var blocks = '';
        objects.forEach(function (object) {


            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                BLOCK_SIZE*BLOCK_SIZE_VERTICAL/2,
                object.position.y * BLOCK_SIZE
            );




            if(object.type=='block') {
                if (object.shape == 'wall' || object.shape == 'door') {

                    //Simple crate
                    var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                    box.position = position;
                    box.scaling.y = BLOCK_SIZE_VERTICAL;


                    if (object.shape == 'door') {
                        box.scaling.y = BLOCK_SIZE_VERTICAL - BLOCK_SIZE_DOOR;
                        box.position.y += BLOCK_SIZE_DOOR * BLOCK_SIZE;
                    }


                    building_blocks.push(box);




                }
            }else
            if(object.type=='light'){

                //r('creating light');
                var light = new BABYLON.PointLight("light", position, scene);
                lights.push(light);


            }else
            if(object.type=='image'){


                var rotation = wallRotation(objects,object.position);
                //r(rotation);
                if(typeof rotation === 'number') {


                    var rotation_rad = (rotation / 180) * Math.PI;
                    //Simple crate
                    //var box = new BABYLON.Mesh.CreateBox("image", BLOCK_SIZE, scene);
                    //box.material = new BABYLON.StandardMaterial("Mat", scene);
                    //box.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

                    var box = BABYLON.Mesh.CreatePlane("plane", BLOCK_SIZE, scene);


                    box.material = new BABYLON.StandardMaterial("texture4", scene);
                    box.material.backFaceCulling = false;
                    box.material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                    box.material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                    box.material.specularPower = 32;
                    //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                    box.material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                    box.material.diffuseColor = new BABYLON.Color3(0, 0, 0);


                    box.material.emissiveTexture = new BABYLON.Texture(object.src, scene);
                    box.material.emissiveTexture.vOffset = 1;//Vertical offset of 10%
                    box.material.emissiveTexture.uOffset = 1;//Horizontal offset of 40%
                    //box.material.emissiveTexture.hasAlpha = true;//Has an alpha

                    position.x += Math.sin(rotation_rad)*BLOCK_SIZE/100;
                    position.z += Math.cos(rotation_rad)*BLOCK_SIZE/100;
                    box.position = position;


                    box.scaling.x = object.width;
                    box.scaling.y = object.width;
                    box.scaling.z = 0.1;


                    box.rotation.y = Math.PI + rotation_rad;


                    box.position.y = EYE_VERTICAL * BLOCK_SIZE;

                    box.checkCollisions = true;



                }



            }









            
        });


        var building = BABYLON.Mesh.MergeMeshes(building_blocks);

        building.checkCollisions = true;
        building.material = new BABYLON.StandardMaterial("Mat", scene);
        building.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        //building.material.diffuseTexture = new BABYLON.Texture("images/textures/clay-bricks.jpg", scene);
        //building.material.emissiveTexture.vOffset = 2;//Vertical offset of 10%
        //building.material.emissiveTexture.uOffset = 1;//Horizontal offset of 40%
        //box.material.diffuseTexture.hasAlpha = true;



        lights.forEach(function (light) {
            var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
            shadowGenerator.getShadowMap().renderList.push(building);
            shadowGenerator.useVarianceShadowMap = true;
        });









    });



});