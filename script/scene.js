
var BLOCK_SIZE=5;
var BLOCK_SIZE_VERTICAL=10;
var BLOCK_SIZE_DOOR=2;


var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);





var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Lights
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 2, 30*BLOCK_SIZE), scene);
    camera.rotation.y=Math.PI;
    camera.attachControl(canvas, true);

    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 90000.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.9, 0.7);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(0, 0, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    

    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    //finally, say which mesh will be collisionable
    ground.checkCollisions = true;


    camera.keysLeft = [];
    camera.keysRight = [];




    /*$( canvas ).keydown(function( event ) {

        console.log(event.which);


        if ( event.which == 39 ) {

            camera.rotation.y += 0.2;
        }
        if ( event.which == 37 ) {

            camera.rotation.y -= 0.2;

        }



    });*/






    return({
        scene: scene,
        camera: camera,
    });
    
};

var scene_ = createScene();
var scene = scene_.scene;
var camera = scene_.camera;


engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});