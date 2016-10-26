/// <reference path="reference.ts" />




var canvas = document.getElementById("scene");
var engine = new BABYLON.Engine(canvas, true);





var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Lights
    //var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    //var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    // Need a free camera for collisions

    var camera = new BABYLON.VirtualJoysticksCamera("VJC", BABYLON.Vector3.Zero(), scene);
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, EYE_VERTICAL * BLOCK_SIZE, 30*BLOCK_SIZE), scene);


    scene.activeCamera = camera;
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
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, EYE_VERTICAL * BLOCK_SIZE/2, 1);

    //finally, say which mesh will be collisionable



    /*camera._oldPositionForCollisions = camera.position;
    camera.moveWithCollisions = function(velocity: Vector3): void {

        r(this);

        var globalPosition = this.position;//getAbsolutePosition();

        globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPositionForCollisions);
        //this._oldPositionForCollisions.addInPlace(this.ellipsoidOffset);
        this._collider.radius = this.ellipsoid;

        this.getScene().collisionCoordinator.getNewPosition(this._oldPositionForCollisions, velocity, this._collider, 3, this, this._onCollisionPositionChange, this.uniqueId);
    };*/



    var zones_last = [];
    scene.registerBeforeRender(function () {


        camera.cameraDirection.y += 0.01;


        //camera.moveWithCollisions(scene.gravity);
        /*if (!ground.intersectsPoint(camera.position)) {
            camera.position.addInPlace(scene.gravity);
        }*/

        /*camera_mesh.position = camera.position;
        camera_mesh.moveWithCollisions(scene.gravity);
        camera.position = camera_mesh.position;*/



        if(camera.position.y < RESPAWN_VERTICAL * BLOCK_SIZE){
            if(GALLERY.Viewer.running){
                GALLERY.Viewer.appStateBack();
            }
        }




        const limit = (Math.PI/2)*(3/4);

        if (camera.rotation.x < -limit) {//Top
            camera.rotation.x = -limit;
        }
        if (camera.rotation.x > limit) {//Bottom
            camera.rotation.x = limit;
        }



        let zones = [];


        meshes_zones.forEach(function (mesh) {


            if(mesh.intersectsPoint(camera.position)){

                zones.push(mesh.name);
                //r('in zone');

            }



        });


        let zones_plus = [];
        let zones_minus = [];

        for(var i=0,l=zones.length;i<l;i++){
            if(zones_last.indexOf(zones[i])==-1){
                zones_plus.push(zones[i]);
            }
        }


        for(var i=0,l=zones_last.length;i<l;i++){
            if(zones.indexOf(zones_last[i])==-1){
                zones_minus.push(zones_last[i]);
            }
        }



        zones_last = zones;//.slice();



        zones_plus.forEach(function(zone_id){
            //$('#zone-'+zone_id).show();
            r('In of zone '+zone_id);

            let zone = objects.getObjectById(zone_id);
            let $zone_sections = $(zone.selector);
            $zone_sections.stop().slideDown();


        });
        zones_minus.forEach(function(zone_id){
            //$('#zone-'+zone_id).hide();
            r('Out zone '+zone_id);

            let zone = objects.getObjectById(zone_id);
            let $zone_sections = $(zone.selector);
            $zone_sections.stop().slideUp();



        });



    });
    //camera.mode = 1;




    /*var camera_mesh = BABYLON.Mesh.CreateSphere("crate", 16, 1, scene);
    camera_mesh.checkCollisions = true;
    camera_mesh.applyGravity = true;

    camera_mesh.scaling.y = EYE_VERTICAL * BLOCK_SIZE/2;*/



    /*camera.onCollide = function(event){
        r(event);

    };*/





    var sun = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(-0.7, -1, -0.5), scene);
    var sun2 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0.7, -1, 0.5), scene);
    sun2.intensity = 0.5;





    /*
    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../media/images/skyboxes/tropical-sunny-day/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.position = new BABYLON.Vector3(0, 0, 0);
    skybox.isPickable = false;
    /**/









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