/// <reference path="reference.ts" />



//var objects;

var meshes = [];


function runWorld(objects,textures){

    r('Running gallery with '+objects.getAll().length+' objects.');
    r(objects);



    var sunShadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
    sunShadowGenerator.useVarianceShadowMap = true;
    var building_blocks = [];
    var lights = [];





    var bark = new BABYLON.StandardMaterial("Mat", scene);
    bark.diffuseTexture = new BABYLON.Texture("../media/images/textures/bark.jpg", scene);
    bark.diffuseTexture.uScale = 1;//Vertical offset of 10%
    bark.diffuseTexture.vScale = 1;//Horizontal offset of 40%
    bark.freeze();


    gates = [];
    links = [];







    var materials = {};
    function getMaterial(key: string){

        if(typeof materials[key] === 'undefined') {

            let url: string;
            if(BLOCK_MATERIALS.indexOf(key)!==-1){
                url = "../media/images/textures/" + key + ".jpg";
                r('Creating native texture '+key+'.');

            }else{

                let image = textures.findBy('name',key);
                r('finded',image);
                if(image){

                    url = image.getTexture();
                    r('Creating texture '+key+' from '+url+'.');

                }else{

                    console.warn('There is no texture image with name '+key+'!');
                }
            }



            let material = new BABYLON.StandardMaterial("Mat", scene);
            material.diffuseTexture = new BABYLON.Texture(url, scene);
            //material.bumpTexture = material.diffuseTexture;
            material.diffuseTexture.uScale = 10;//Vertical offset of 10%
            material.diffuseTexture.vScale = 10;//Horizontal offset of 40%
            //material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            material.freeze();

            materials[key] = material;
            /**/

        }

        return(materials[key]);

    }





    //var wasVideo = false;

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
        if(object.type=='multiblock') {




            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                (object.position.z+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                object.position.y * BLOCK_SIZE
            );


            var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
            box.material = getMaterial(object.material);


            box.isPickable = true;
            box.checkCollisions = true;

            box.position=position;

            box.scaling.x=object.size.x;
            box.scaling.y=object.size.z;
            box.scaling.z=object.size.y;

            sunShadowGenerator.getShadowMap().renderList.push(box);
            meshes.push(box);




        }else
        if(object.type=='light'){

            //r('creating light');
            var light = new BABYLON.PointLight("light", position, scene);
            light.diffuse = BABYLON.Color3.FromHexString(object.color);
            light.specular = light.diffuse;
            light.intensity = object.intensity/4;


            light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;

            lights.push(light);
            meshes.push(light);


        }else
        if(object.type=='image'){

            //object.rotation = 200;
            //r('image',object);

            if(typeof object.rotation === 'number') {


                var rotation_rad = (object.rotation / 180) * Math.PI;
                //Simple crate
                //var box = new BABYLON.Mesh.CreateBox("image", BLOCK_SIZE, scene);
                //box.material = new BABYLON.StandardMaterial("Mat", scene);
                //box.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

                var image = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);





                var src = object.src;
                var src_uri = URI(src)
                    .removeSearch("width");
                var src_normal = src_uri.addSearch({ width: 512 }).toString();


                let image_texture = new BABYLON.Texture(src_normal, scene);
                image_texture.vOffset = 1;//Vertical offset of 10%
                image_texture.uOffset = 1;//Horizontal offset of 40%
                image_texture.hasAlpha = object.hasAlpha;





                image.material = new BABYLON.StandardMaterial("texture4", scene);




                if(object.isEmitting) {


                    image.material.emissiveTexture = image_texture;


                    image.material.backFaceCulling = !(object.backFace);
                    image.material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                    image.material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                    image.material.specularPower = 32;
                    //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                    image.material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                    image.material.diffuseColor = new BABYLON.Color3(0, 0, 0);



                }else{

                    image.material.diffuseTexture = image_texture;

                }

                image.material.freeze();



                /*if(!wasVideo) {

                    image.material.emissiveTexture = new BABYLON.VideoTexture(src_normal, ['media/images/textures/video.mp4'], scene);
                    //image.material.emissiveTexture.vOffset = 1;//Vertical offset of 10%
                    //image.material.emissiveTexture.uOffset = 1;//Horizontal offset of 40%

                    //image.rotation.z = Math.PI;
                    wasVideo=true;


                }else {}*/



                //box.material.emissiveTexture.hasAlpha = true;//Has an alpha





                if(object.onGround){


                    image.position = position;
                    image.position.y = 0.05;

                    image.rotation.x = Math.PI/2;
                    image.rotation.y = Math.PI + rotation_rad;



                }else{

                    position.x += Math.sin(rotation_rad)*BLOCK_SIZE/100;
                    position.z += Math.cos(rotation_rad)*BLOCK_SIZE/100;
                    image.position = position;


                    image.rotation.y = Math.PI + rotation_rad;
                    image.position.y += EYE_VERTICAL * BLOCK_SIZE;

                }







                image.scaling.x = object.width;
                image.scaling.y = object.height;
                image.scaling.z = 0.1;



                image.checkCollisions = object.checkCollisions;

                meshes.push(image);
                //r(object);
                //r(image);



            }



        }else
        if(object.type=='label'){
            /*if(object.uri=='/'){
                r(object);
                moveTo(object.position.x,object.position.y,parseInt(object.rotation),object.world,object.storey,true);//todo repair in admin
            }*/
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
            meshes.push(tree_mesh);
            //createTreeMesh();
            //trees.push(object);
        }else
        if(object.type=='stairs') {


            var stairs_mesh =  createStairsMesh(/*object.id*/'stairs', 30, object.isFull, scene);

            //stairs_mesh.position = position;
            //r(position);



            stairs_mesh.scaling.x = object.width * BLOCK_SIZE;
            stairs_mesh.scaling.z = object.height * BLOCK_SIZE;
            stairs_mesh.scaling.y = (BLOCKS_2D_3D_SHAPES.room.length) * BLOCK_SIZE;


            r(stairs_mesh.scaling);

            stairs_mesh.position = position;



            //stairs_mesh.position.y = -BLOCK_SIZE;
            stairs_mesh.rotation.y = (object.rotation)/180*Math.PI;
            stairs_mesh.material = getMaterial(object.material);
            /**/

            stairs_mesh.checkCollisions = true;
            sunShadowGenerator.getShadowMap().renderList.push(stairs_mesh);

            meshes.push(stairs_mesh);

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


            links.push({
                object: object,
                mesh: link
            });

            meshes.push(link);


        }else
        if(object.type=='gate') {

            var rotation_rad = (object.rotation / 180) * Math.PI;


            //var gate = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
            var gate = BABYLON.Mesh.CreateBox(object.id, BLOCK_SIZE, scene);


            gate.material = new BABYLON.StandardMaterial("texture", scene);
            //gate.material.backFaceCulling = false;
            gate.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
            //gate.material.alpha = object.opacity;
            //gate.material.freeze();


            gate.position = position;


            gate.scaling.x = object.size;
            gate.scaling.z = 0.1;
            gate.scaling.y = BLOCKS_2D_3D_SHAPES.room.length-1;


            gate.rotation.y = Math.PI + rotation_rad;


            gate.position.y += gate.scaling.y * BLOCK_SIZE * 0.5;

            gate.checkCollisions = true;

            gates.push({
               object: object,
               mesh: gate
            });


            meshes.push(gate);

        }else{

            console.warn('Unknown object type "'+object.type+'", maybe version mismatch between editor and this viewer.');
        }




    });



    unlockGatesAndActivateKeys();






}




function clearWorld(){

    meshes.forEach(function (mesh) {

        mesh.dispose();

    });

    meshes = [];

}