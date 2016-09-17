/// <reference path="reference.ts" />



var BLOCK_SIZE=5;
//var BLOCK_SIZE_VERTICAL=10;
//var BLOCK_SIZE_DOOR=2;

var EYE_VERTICAL = 2.5;
var LIGHT_VERTICAL = 3;

var SPEED = 7;
var SPEED_INERTIA = 0.5;
var SPEED_ROTATION = Math.PI/2;


var BLOCKS_2D_3D_SHAPES = {
    room:   [1,0,0,0,0,0,0,0,1],
    door:   [1,0,0,0,1,1,1,1,1],
    gate:   [1,0,0,0,1,1,1,1,1],
    wall:   [1,1,1,1,1,1,1,1,1],
    window: [1,1,0,0,1,1,1,1,1]
};

var BLOCKS_1NP_LEVEL = (0.5 - 0.9);
var BLOCKS_STOREYS_LEVELS = {
    '1NP':  0*8,
    '2NP':  1*8,
    '3NP':  2*8,
    '4NP':  3*8,
    '5NP':  4*8,
    '6NP':  5*8,
};




var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);





var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Lights
    //var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    //var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, EYE_VERTICAL * BLOCK_SIZE, 30*BLOCK_SIZE), scene);
    camera.rotation.y=Math.PI;
    camera.attachControl(canvas, true);
    camera.angularSensibility = 1000;
    //camera.panningSensibility = 10000;


    //var inputManager = camera.inputs;

    /*setTimeout(function () {
        r('mousedown');
        $(canvas).trigger('mousedown');
    },1500);*/



    camera.keysUp.push(87); // "w"
    camera.keysDown.push(83); // "s"

    //camera.keysLeft.push(65); // "s"
    //camera.keysRight.push(68); // "d"

    camera.keysLeft = [81];//arrow <-
    camera.keysRight = [69];//arrow ->



    camera.speed = SPEED;
    camera.inertia = SPEED_INERTIA;
    camera.fov = 1.3;





    camera.onCollide = onCollide;




    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    //scene.enablePhysics(scene.gravity, new BABYLON.OimoJSPlugin());


    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    //camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, EYE_VERTICAL * BLOCK_SIZE/2, 1);

    //finally, say which mesh will be collisionable








    scene.registerBeforeRender(function () {

        if (camera.rotation.x < -0.5) {//Top
            camera.rotation.x = -0.5;
        }
        if (camera.rotation.x > 0.5) {//Bottom
            camera.rotation.x = 0.5;
        }
    });
    //camera.mode = 1;




    /*camera.onCollide = function(event){
        r(event);

    };*/





    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 10000, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    //ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.7);
    //ground.material.backFaceCulling = false;
    ground.material.diffuseTexture = new BABYLON.Texture("../media/images/textures/grass.jpg", scene);
    ground.material.diffuseTexture.uScale = 100;//Vertical offset of 10%
    ground.material.diffuseTexture.vScale = 100;//Horizontal offset of 40%
    ground.material.reflectionColor = new BABYLON.Color3(0, 0, 0);
    ground.material.specularColor = new BABYLON.Color3(0, 0, 0);


    ground.position = new BABYLON.Vector3(0, 0, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    ground.receiveShadows = true;
    ground.isPickable = true;

    ground.checkCollisions = true;



    var sun = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(-0.7, -1, -0.5), scene);



    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.position = new BABYLON.Vector3(0, 0, 0);
    skybox.isPickable = false;





    /*$( canvas ).keydown(function( event ) {

        console.log(event.which);


        if ( event.which == 39 ) {

            camera.rotation.y += 0.2;
        }
        if ( event.which == 37 ) {

            camera.rotation.y -= 0.2;

        }



    });*/


    //When pointer down event is raised
    scene.onPointerDown = onPointerDown;



    /*var movement = {
      z: 0
    };
    scene.registerBeforeRender(function () {

        //r(movement);
        camera.position.y += movement.z;

        movement.z *= 0.9;
        if(movement.z<0.1)movement.z=0;

    });*/



    return({
        scene: scene,
        camera: camera,
        sun: sun,
        //movement: movement,
    });
    
};

var scene_ = createScene();
var scene = scene_.scene;
var camera = scene_.camera;
var movement = scene_.movement;
var sun = scene_.sun;


engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});