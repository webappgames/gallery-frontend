/// <reference path="../app" />

/// <reference path="../reference" />

module GALLERY.Viewer {



    export function createScene(engine,canvas) {
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
        camera.angularSensibility = -MOUSE_ANGULAR_SENSIBILITY;//todo const
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
        camera.fov = 1;


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




        /*camera._oldPositionForCollisions = camera.position;
         camera.moveWithCollisions = function(velocity: Vector3): void {

         r(this);

         var globalPosition = this.position;//getAbsolutePosition();

         globalPosition.subtractFromFloatsToRef(0, this.ellipsoid.y, 0, this._oldPositionForCollisions);
         //this._oldPositionForCollisions.addInPlace(this.ellipsoidOffset);
         this._collider.radius = this.ellipsoid;

         this.getScene().collisionCoordinator.getNewPosition(this._oldPositionForCollisions, velocity, this._collider, 3, this, this._onCollisionPositionChange, this.uniqueId);
         };*/




        canvas.addEventListener("mousemove", function (event) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            onPointerHover(event,pickResult);
        });







        var inZonesLast = [];
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


            //=============================================================Zones

            let inZonesAll = [];

            //r(zones);aaa;

            zones.forEach(function (zone) {

                if (zone.isIn(camera.position,camera.rotation)) {
                    inZonesAll.push(zone);
                }
            });



            inZonesAll.sort(function (zone_a, zone_b) {
                if (zone_a.uri_level > zone_b.uri_level) {
                    return (-1);
                } else if (zone_a.uri_level < zone_b.uri_level) {
                    return (1);
                } else {
                    return (0);
                }
            });



            let oneUnimportant = false;
            let inZones = inZonesAll.filter(function (inZone,i) {//todo better
                if(inZone.isImportant){
                    return(true);
                }else{
                    if(!oneUnimportant){
                        oneUnimportant = true;
                        return(true);
                    }else{
                        return(false);
                    }
                }
            });





            let inZonesPlus = [];
            let inZonesMinus = [];

            for (var i = 0, l = inZones.length; i < l; i++) {
                if (inZonesLast.indexOf(inZones[i]) == -1) {
                    inZonesPlus.push(inZones[i]);
                }
            }


            for (var i = 0, l = inZonesLast.length; i < l; i++) {
                if (inZones.indexOf(inZonesLast[i]) == -1) {
                    inZonesMinus.push(inZonesLast[i]);
                }
            }


            inZonesLast = inZones;//.slice();


            //----------------------------------------------------------Creating new App state
            if (inZonesPlus.length || inZonesMinus.length) {



                inZones = inZones.filter(function (zone) {
                    return (zone.uri.substr(0, 1) == '/');
                });



                inZones.sort(function (zone_a, zone_b) {
                    if (zone_a.uri_level > zone_b.uri_level) {
                        return (-1);
                    } else if (zone_a.uri_level < zone_b.uri_level) {
                        return (1);
                    } else {
                        return (0);
                    }
                });

                r(inZones);
                r('Creating new App uri from zone ', inZones[0]);

                let uri: string;
                if (inZones.length == 0) {
                    uri = '/';
                } else {
                    uri = inZones[0].uri;
                }


                GALLERY.Viewer.appState(uri + window.location.hash, true);

            }
            //----------------------------------------------------------



            //----------------------------------------------------------Showing/hiding divs
            inZonesPlus.forEach(function (zone) {
                //$('#zone-'+zone_id).show();
                r('In the zone ' + zone.name);

                zone.showBoard();
                //let $zone_sections = $('#zone-' + zone_id);
                //$zone_sections.stop().slideDown();
                //$zone_sections.show().stop().animate({'margin-top': '50px'},1000);


            });
            inZonesMinus.forEach(function (zone) {
                //$('#zone-'+zone_id).hide();
                r('Out of the zone ' + zone.name);

                zone.hideBoard();
                //let zone = objects.getObjectById(zone_id);
                //let $zone_sections = $('#zone-' + zone_id);
                //$zone_sections.stop().slideUp();
                //$zone_sections.stop().hide('slide', {direction: 'up'}, 1400);


            });
            //----------------------------------------------------------
            //=============================================================



            //=============================================================Boards


            boards.forEach(function (board) {

                //r( board.mesh.position.x);
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

                const POSTER_WTF_RATIO = 1900;

                let distance = BABYLON.Vector3.Distance(camera.position, board.mesh.position);
                let zoom = 1 / distance;
                zoom *= canvas.height/POSTER_WTF_RATIO;





                board.element.style.zIndex = 1000000000 - distance;//todo better
                //board.element.style.zoom = zoom*100;


                //board.element.style.transform = 'rotateY('+Math.round(camera.rotation.y /Math.PI * 180 -45)+'deg)';
                //board.element.style.transform = 'translateZ('+(distance*-10)+'px)';
                //board.element.childNodes[0].style.transform = 'scale('+(zoom*100)+')';
                board.element.childNodes[0].style.zoom = zoom*100;





                board.element.style.position = 'fixed';
                board.element.style.left = (position.x ) - (board.element.clientWidth / 2) + 'px';
                board.element.style.top = (position.y  - board.top) + 'px';
                board.element.style.display = 'block';


            });


            //=============================================================

        });


        //document.getElementById('zones').style.perspective='500px';

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
        let pointerDown = false;
        const enginePlayReasonDragging = new AppEnginePlayReason('dragging');

        let eventObject;


        //When pointer down event is raised
        scene.onPointerDown = function (evt, pickResult) {

            pointerDown = true;

            if(MODE=='WEB') {

                //r('down');
                onDownCamera = camera.rotation.clone();
                onDownTimestamp = new Date() / 1000;

                appEngine.play(enginePlayReasonDragging);

                if (pickResult.hit) {
                    let object = objects.getObjectById(pickResult.pickedMesh.name);



                    if(object)
                    if(object.type == 'board'){

                        r('Board was picked,... making next pick to pick object hidden behind that board.',evt,pickResult);

                        let newPickResult = scene.pick(evt.clientX, evt.clientY, function(mesh){
                            return mesh !== pickResult.pickedMesh
                        });

                        if(newPickResult.pickedMesh==pickResult.pickedMesh){
                            throw new Error('Same board was picked twice ?!');
                        }

                        scene.onPointerDown(evt, newPickResult);
                        return;
                    }





                    if(object)object.handlePointerPress(evt, pickResult);
                    eventObject = object;
                }


            }



        };
        /*scene.onPointerMove = function(){

         r('move');
         movement++;


         };*/


        scene.onPointerUp = function (evt, pickResult) {


            pointerDown = false;

            let pressed:boolean;

            if(MODE=='WEB') {

                let distance = BABYLON.Vector3.Distance(camera.rotation, onDownCamera);
                let distanceTime = (new Date() / 1000) - onDownTimestamp;

                r(distance, distanceTime);

                if (distance > 0.1 || distanceTime > 1) {

                    pressed = false;

                } else {

                    pressed = true;
                    onPointerClick.call(this, evt, pickResult);

                }




                if (pickResult.hit) {

                    let object = objects.getObjectById(pickResult.pickedMesh.name);


                    if(object)
                    if(object.type == 'board'){

                        r('Board was picked,... making next pick to pick object hidden behind that board.',evt,pickResult);

                        let newPickResult = scene.pick(evt.clientX, evt.clientY, function(mesh){
                            return mesh !== pickResult.pickedMesh
                        });

                        if(newPickResult.pickedMesh==pickResult.pickedMesh){
                            throw new Error('Same board was picked twice ?!');
                        }

                        scene.onPointerUp(evt, newPickResult);
                        return;
                    }




                    if(object !== eventObject){
                        pressed=false;
                        object = eventObject;
                    }

                    if(object)object.handlePointerRelease(pressed, evt, pickResult);



                }


                appEngine.pause(enginePlayReasonDragging);

            }






        };


        /*scene.registerBeforeRender(function () {

            if(pointerDown) {
                camera.position.x += Math.sin(camera.rotation.y) * 0.5;
                camera.position.z += Math.cos(camera.rotation.y) * 0.5;
            }

        });*/



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

    }


}