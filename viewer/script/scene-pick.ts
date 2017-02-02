/// <reference path="reference.ts" />

namespace GALLERY.Viewer {


    export function goToParent() {

        let current = GALLERY.Viewer.getAppStateLabel();

        //r(current);
        if (current.parent && current.parent !== 'none') {

            //r('Going to parent');
            GALLERY.Viewer.appState(current.parent, false, false);
        } else if (current.next && current.next !== 'none') {
            //todo context menu
            //GALLERY.Viewer.appState(current.next, false, false);
        }


    }



    export function onPointerClick(evt, pickResult) {//todo move to objects

        let current = GALLERY.Viewer.getAppStateLabel();
        r('current', current);



        //canvas.requestPointerLock();


        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {

            //r(pickResult.pickedMesh.name);

            if (['ground','ground_merged','room','room_merged'].indexOf(pickResult.pickedMesh.name)!=-1) {

                r(pickResult.pickedMesh.name+' picked');
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

            } else {

                var object = objects.getObjectById(pickResult.pickedMesh.name);


                if('handleEventPress' in object){//in all objects
                    //object.handlePointerPress();
                    return;
                }


                if(object.type === 'poster'){



                    let position = pickResult.pickedMesh.position.subtract(pickResult.pickedPoint);

                    let vec2 = {
                        x: /*Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.z, 2))*/(Math.abs(position.x)>Math.abs(position.z)?position.x:position.z),
                        y: position.y
                    };


                    vec2.x /= pickResult.pickedMesh.scaling.x * BLOCK_SIZE;
                    vec2.y /= pickResult.pickedMesh.scaling.y * BLOCK_SIZE;

                    vec2.x += 0.5;
                    vec2.y += 0.5;

                    vec2.x *= object.width * object.voxelPixelRatio;
                    vec2.y *= object.height * object.voxelPixelRatio;


                    /*let posterElement = object.getPosterElement();
                    r(posterElement);
                    let subElement = posterElement.elementFromPoint( vec2.x, vec2.y);

                    r(subElement);*/

                    let ctx = pickResult.pickedMesh.material.emissiveTexture.getContext();

                    ctx.beginPath();
                    ctx.arc(vec2.x, vec2.y, 10, 0, 2 * Math.PI);
                    ctx.fill();


                    pickResult.pickedMesh.material.emissiveTexture.update();
                    GALLERY.Viewer.renderTick();



                    return;
                }



                r('pick', object, current);

                if(object)
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