/// <reference path="../app" />

/// <reference path="../reference" />


module GALLERY.Viewer {


    export let rendered = false;

    export let meshes = [];
    export let zones = [];
    export let boards = [];
    //export var hooverLayer;


    export let meshes = [];
    export let zones = [];
    export let boards = [];
    export let gates = [];
    export let links = [];

    export let building_blocks = [];
    export let lights = [];

    export let environment: Objects.Environment;

    export let objects_world;


    var sunShadowGenerator;


    export function runWorld(_objects_world, textures) {

        objects_world = _objects_world;

        r('Running gallery with ' + objects_world.getAll().length + ' objects.', objects_world);

        rendered = false;


        sunShadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
        sunShadowGenerator.useVarianceShadowMap = true;


        var bark = new BABYLON.StandardMaterial("Mat", scene);
        bark.diffuseTexture = new BABYLON.Texture("../media/images/textures/bark.jpg", scene);
        bark.diffuseTexture.uScale = 1;//Vertical offset of 10%
        bark.diffuseTexture.vScale = 1;//Horizontal offset of 40%
        bark.freeze();


        //==================================================================================================================



        objects_world.forEach(addObject);

        rendered = true;

        //unlockGatesAndActivateKeys();
    }


    
    
    
    export function addObject(object) {

        let position = object.getBabylonPosition();


        if (object.type == 'environment') {


            //endlessStructures = object.endlessStructures;
            //endlessStructuresFromStorey = object.endlessStructuresFromStorey;
            environment = object;


            camera.fov = environment.fov;


            scene.clearColor = BABYLON.Color3.FromHexString(object.clearColor);


            if (object.ground !== 'none') {
                //todo position
                /**/
                //Ground







                /*var ground = BABYLON.Mesh.CreatePlane("ground", 10000, scene);
                 ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
                 ground.material = getMaterial(object.ground,1,true);
                 if("diffuseTexture" in ground.material) {
                 ground.material.diffuseTexture.uScale = 100;//Vertical offset of 10%
                 ground.material.diffuseTexture.vScale = 100;//Horizontal offset of 40%
                 }
                 ground.receiveShadows = true;
                 ground.isPickable = true;
                 ground.checkCollisions = true;
                 meshes.push(ground);*/









                let groundMesh = BABYLON.Mesh.CreateBox("ground", BLOCK_SIZE, scene);
                groundMesh.position.y = BLOCK_SIZE*-1/2;
                groundMesh.scaling.x = 10000/BLOCK_SIZE;
                groundMesh.scaling.z = 10000/BLOCK_SIZE;

                groundMesh.material = getMaterial(object.ground,1,true);
                //groundMesh.material.backFaceCulling = false;







                objects_world.filterTypes('groundhole').forEach(function (holeObject) {

                    r('asshole',holeObject);

                    let holePosition = holeObject.getBabylonPosition();
                    let holeMesh = BABYLON.Mesh.CreateBox(holeObject.id, BLOCK_SIZE, scene);
                    holeMesh.material = groundMesh.material;//getMaterial('#00ff00',1,true);
                    holeMesh.position = holePosition;
                    holePosition.y = 0;
                    holeMesh.scaling.y = BLOCK_SIZE;
                    holeMesh.scaling.x = holeObject.width;
                    holeMesh.scaling.z = holeObject.height;


                    var groundCSG = BABYLON.CSG.FromMesh(groundMesh);
                    var holeCSG = BABYLON.CSG.FromMesh(holeMesh);



                    var groundWithHoleCSG = groundCSG.subtract(holeCSG);



                    r(groundCSG,holeCSG,groundWithHoleCSG);


                    let newGround = groundWithHoleCSG.toMesh("ground", groundMesh.material, scene);


                    // Disposing original meshes since we don't want to see them on the scene
                    groundMesh.dispose();
                    holeMesh.dispose();



                    groundMesh = newGround;/**/


                });



                if(object.shadows){
                    groundMesh.receiveShadows = true;
                }

                groundMesh.isPickable = true;
                groundMesh.checkCollisions = true;
                meshes.push(groundMesh);



                /**/
            }//else {


            if (object.skybox !== 'none') {

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

            if (object.fogDensity) {
                scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
                scene.fogDensity = object.fogDensity;
                scene.fogColor = BABYLON.Color3.FromHexString(object.fogColor);
            } else {
                scene.fogMode = BABYLON.Scene.FOGMODE_NONE;
            }


            /*
             if ( (zoneIdsCreatedForImages.indexOf(object.id) == -1)) {
             r('Creating zone for ' + object.name);

             addObject(zone);//todo better
             objects.push(zone);

             }
             /**/





            zones.push(object);//environment


        } else if (object.type == 'zone') {

            zones.push(object);
            //meshes.push(object.getMesh(scene));


        } else if (object.type == 'block') {

            throw new Error('Block should not be in compiled objects.')

        } else if (object.type == 'multiblock') {


            /*
             todo sunShadowGenerator.getShadowMap().renderList.push(box);
             meshes.push(box);*/


        } else if (object.type == 'light') {

            //r('creating light');
            var light = new BABYLON.PointLight("light", position, scene);
            light.diffuse = BABYLON.Color3.FromHexString(object.color);
            light.specular = light.diffuse;
            light.intensity = object.intensity / 4;


            light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;

            lights.push(light);
            meshes.push(light);


        } else if (object.type == 'label') {
            /*if(object.uri=='/'){
             r(object);
             moveTo(object.position.x,object.position.y,parseInt(object.rotation),object.world,object.storey,true);//todo repair in admin
             }*/
        } else if (object.type == 'tree') {


            const PHI = 2 / (1 + Math.sqrt(5)); //golden ratio for scale

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
                size: 1 + Math.random(),
                length: 7 + 15 * Math.random(),
                psi: 8 * Math.PI / 32,
                bow: 0.3 + 0.4 * Math.random(),
                kink: 0.3 + 0.4 * Math.random(),
                detail: 8,
                sections: 4,
                branches: 5,
                spirals: 5,
                start: new BABYLON.Vector3(0, 0, 0),
                scale: PHI
            };
            var tree_mesh = createTreeMesh("tree", tree_data.size, tree_data.length, tree_data.psi, tree_data.bow, tree_data.kink, tree_data.detail, tree_data.sections, tree_data.branches, tree_data.spirals, tree_data.scale, tree_data.start, scene);

            tree_mesh.position = position;
            tree_mesh.material = bark;

            sunShadowGenerator.getShadowMap().renderList.push(tree_mesh);
            meshes.push(tree_mesh);
            //createTreeMesh();
            //trees.push(object);
        } else if (object.type == 'stairs') {


            var stairs_mesh = createStairsMesh(/*object.id*/'stairs', 30, object.isFull, scene);

            //stairs_mesh.position = position;
            //r(position);


            stairs_mesh.scaling.x = object.width * BLOCK_SIZE;
            stairs_mesh.scaling.z = object.height * BLOCK_SIZE;
            stairs_mesh.scaling.y = (BLOCKS_2D_3D_SHAPES.room.length) * BLOCK_SIZE;


            r(stairs_mesh.scaling);

            stairs_mesh.position = position;


            //stairs_mesh.position.y = -BLOCK_SIZE;
            stairs_mesh.rotation.y = (object.rotation) / 180 * Math.PI;
            stairs_mesh.material = getMaterial(object.material, object.opacity);
            /**/

            stairs_mesh.checkCollisions = true;
            sunShadowGenerator.getShadowMap().renderList.push(stairs_mesh);

            meshes.push(stairs_mesh);

        } else if (object.type == 'link') {


            var link = new BABYLON.Mesh.CreateSphere(object.id, 16, object.radius * BLOCK_SIZE, scene);
            link.position = position;
            link.position.y += EYE_VERTICAL * BLOCK_SIZE;


            link.material = new BABYLON.StandardMaterial("texture2", scene);
            link.material.diffuseColor = BABYLON.Color3.FromHexString(object.color);
            //link.material.alpha = object.opacity;

            if (object.hidden) {
                link.material.alpha = 0;
            }


            link.checkCollisions = true;

            //light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;


            links.push({
                object: object,
                mesh: link
            });

            meshes.push(link);


        } else if (object.type == 'board') {


            let board = new BABYLON.Mesh.CreateSphere(object.id, 2, 4 * BLOCK_SIZE, scene);
            board.position = position;
            board.position.y += EYE_VERTICAL * BLOCK_SIZE;


            board.material = new BABYLON.StandardMaterial("texture2", scene);
            board.material.diffuseColor = BABYLON.Color3.FromHexString('#000000');
            board.material.alpha = 0.2;

            board.checkCollisions = false;


            /*let element = document.createElement('div');
             element.style.position = 'fixed';
             element.classList.add('zone');
             //element.style.zIndex = '100000';
             element.innerHTML = object.html;


             document.getElementById('zones').appendChild(element);*/



            let container = document.createElement('div');
            document.getElementById('boards').appendChild(container);


            object.getBoard(container).style.display = 'block';
            container.style.position = 'fixed';


            boards.push({
                mesh: board,
                element: container,
                top: 0
            });
            meshes.push(board);


        } else if (object.type == 'gate') {

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
            gate.scaling.y = BLOCKS_2D_3D_SHAPES.room.length - 1;


            gate.rotation.y = Math.PI + rotation_rad;


            gate.position.y += gate.scaling.y * BLOCK_SIZE * 0.5;

            gate.checkCollisions = true;

            gates.push({
                object: object,
                mesh: gate
            });


            meshes.push(gate);

        } else {

            console.warn('Unknown object type "' + object.type + '", maybe version mismatch between editor and this viewer.');
        }






        let mesh = object.getBabylonMesh(scene,getMaterial,environment);
        if(mesh) {
            meshes.push(mesh);
        }




        let virtualObjects = object.createVirtualObjects();
        if(virtualObjects) {

            if(virtualObjects.getAll().length){
                r('Created virtual objects for '+object.getConsoleName()+'.',virtualObjects);
            }

            virtualObjects.forEach(function (object) {
                addObject(object);
                //objects.push(object);
            });
        }
        

    }
    
    
    

    export function clearWorld() {

        meshes.forEach(function (mesh) {

            mesh.dispose();

        });

        meshes = [];

    }


}