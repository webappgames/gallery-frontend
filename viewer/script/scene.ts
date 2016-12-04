/// <reference path="reference.ts" />


namespace GALLERY.Viewer {

    export var canvas = document.getElementById("scene");
    export var engine = new BABYLON.Engine(canvas, true);
    export var scene;


    export function createScene() {
        scene = new BABYLON.Scene(engine);

        // Lights
        //var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
        //var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

        // Need a free camera for collisions

        //var camera = new BABYLON.VirtualJoysticksCamera("VJC", BABYLON.Vector3.Zero(), scene);
        var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, EYE_VERTICAL * BLOCK_SIZE, 30 * BLOCK_SIZE), scene);
        camera.ellipsoid = new BABYLON.Vector3(1, (EYE_VERTICAL - 0.1111/*todo why?*/) * BLOCK_SIZE / 2 , 1);


        scene.activeCamera = camera;
        camera.rotation.y = Math.PI;
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

        camera.keysLeft = [37, 65];//arrow <-
        camera.keysRight = [39, 68];//arrow ->


        camera.speed = SPEED;
        camera.inertia = SPEED_INERTIA;
        camera.fov = 1.3;


        camera.onCollide = function () {
            onCollide.apply(this,arguments);//todo why?
            //r('collide',onCollide);
        };


        //Set gravity for the scene (G force like, on Y-axis)
        scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        //scene.enablePhysics(scene.gravity, new BABYLON.OimoJSPlugin());


        // Enable Collisions
        scene.collisionsEnabled = true;

        //Then apply collisions and gravity to the active camera
        camera.checkCollisions = true;
        camera.applyGravity = true;

        //Set the ellipsoid around the camera (e.g. your player's size)


        //r(camera.angularSensibility);
        camera.angularSensibility= -camera.angularSensibility;//-1000;
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


            if(GALLERY.Viewer.MODE=='WEB') {

                if (current_label) {

                    //r(current_label.uri);
                    //r(current_label);
                    if (current_label.rotationSpeed) {
                        camera.rotation.y += current_label.rotationSpeed / 180 * Math.PI / engine.getFps();
                    }
                }
            }


            //r(scene.isReady());


            if (GALLERY.Viewer.LOCKED)return;


            camera.cameraDirection.y += 0.01;


            //camera.moveWithCollisions(scene.gravity);
            /*if (!ground.intersectsPoint(camera.position)) {
             camera.position.addInPlace(scene.gravity);
             }*/

            /*camera_mesh.position = camera.position;
             camera_mesh.moveWithCollisions(scene.gravity);
             camera.position = camera_mesh.position;*/


            if (camera.position.y < RESPAWN_VERTICAL * BLOCK_SIZE) {
                if (GALLERY.Viewer.running) {
                    GALLERY.Viewer.appStateBack();
                }
            }


            const limit = (Math.PI / 2) * (3 / 4);

            if (camera.rotation.x < -limit) {//Top
                camera.rotation.x = -limit;
            }
            if (camera.rotation.x > limit) {//Bottom
                camera.rotation.x = limit;
            }


            //----------------------------------------------------------Zones

            let zones_ids = [];


            zones.forEach(function (zone) {


                if (zone.mesh.intersectsPoint(camera.position)) {

                    zones_ids.push(zone.mesh.name);
                    //r('in zone');
                    zone.mesh.isPickable = false;

                }else{
                    zone.mesh.isPickable = zone.object.isPickable;

                }


            });


            let zones_plus = [];
            let zones_minus = [];

            for (var i = 0, l = zones_ids.length; i < l; i++) {
                if (zones_last.indexOf(zones_ids[i]) == -1) {
                    zones_plus.push(zones_ids[i]);
                }
            }


            for (var i = 0, l = zones_last.length; i < l; i++) {
                if (zones_ids.indexOf(zones_last[i]) == -1) {
                    zones_minus.push(zones_last[i]);
                }
            }


            zones_last = zones_ids;//.slice();


            if (zones_plus.length || zones_minus.length) {


                let zones = zones_ids.map(function (zone_id) {
                    return objects.getObjectById(zone_id);
                });


                zones = zones.filter(function (zone) {
                    return (zone.uri.substr(0, 1) == '/');
                });


                zones.sort(function (zone_a, zone_b) {
                    if (zone_a.uri_level > zone_b.uri_level) {
                        return (-1);
                    } else if (zone_a.uri_level < zone_b.uri_level) {
                        return (1);
                    } else {
                        return (0);
                    }
                });

                r(zones);
                r('Creating new app uri from zone ', zones[0]);

                let uri: string;
                if (zones.length == 0) {
                    uri = '/';
                } else {
                    uri = zones[0].uri;
                }


                /*let uri = '/';
                 zones.forEach(function (zone) {
                 uri += zone.uri;
                 });
                 uri = uri.split('//').join('/');*/

                GALLERY.Viewer.appState(uri + window.location.hash, true);


            }


            //r(zones_plus,zones_minus);

            zones_plus.forEach(function (zone_id) {
                //$('#zone-'+zone_id).show();
                r('In the zone ' + zone_id);

                let $zone_sections = $('#zone-' + zone_id);
                $zone_sections.stop().slideDown();
                //$zone_sections.show().stop().animate({'margin-top': '50px'},1000);


            });
            zones_minus.forEach(function (zone_id) {
                //$('#zone-'+zone_id).hide();
                r('Out of the zone ' + zone_id);

                //let zone = objects.getObjectById(zone_id);
                let $zone_sections = $('#zone-' + zone_id);
                $zone_sections.stop().slideUp();
                //$zone_sections.stop().hide('slide', {direction: 'up'}, 1400);


            });


            //----------------------------------------------------------Boards


            boards.forEach(function (board) {

                /*r(mesh.position);

                 var p = BABYLON.Vector3.Project(

                 mesh.position,
                 BABYLON.Matrix.Identity(),
                 scene.getTransformMatrix(),
                 camera.viewport.toGlobal(engine)


                 );*/


                var position = BABYLON.Vector3.Project(
                    board.mesh.position,
                    BABYLON.Matrix.Identity(),
                    scene.getTransformMatrix(),
                    camera.viewport.toGlobal(canvas.clientWidth, canvas.clientHeight)
                );


                if (position.z > 1) {
                    board.element.style.display = 'none';
                    return;
                }


                var pickInfo = scene.pick(position.x, position.y);


                if (pickInfo.pickedMesh !== board.mesh) {
                    board.element.style.display = 'none';
                    return;
                }


                //r(pickInfo.pickedMesh.name);


                let distance = BABYLON.Vector3.Distance(camera.position, board.mesh.position);
                let zoom = 1 / distance;
                zoom = 1;


                board.element.style.zIndex = 1000000000 - distance;//todo better
                board.element.style.zoom = zoom;


                //r(board.element.clientWidth);

                board.element.style.left = (position.x / zoom) - (board.element.clientWidth / 2) + 'px';
                board.element.style.top = (position.y / zoom) + 'px';
                board.element.style.display = 'block';


            });


            //----------------------------------------------------------

        });


        //r(camera.viewport);
        //r(camera.viewport.toGlobal(engine));


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


        //-----------------------------------------------------------------Pointer Events

        let onDownCamera, onDownTimestamp;

        //When pointer down event is raised
        scene.onPointerDown = function () {

            //r('down');
            onDownCamera = camera.rotation.clone();
            onDownTimestamp = new Date() / 1000;


        };
        /*scene.onPointerMove = function(){

         r('move');
         movement++;


         };*/
        scene.onPointerUp = function () {

            if (GALLERY.Viewer.MODE != 'WEB')return;

            let distance = BABYLON.Vector3.Distance(camera.rotation, onDownCamera);
            let distanceTime = (new Date() / 1000) - onDownTimestamp;

            r(distance, distanceTime);

            if (distance > 0.1 || distanceTime > 1) {


            } else {
                onPointerUp.apply(this, arguments);
            }


        };

        //-----------------------------------------------------------------


        /*var movement = {
         z: 0
         };
         scene.registerBeforeRender(function () {

         //r(movement);
         camera.position.y += movement.z;

         movement.z *= 0.9;
         if(movement.z<0.1)movement.z=0;

         });*/


        return ({
            scene: scene,
            camera: camera,
            sun: sun,
            //movement: movement,
        });

    };

    var scene_ = createScene();
    export var scene = scene_.scene;
    export var camera = scene_.camera;
    export var movement = scene_.movement;
    export var sun = scene_.sun;


    engine.runRenderLoop(function () {
        scene.render();
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });


}