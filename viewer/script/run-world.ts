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




    function getTextureUrl(key){

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
        return(url);

    }


    var materials = {};//todo DI
    function getMaterial(key: string){

        if(typeof materials[key] === 'undefined') {


            let material = new BABYLON.StandardMaterial("Mat", scene);
            material.diffuseTexture = new BABYLON.Texture(getTextureUrl(key), scene);
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



    var imagesMaterials = {};//todo DI
    function getImageMaterial(src: string,isEmitting: boolean,hasAlpha: boolean,backFace: boolean){

        let key = src+isEmitting+hasAlpha+backFace;//todo better - maybe hash

        if(typeof imagesMaterials[key] === 'undefined') {


            var src = src;
            var src_uri = URI(src)//todo Di
                .removeSearch("width");
            var src_normal = src_uri.addSearch({width: 512}).toString();


            let image_texture = new BABYLON.Texture(src_normal, scene);
            image_texture.vOffset = 1;//Vertical offset of 10%
            image_texture.uOffset = 1;//Horizontal offset of 40%
            image_texture.hasAlpha = hasAlpha;


            let material = new BABYLON.StandardMaterial("texture4", scene);


            if (isEmitting) {


                material.emissiveTexture = image_texture;


                material.backFaceCulling = !(backFace);
                material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                material.specularPower = 32;
                //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                material.diffuseColor = new BABYLON.Color3(0, 0, 0);


            } else {

                material.diffuseTexture = image_texture;

            }

            material.freeze();
            imagesMaterials[key] = material;

        }


        return(imagesMaterials[key]);


    }










    let endless = false;
    //var wasVideo = false;


    //==================================================================================================================

    objects.forEach(function (object) {


        object.storey = object.storey || '1NP';
        var level = BLOCKS_STOREYS_LEVELS[object.storey];

        var position = new BABYLON.Vector3(
            object.position.x * -BLOCK_SIZE,
            (level+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
            object.position.y * BLOCK_SIZE
        );



        if(object.type=='environment') {


            if(object.ground!=='none'){
                //todo position
                /**/
                //Ground
                var ground = BABYLON.Mesh.CreatePlane("ground", 10000, scene);
                ground.material = new BABYLON.StandardMaterial("groundMat", scene);
                //ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.7);
                //ground.material.backFaceCulling = false;
                ground.material.diffuseTexture = new BABYLON.Texture(getTextureUrl(object.ground), scene);
                ground.material.diffuseTexture.opacity = 0.5;
                ground.material.diffuseTexture.uScale = 100;//Vertical offset of 10%
                ground.material.diffuseTexture.vScale = 100;//Horizontal offset of 40%
                ground.material.reflectionColor = new BABYLON.Color3(0, 0, 0);
                ground.material.specularColor = new BABYLON.Color3(0, 0, 0);


                ground.position = new BABYLON.Vector3(0, 0, 0);
                ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
                ground.receiveShadows = true;
                ground.isPickable = true;

                ground.checkCollisions = true;
                meshes.push(ground);
                /**/
            }else{
                endless = true;
                r('Activating endless multiblocks.');

            }




            if(object.skybox!=='none') {

                let url = object.skybox + '/' + object.skybox;


                // Skybox
                var skybox = BABYLON.Mesh.CreateBox("skyBox", object.skyboxSize, scene);
                var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
                skyboxMaterial.backFaceCulling = false;
                skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skyboxes/" + url, scene, ["_ft.jpg", "_up.jpg", "_rt.jpg", "_bk.jpg", "_dn.jpg", "_lf.jpg"]);
                skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
                skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
                skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                skyboxMaterial.disableLighting = true;
                skybox.material = skyboxMaterial;
                skybox.position = position;//new BABYLON.Vector3(0, 0, 0);
                skybox.position.y = 0;
                skybox.isPickable = false;
                meshes.push(skybox);

                if (object.skybox_reverse) {

                    skybox.rotation.z = Math.PI;

                }

            }

            if(object.fogDensity) {
                scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                scene.fogDensity = object.fogDensity;
                scene.fogColor = BABYLON.Color3.FromHexString(object.fogColor);
            }else{
                scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
            }




        }else
        if(object.type=='block') {

            throw new Error('Block should not be in compiled objects.')

        }else
        if(object.type=='multiblock') {


            //--------------------------------------Endless
            if(endless) {
                let bottom = object.position.z - object.size.z / 2;
                if (bottom <= 0) {

                    let top = object.position.z + object.size.z / 2;


                    bottom -= 1000;


                    object.position.z = (top + bottom ) / 2;
                    object.size.z = top - bottom;
                }
            }
            //--------------------------------------



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

            if(typeof object.rotation === 'number') {


                var rotation_rad = (object.rotation / 180) * Math.PI;

                var image = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                image.material = getImageMaterial(object.src,object.isEmitting,object.hasAlpha,object.backFace);



                if(object.onGround){


                    image.position = position;
                    image.position.y = (level+BLOCKS_1NP_LEVEL+0.5) * BLOCK_SIZE + 0.1;


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



            const PHI = 2/(1+Math.sqrt(5)); //golden ratio for scale

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
            //link.material.alpha = object.opacity;

            if(object.hidden){
                link.material.alpha = 0;
            }


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


    //unlockGatesAndActivateKeys();



}




function clearWorld(){

    meshes.forEach(function (mesh) {

        mesh.dispose();

    });

    meshes = [];

}