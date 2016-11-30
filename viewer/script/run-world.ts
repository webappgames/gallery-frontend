/// <reference path="reference.ts" />



namespace GALLERY.Viewer {


    export var meshes = [];
    export var zones = [];
    export var boards = [];


    export function runWorld(objects_world, textures) {

        r('Running gallery with ' + objects_world.getAll().length + ' objects.', objects_world);

        meshes = [];
        zones = [];
        boards = [];


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



        let endless = false;
        //var wasVideo = false;



        //-----------------------------------------------------zoneMaterial
        let zoneMaterial = new BABYLON.StandardMaterial("texture1", scene);
        zoneMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);


        if(develop){
            zoneMaterial.alpha = 0.2;
            //zoneMaterial.wireframe = true;
        }else{
            zoneMaterial.alpha = 0;
        }



        //-----------------------------------------------------


        //==================================================================================================================

        let zoneIdsCreatedForImages = [];

        function processObject(object) {

            //todo use getBabylonPosition
            object.storey = object.storey || '1NP';
            var level = BLOCKS_STOREYS_LEVELS[object.storey];

            var position = new BABYLON.Vector3(
                object.position.x * -BLOCK_SIZE,
                (level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                object.position.y * BLOCK_SIZE
            );


            if (object.type == 'environment') {


                if (object.ground !== 'none') {
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
                } else {
                    endless = true;
                    r('Activating endless multiblocks.');

                }


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


            } else if (object.type == 'zone') {


                let mesh = BABYLON.Mesh.CreateBox(object.id, BLOCK_SIZE, scene);


                mesh.material = zoneMaterial;


                //mesh.material = getMaterial('stone-plain',0.5);
                mesh.position = position;

                position.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;
                mesh.scaling.y = BLOCKS_2D_3D_SHAPES.room.length;

                mesh.scaling.x = object.width;
                mesh.scaling.z = object.height;


                if (object.name || object.html) {

                    let isNext = false;
                    let label = objects.filterTypes('label').findBy('uri', object.uri);
                    if (label) {
                        if (label.next !== 'none') {
                            isNext = true;
                        }

                    }


                    let element = document.createElement('div');
                    element.id = 'zone-' + object.id;
                    element.style.display = 'none';
                    element.classList.add('zone');
                    element.innerHTML = ''

                        //+'<div class="previous"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>'
                        + (object.name ? '<h1>' + object.name + '</h1>' : '')
                        + '<div class="text">' + object.html + '</div>'
                        + (isNext ? '<div class="next"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');


                    element.onclick = appStateNext;


                    document.getElementById('zones').appendChild(element);

                }


                mesh.checkCollisions = false;
                mesh.isPickable = false;

                //r(mesh);

                zones.push({
                    mesh: mesh,
                    element: element


                });
                meshes.push(mesh);

                /*return(mesh);
                 r(object);
                 var mesh = object.createBabylonMesh(BABYLON);
                 meshes_zones.push(mesh);*/


            } else if (object.type == 'block') {

                throw new Error('Block should not be in compiled objects.')

            } else if (object.type == 'multiblock') {


                //--------------------------------------Endless
                if (endless) {
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
                    (object.position.z + BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                    object.position.y * BLOCK_SIZE
                );


                var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
                box.material = getMaterial(object.material, object.opacity);


                box.isPickable = true;
                box.checkCollisions = true;

                box.position = position;

                box.scaling.x = object.size.x;
                box.scaling.y = object.size.z;
                box.scaling.z = object.size.y;


                sunShadowGenerator.getShadowMap().renderList.push(box);
                meshes.push(box);


            } else if (object.type == 'light') {

                //r('creating light');
                var light = new BABYLON.PointLight("light", position, scene);
                light.diffuse = BABYLON.Color3.FromHexString(object.color);
                light.specular = light.diffuse;
                light.intensity = object.intensity / 4;


                light.position.y = LIGHT_VERTICAL * BLOCK_SIZE;

                lights.push(light);
                meshes.push(light);


            } else if (object.type == 'image') {

                if (typeof object.rotation === 'number') {


                    let rotation_rad = (object.rotation / 180) * Math.PI;

                    let image = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                    image.material = getImageMaterial(object.src, object.isEmitting, object.hasAlpha, object.backFace);


                    if (object.onGround) {


                        image.position = position;
                        image.position.y = (level + BLOCKS_1NP_LEVEL + 0.5) * BLOCK_SIZE + 0.1;


                        image.rotation.x = Math.PI / 2;
                        image.rotation.y = Math.PI + rotation_rad;


                    } else {

                        position.x += Math.sin(rotation_rad) * BLOCK_SIZE / 100;
                        position.z += Math.cos(rotation_rad) * BLOCK_SIZE / 100;
                        image.position = position;



                        //(level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE
                        //image.position.y = (/*level + BLOCKS_1NP_LEVEL +*/ EYE_VERTICAL) * BLOCK_SIZE ;

                        image.rotation.y = Math.PI + rotation_rad;
                        image.position.y += (EYE_VERTICAL - BLOCKS_1NP_LEVEL) * BLOCK_SIZE;


                        if (develop && (object.uri || object.name) && (zoneIdsCreatedForImages.indexOf(object.id) == -1)) {

                            r('Creating zone for ' + object.name);


                            zoneIdsCreatedForImages.push(object.id);




                            let uri: string;
                            if (object.uri && object.uri != 'none') {
                                uri = object.uri;
                            } else if (object.name) {
                                uri = '/' + createUriFromName(object.name);
                                object.uri = uri;
                            }


                            object.zoneCreated = true;


                            let size = Math.max(object.width,object.height);

                            let x = Math.sin(rotation_rad) * size / -2;
                            let y = Math.cos(rotation_rad) * size / 2;







                            let zone = {

                                id: createGuid(),
                                type: 'zone',

                                world: object.world,
                                storey: object.storey,
                                position: {
                                    x: object.position.x + x,
                                    y: object.position.y + y,
                                },


                                width: object.width*Math.cos(rotation_rad)+size*Math.sin(rotation_rad),
                                height: object.width*Math.sin(rotation_rad)+size*Math.cos(rotation_rad),

                                name: object.name,
                                html: object.html,
                                uri: uri,
                                uri_level: 10000,//todo better low priority

                            };


                            processObject(zone);//todo better
                            objects.push(zone);


                            let label = {

                                id: createGuid(),
                                type: 'label',

                                world: object.world,
                                storey: object.storey,
                                position: {
                                    x: object.position.x + (x * 1.9),
                                    y: object.position.y + (y * 1.9),
                                },

                                rotation: object.rotation,


                                name: object.name,
                                uri: uri,
                                parent: object.parent,

                            };


                            processObject(label);//todo better
                            objects.push(label);


                            //r(objects);


                        }


                    }


                    image.scaling.x = object.width;
                    image.scaling.y = object.height;
                    image.scaling.z = 0.1;


                    image.checkCollisions = object.checkCollisions;

                    meshes.push(image);
                    //r(object);
                    //r(image);


                }


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
                board.material.alpha = 0;

                board.checkCollisions = false;


                let element = document.createElement('div');
                element.style.position = 'fixed';
                element.classList.add('zone');
                //element.style.zIndex = '100000';
                element.innerHTML = object.html;


                document.getElementById('zones').appendChild(element);


                boards.push({
                    mesh: board,
                    element: element
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


        }


        objects_world.forEach(processObject);

        //unlockGatesAndActivateKeys();


    }


    export function clearWorld() {

        meshes.forEach(function (mesh) {

            mesh.dispose();

        });

        meshes = [];

    }


}