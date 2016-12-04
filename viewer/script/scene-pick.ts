/// <reference path="reference.ts" />

namespace GALLERY.Viewer {


    export function onPointerUp(evt, pickResult) {

        let current = GALLERY.Viewer.getAppStateLabel();
        r('current', current);


        function goToParent() {

            if (current.parent && current.parent !== 'none') {

                GALLERY.Viewer.appState(current.parent, false, false);
            } else if (current.next && current.next !== 'none') {
                //todo context menu
                //GALLERY.Viewer.appState(current.next, false, false);
            }


        }

        //canvas.requestPointerLock();


        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {

            //r(pickResult.pickedMesh.name);

            if (pickResult.pickedMesh.name == 'ground') {

                r('ground picked');
                goToParent();

                /*var rad = Math.atan2(
                 (pickResult.pickedPoint.x-camera.position.x),
                 (pickResult.pickedPoint.z-camera.position.z)

                 );


                 r(rad/Math.PI*180);



                 var babylon_rotation = new BABYLON.Vector3(
                 0,
                 rad,
                 0
                 );



                 var babylon_position = new BABYLON.Vector3(
                 pickResult.pickedPoint.x,
                 camera.position.y,
                 pickResult.pickedPoint.z
                 );

                 moveToBabylon(babylon_position,babylon_rotation,false);*/


            } else if (pickResult.pickedMesh.name == 'room') {

                r('room picked');
                goToParent();

            } else {

                var object = objects.getObjectById(pickResult.pickedMesh.name);

                r('pick', object);


                if (current.getUri() == object.getUri()) {
                    goToParent();

                } else {

                    GALLERY.Viewer.appState(object.getUri(), false, false);
                }


                /*var src = object.src;
                 var src_uri = URI(src)
                 .removeSearch("width");
                 var src_normal = src_uri.addSearch({ width: 1024 }).toString();


                 setTimeout(
                 function () {
                 Window.open(object.name, '<img src="'+src_normal+'">', function(){}, 'NORMAL');
                 }, IMMEDIATELY_MS
                 );*/


            }
            //r(object);

        } else {

            goToParent();
        }

        /**/
    }


}