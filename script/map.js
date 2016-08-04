/**
 * Created by Pavel on 14.07.2016.
 */

var objects;



function getObjectById(id){
    for(var i=0,l=objects.length;i<l;i++){
        if(objects[i].id==id)return(objects[i]);
    }
    throw new Error('Unknown id '+id);
}






function runGallery(response){




        objects = response;


        box_prototypes = {};
        //var trees = [];



        var bark = new BABYLON.StandardMaterial("Mat", scene);
        bark.diffuseTexture = new BABYLON.Texture("images/textures/bark.jpg", scene);
        bark.diffuseTexture.uScale = 1;//Vertical offset of 10%
        bark.diffuseTexture.vScale = 1;//Horizontal offset of 40%
        bark.freeze();





        var sunShadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
        sunShadowGenerator.useVarianceShadowMap = true;



        var building_blocks = [];
        var lights = [];

        var blocks = '';
        objects.forEach(function (object) {


            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                (0.5 - 0.9) * BLOCK_SIZE,
                object.position.y * BLOCK_SIZE
            );




            if(object.type=='block') {


                if(typeof box_prototypes[object.material] == 'undefined') {


                    var material = new BABYLON.StandardMaterial("Mat", scene);
                    material.diffuseTexture = new BABYLON.Texture("images/textures/"+object.material+".jpg", scene);
                    material.diffuseTexture.uScale = 1;//Vertical offset of 10%
                    material.diffuseTexture.vScale = 1;//Horizontal offset of 40%
                    //material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
                    material.freeze();


                    //var box_prototype = BABYLON.Mesh.CreateSphere("sphere1", 3, BLOCK_SIZE, scene);
                    var box_prototype = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                    box_prototype.isPickable = true;
                    box_prototype.checkCollisions = false;
                    box_prototype.position.y=-10;
                    box_prototype.material = material;


                    box_prototypes[object.material] = box_prototype;

                    //r(object.material,materials);
                }



                var position_vertical = new BABYLON.Vector3(0, BLOCK_SIZE*1.00001, 0);
                var vertical = BLOCKS_2D_3D_SHAPES[object.shape];

                var box;

                for(var i=0,l=vertical.length;i<l;i++){


                    if(vertical[i]) {

                        block =  box_prototypes[object.material].createInstance("room");
                        block.isPickable = true;
                        block.checkCollisions = true;
                        //block = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                        block.position = position;
                        //building_blocks.push(block);

                        //block.receiveShadows = true;
                        sunShadowGenerator.getShadowMap().renderList.push(block);

                    }

                    position = position.add(position_vertical);


                }





            }else
            if(object.type=='light'){

                //r('creating light');
                var light = new BABYLON.PointLight("light", position, scene);
                light.diffuse = BABYLON.Color3.FromHexString(object.color);
                light.specular = light.diffuse;
                light.intensity = object.intensity/4;


                light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;

                lights.push(light);


            }else
            if(object.type=='image'){


                if(typeof object.rotation === 'number') {


                    var rotation_rad = (object.rotation / 180) * Math.PI;
                    //Simple crate
                    //var box = new BABYLON.Mesh.CreateBox("image", BLOCK_SIZE, scene);
                    //box.material = new BABYLON.StandardMaterial("Mat", scene);
                    //box.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

                    var image = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);


                    image.material = new BABYLON.StandardMaterial("texture4", scene);
                    //box.material.backFaceCulling = false;
                    image.material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                    image.material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                    image.material.specularPower = 32;
                    //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                    image.material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                    image.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                    image.material.freeze();


                    var src = object.src;
                    var src_uri = URI(src)
                        .removeSearch("width");
                    var src_normal = src_uri.addSearch({ width: 512 }).toString();




                    image.material.emissiveTexture = new BABYLON.Texture(src_normal, scene);
                    image.material.emissiveTexture.vOffset = 1;//Vertical offset of 10%
                    image.material.emissiveTexture.uOffset = 1;//Horizontal offset of 40%
                    //box.material.emissiveTexture.hasAlpha = true;//Has an alpha

                    position.x += Math.sin(rotation_rad)*BLOCK_SIZE/100;
                    position.z += Math.cos(rotation_rad)*BLOCK_SIZE/100;
                    image.position = position;


                    image.scaling.x = object.width;
                    image.scaling.y = object.height;
                    image.scaling.z = 0.1;


                    image.rotation.y = Math.PI + rotation_rad;


                    image.position.y = EYE_VERTICAL * BLOCK_SIZE;

                    image.checkCollisions = false;



                }



            }else
            if(object.type=='label'){
                if(object.uri=='/'){
                    r(object);
                    moveTo(object.position.x,object.position.y,parseInt(object.rotation),true);//todo repair in admin
                }
            }else
            if(object.type=='tree') {



                var PHI = 2/(1+Math.sqrt(5)); //golden ratio for scale

                /*{
                 size:1
                 length:15,
                 psi:8*Math.PI/32,
                 bow:0.5, kink:0.5,
                 detail:8,
                 sections:4,
                 branches:5,
                 spirals:5,
                 start:new BABYLON.Vector3(0,0,0),
                 scale:PHI
                 }*/
                var tree_data = {
                    size:1+Math.random(),
                    length:7+15*Math.random(),
                    psi:8*Math.PI/32,
                    bow:0.3+0.4*Math.random(),
                    kink:0.3+0.4*Math.random(),
                    detail:8,
                    sections:4,
                    branches:5,
                    spirals:5,
                    start:new BABYLON.Vector3(0,0,0),
                    scale:PHI
                };
                var tree =  createTreeMesh("tree", tree_data.size, tree_data.length, tree_data.psi, tree_data.bow, tree_data.kink, tree_data.detail, tree_data.sections, tree_data.branches, tree_data.spirals, tree_data.scale, tree_data.start, self.scene);

                tree.position = position;
                tree.material = bark;

                sunShadowGenerator.getShadowMap().renderList.push(tree);
                //createTreeMesh();
                //trees.push(object);
            }



            
        });

        //var building = BABYLON.Mesh.MergeMeshes(building_blocks,true,true);
        //box_prototype.dispose();


        //building.checkCollisions = true;
        //building.material = new BABYLON.StandardMaterial("Mat", scene);
        //building.material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        //building.isPickable = false;





        /*lights.forEach(function (light) {
            var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
            shadowGenerator.getShadowMap().renderList.push(building);
            shadowGenerator.useVarianceShadowMap = true;
        });*/



        /*r('all trees:', trees);
        if(trees.length>0){

            BABYLON.SceneLoader.ImportMesh("tree", "/images/models/tree4/", "tree1.obj", scene, function (newMeshes) {

                /*r(newMeshes);

                var tree_prototype = newMeshes[0];
                //tree_prototype.isVisible = false;

                alert(345);


                trees.forEach(function (tree) {


                    //try {
                        alert(123);

                        r(tree);

                        var position = new BABYLON.Vector3(
                            tree.position.x * -BLOCK_SIZE, 0,
                            tree.position.y * BLOCK_SIZE
                        );

                        var tree_mesh = tree_prototype.createInstance('tree');
                        tree_mesh.position = position;

                    //}catch(err){
                    //    r(err);
                    //}

                });



            });



        }*/






}