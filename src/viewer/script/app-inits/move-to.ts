/// <reference path="../app" />
/// <reference path="../app-engine" />

/// <reference path="../reference" />

d('move-to');


module GALLERY.Viewer {

    export var world_selected;



    export function moveTo(x: number, y:number, rotation, world, storey, immediately = true) {


        if (world_selected !== world) {
            r('Moving to new world "' + world + '" from world "' + world_selected + '"');

            document.getElementById("scene").focus();

            clearWorld();
            runWorld(objects.filterWorld(world), objects.filterWorld('textures')/*todo cache this*/);
            world_selected = world;


            immediately = true;

        }

        r('Moving to ', x, y, world, storey, rotation, immediately);


        /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
         camera.rotation.x = 0;
         camera.rotation.z = 0;

         camera.position.x = x * -BLOCK_SIZE;
         camera.position.z = y * BLOCK_SIZE;*/

        let babylon_rotation;

        if(rotation === null) {

            babylon_rotation = null;

        }else{

            babylon_rotation = new BABYLON.Vector3(
                0,
                (180 + rotation) / 180 * Math.PI,
                0
            );

        }



        var level = BLOCKS_STOREYS_LEVELS[storey];

        var babylon_position = new BABYLON.Vector3(
            x * -BLOCK_SIZE,
            (level + EYE_VERTICAL) * BLOCK_SIZE,
            y * BLOCK_SIZE
        );

        moveToBabylon(babylon_position, babylon_rotation, immediately);

    }


    export function moveToObject(object: GALLERY.Objects.Object, immediately = true) {//todo use this

        object.rotation = object.rotation || 0;//todo better

        let rotation;
        if(object.rotationNotImportant){
            rotation = null;
        }else{
            rotation = object.rotation / 1;
        }

        moveTo(object.position.x, object.position.y, rotation, object.world, object.storey, immediately);

    }


    export function moveToURI(uri: string, immediately = true) {//todo use this

        let label = objects.filterTypes('label').findBy('uri', uri);

        if (label) {

            moveToObject(label, immediately);
            //moveTo(label.position.x, label.position.y, label.rotation / 1, label.world, label.storey, immediately);
            return (true);
        } else {
            console.warn('There is no label with uri "' + uri + '".');
            return (false);
        }


    }




    export let duration = 1;
    export let easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);




    export function moveToBabylon(babylon_position, babylon_rotation, immediately) {




        if (immediately) {
            camera.position = babylon_position;

            if(babylon_rotation!==null){
                camera.rotation = babylon_rotation;
            }

            appEngine.renderTick();

            return;
        }

        if (!LOCKED) {
            LOCKED = true;
        }


        // 3 parameters to create an event:
        // - The frame at which the event will be triggered
        // - The action to execute
        // - A boolean if the event should execute only once (false by default)
        /*var finished = new BABYLON.AnimationEvent(60, function() {
         console.log("Animation Finished!");
         GALLERY.Viewer.LOCKED = false;
         }, true);*/


        scene._pendingData = [];


        const enginePlayReasonMoving = new AppEnginePlayReason('moving');

        appEngine.play(enginePlayReasonMoving);


        let animation = BABYLON.Animation.CreateAndStartAnimation(
            "anim",
            camera,
            "position",
            30,
            30 * duration,
            camera.position,
            babylon_position,
            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
            easingFunction,
            function () {

                console.log("Animation Finished!");
                LOCKED = false;

                appEngine.pause(enginePlayReasonMoving);

            }
        );


        if(babylon_rotation!==null) {
            rotateToBabylon(babylon_rotation);
        }


    }



    export function rotateToBabylon(babylon_rotation){


        function parseRadians(rad) {
            if (rad < 0)rad += Math.PI * 2;
            if (rad > Math.PI * 2)rad -= Math.PI * 2;
            return rad;
        }


        camera.rotation.y = parseRadians(camera.rotation.y);
        babylon_rotation.y = parseRadians(babylon_rotation.y);

        var diff = camera.rotation.y - babylon_rotation.y;

        if (diff > Math.PI)camera.rotation.y -= Math.PI * 2;
        if (diff < -Math.PI)camera.rotation.y += Math.PI * 2;



        const enginePlayReasonRotating = new AppEnginePlayReason('rotating');
        appEngine.play(enginePlayReasonRotating);
        LOCKED = true;

        BABYLON.Animation.CreateAndStartAnimation(
            "anim",
            camera,
            "rotation",
            30,
            30 * duration,
            camera.rotation,
            babylon_rotation,
            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
            easingFunction,
            function () {

                console.log("Animation Finished!");
                LOCKED = false;

                appEngine.pause(enginePlayReasonRotating);

            }
        );


    }



}
