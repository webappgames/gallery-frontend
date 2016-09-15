/// <reference path="reference.ts" />



var objects;






function runGallery(){


        var compiled = compileObjects(objects);


        objects = compiled.objects;
        var blocks_materials_groups = compiled.blocks_materials_groups;




        var stone_plain = new BABYLON.StandardMaterial("Mat", scene);
        stone_plain.diffuseTexture = new BABYLON.Texture("../media/images/textures/stone-plain.jpg", scene);
        stone_plain.diffuseTexture.uScale = 1;//Vertical offset of 10%
        stone_plain.diffuseTexture.vScale = 1;//Horizontal offset of 40%
        stone_plain.freeze();



        var bark = new BABYLON.StandardMaterial("Mat", scene);
        bark.diffuseTexture = new BABYLON.Texture("../media/images/textures/bark.jpg", scene);
        bark.diffuseTexture.uScale = 1;//Vertical offset of 10%
        bark.diffuseTexture.vScale = 1;//Horizontal offset of 40%
        bark.freeze();


        gates = [];




        var sunShadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
        sunShadowGenerator.useVarianceShadowMap = true;


        var wasVideo = false;

        var building_blocks = [];
        var lights = [];

        var blocks = '';
        objects.forEach(function (object) {


            object.storey = object.storey || '1NP';
            var level = BLOCKS_STOREYS_LEVELS[object.storey];

            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                (level+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                object.position.y * BLOCK_SIZE
            );




            if(object.type=='block') {

                throw new Error('Block should not be in compiled objects.')

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

                //r('image',object);

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




                    /*if(!wasVideo) {

                        image.material.emissiveTexture = new BABYLON.VideoTexture(src_normal, ['media/images/textures/video.mp4'], scene);
                        //image.material.emissiveTexture.vOffset = 1;//Vertical offset of 10%
                        //image.material.emissiveTexture.uOffset = 1;//Horizontal offset of 40%

                        //image.rotation.z = Math.PI;
                        wasVideo=true;


                    }else {}*/


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


                    image.position.y += EYE_VERTICAL * BLOCK_SIZE;

                    image.checkCollisions = false;

                    //r(object);
                    //r(image);



                }



            }else
            if(object.type=='label'){
                if(object.uri=='/'){
                    r(object);
                    moveTo(object.position.x,object.position.y,parseInt(object.rotation),object.storey,true);//todo repair in admin
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
                var tree_mesh =  createTreeMesh("tree", tree_data.size, tree_data.length, tree_data.psi, tree_data.bow, tree_data.kink, tree_data.detail, tree_data.sections, tree_data.branches, tree_data.spirals, tree_data.scale, tree_data.start, scene);

                tree_mesh.position = position;
                tree_mesh.material = bark;

                sunShadowGenerator.getShadowMap().renderList.push(tree_mesh);
                //createTreeMesh();
                //trees.push(object);
            }else
            if(object.type=='stairs') {


                var stairs_mesh =  createStairsMesh(object.id, 30, scene);

                //stairs_mesh.position = position;
                //r(position);



                stairs_mesh.scaling.x = object.width * BLOCK_SIZE;
                stairs_mesh.scaling.z = object.height * BLOCK_SIZE;
                stairs_mesh.scaling.y = (BLOCKS_2D_3D_SHAPES.room.length) * BLOCK_SIZE;


                r(stairs_mesh.scaling);

                stairs_mesh.position = position;



                //stairs_mesh.position.y = -BLOCK_SIZE;
                stairs_mesh.rotation.y = (object.rotation)/180*Math.PI;
                stairs_mesh.material = stone_plain;
                /**/

                stairs_mesh.checkCollisions = true;
                sunShadowGenerator.getShadowMap().renderList.push(stairs_mesh);

            }else
            if(object.type=='link') {


                var link = new BABYLON.Mesh.CreateSphere(object.id, 16, object.radius*BLOCK_SIZE, scene);
                link.position = position;
                link.position.y += EYE_VERTICAL * BLOCK_SIZE;



                link.material = new BABYLON.StandardMaterial("texture2", scene);
                link.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
                link.material.alpha = object.opacity;


                link.checkCollisions = true;

                //light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;



                lights.push(light);



            }else
            if(object.type=='gate') {

                var rotation_rad = (object.rotation / 180) * Math.PI;


                var gate = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);


                gate.material = new BABYLON.StandardMaterial("texture4", scene);
                gate.material.backFaceCulling = false;
                gate.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
                //gate.material.alpha = object.opacity;
                //gate.material.freeze();


                gate.position = position;


                gate.scaling.x = object.size;
                gate.scaling.y = 1*BLOCK_SIZE;


                gate.rotation.y = Math.PI + rotation_rad;


                gate.position.y += EYE_VERTICAL * BLOCK_SIZE;

                gate.checkCollisions = true;

                gates.push({
                   object: object,
                   mesh: gate
                });


            }else{

                console.warn('Unknown object type "'+object.type+'", maybe version mismatch between editor and this viewer.');
            }



            
        });






        for(var material_key in blocks_materials_groups){


            /**/
            var material = new BABYLON.StandardMaterial("Mat", scene);
            material.diffuseTexture = new BABYLON.Texture("../media/images/textures/"+material_key+".jpg", scene);
            //material.bumpTexture = material.diffuseTexture;
            material.diffuseTexture.uScale = 10;//Vertical offset of 10%
            material.diffuseTexture.vScale = 10;//Horizontal offset of 40%
            //material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            material.freeze();/**/




            blocks_materials_groups[material_key].forEach(function (box_group) {


                var position = new BABYLON.Vector3(
                    box_group.position.x * -BLOCK_SIZE,
                    (box_group.position.z+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                    box_group.position.y * BLOCK_SIZE
                );

                //position.x -=BLOCK_SIZE/2;
                //position.z +=BLOCK_SIZE/2;



                //var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                //box.showBoundingBox=false;
                //Define a material



                /*
                var material_x=new BABYLON.StandardMaterial("material",scene);
                material_x.diffuseTexture = new BABYLON.Texture("media/images/textures/"+material_key+".jpg", scene);
                material_x.diffuseTexture.uScale = box_group.size.y;
                material_x.diffuseTexture.vScale = box_group.size.z;



                var material_y=new BABYLON.StandardMaterial("material",scene);
                material_y.diffuseTexture = new BABYLON.Texture("media/images/textures/"+material_key+".jpg", scene);
                material_y.diffuseTexture.uScale = box_group.size.x;
                material_y.diffuseTexture.vScale = box_group.size.z;


                var material_z=new BABYLON.StandardMaterial("material",scene);
                material_z.diffuseTexture = new BABYLON.Texture("media/images/textures/"+material_key+".jpg", scene);
                material_z.diffuseTexture.uScale = box_group.size.x;
                material_z.diffuseTexture.vScale = box_group.size.y;







                var x_mesh_1 = BABYLON.Mesh.CreatePlane('room', BLOCK_SIZE, scene);
                x_mesh_1.scaling.x = box_group.size.y;
                x_mesh_1.scaling.y = box_group.size.z;
                x_mesh_1.rotation.y=Math.PI*(1/2);
                x_mesh_1.position = position.add(new BABYLON.Vector3(BLOCK_SIZE/-2,0,0));




                var x_mesh_2 = BABYLON.Mesh.CreatePlane('room', BLOCK_SIZE, scene);
                x_mesh_2.scaling.x = box_group.size.y;
                x_mesh_2.scaling.y = box_group.size.z;
                x_mesh_2.rotation.y=Math.PI*(3/2);
                x_mesh_2.position = position.add(new BABYLON.Vector3(BLOCK_SIZE/2,0,0));





                var y_mesh_1 = BABYLON.Mesh.CreatePlane('room', BLOCK_SIZE, scene);
                y_mesh_1.scaling.x = box_group.size.x;
                y_mesh_1.scaling.y = box_group.size.z;
                y_mesh_1.rotation.y=Math.PI*(0/2);
                y_mesh_1.position = position.add(new BABYLON.Vector3(0,0,BLOCK_SIZE/2));




                var y_mesh_2 = BABYLON.Mesh.CreatePlane('room', BLOCK_SIZE, scene);
                y_mesh_2.scaling.x = box_group.size.x;
                y_mesh_2.scaling.y = box_group.size.z;
                y_mesh_2.rotation.y=Math.PI*(2/2);
                y_mesh_2.position = position.add(new BABYLON.Vector3(0,0,BLOCK_SIZE/-2));
                /**/








                /*var paths = [[],[]];
                paths[0].push(new BABYLON.Vector3(0.5, -0.5, 0.5));
                paths[0].push(new BABYLON.Vector3(0.5, -0.5, -0.5));
                paths[0].push(new BABYLON.Vector3(-0.5, -0.5, -0.5));
                paths[0].push(new BABYLON.Vector3(-0.5, -0.5, 0.5));
                paths[0].push(new BABYLON.Vector3(0.5, -0.5, 0.5));
                paths[1].push(new BABYLON.Vector3(0.5, 0.5, 0.5));
                paths[1].push(new BABYLON.Vector3(0.5, 0.5, -0.5));
                paths[1].push(new BABYLON.Vector3(-0.5, 0.5, -0.5));
                paths[1].push(new BABYLON.Vector3(-0.5, 0.5, 0.5));
                paths[1].push(new BABYLON.Vector3(0.5, 0.5, 0.5));*/




                //var box = BABYLON.Mesh.CreateRibbon("room", paths, false, true ,  0, scene);
                //var box = BABYLON.Mesh.CreateSphere("room", 3, BLOCK_SIZE, scene);



                var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                box.material = material;


                box.isPickable = true;
                box.checkCollisions = true;

                box.position=position;

                box.scaling.x=box_group.size.x;
                box.scaling.y=box_group.size.z;
                box.scaling.z=box_group.size.y;

                sunShadowGenerator.getShadowMap().renderList.push(box);



            });




        }









}