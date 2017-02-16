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
        //r('current', current);



        //canvas.requestPointerLock();


        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {

            //r(pickResult.pickedMesh.name);

            if (['ground','ground_merged','room','room_merged'].indexOf(pickResult.pickedMesh.name)!=-1) {

                r(pickResult.pickedMesh.name+' picked');
                goToParent();


            }/* else {

                var object = objects.getObjectById(pickResult.pickedMesh.name);



                if(object.type == 'board'){


                    r('Board was picked,... making next pick to pick object hidden behind that board.',evt,pickResult);

                    let newPickResult = scene.pick(evt.clientX, evt.clientY, function(mesh){

                        return mesh !== pickResult.pickedMesh

                    });

                    if(newPickResult.pickedMesh==pickResult.pickedMesh){
                        throw new Error('Same board was picked twice ?!');
                    }

                    onPointerClick(evt, newPickResult);
                    return;

                }



                r('Pointer clicked on '+object.getConsoleName());




                if('handlePointerPress' in object){//in all objects
                    //object.handlePointerPress();
                    return;
                }




                //r('pick', object, current);


                if(object)
                if (current.getUri() == object.getUri()) {
                    goToParent();

                } else {

                    GALLERY.Viewer.appState(object.getUri(), false, false);
                }


            }/**/

        } else {

            goToParent();
        }

        /**/
    }


}