/// <reference path="../app" />

/// <reference path="../reference" />

d('scene-hover');



module GALLERY.Viewer {




    let hooveredObjectLast: Objects.Object;
    export function onPointerHover(event) {

        //todo get x,y from event
        var pickResult = scene.pick(scene.pointerX, scene.pointerY);



        let hooveredObject;
        if (pickResult.hit) {
            hooveredObject = objects.getObjectById(pickResult.pickedMesh.name);
        }else{
            hooveredObject = null;
        }




        if(hooveredObject!==hooveredObjectLast){

            if(hooveredObject){

                hooveredObject.handlePointerEnter(event,pickResult);
                //onPointerEnter(hooveredObject);
            }

            if(hooveredObjectLast){

                hooveredObjectLast.handlePointerLeave(event,pickResult);
                //onPointerLeave(hooveredObjectLast);
            }

            hooveredObjectLast = hooveredObject;

        }

    }


    /*let beforeHoverScaling;
    //let hooverInterval;

    //let hoverColor = BABYLON.Color3.White();//BABYLON.Color3.FromHexString('#37beff');

    export function onPointerEnter(mesh) {
        //r('onPointerEnter',mesh);

        let distance = BABYLON.Vector3.Distance(camera.position,mesh.position)/BLOCK_SIZE;

        beforeHoverScaling = mesh.scaling;
        mesh.scaling = beforeHoverScaling.clone();
        let q = 1 + 0.005*distance;
        mesh.scaling.x *= q;
        mesh.scaling.y *= q;
        appEngine.renderTick();



        //hooverLayer.addMesh(mesh, hoverColor);
    }


    export function onPointerLeave(mesh) {
        //r('onPointerLeave');
        //clearInterval(hooverInterval);
        mesh.scaling = beforeHoverScaling;
        appEngine.renderTick();
        //hooverLayer.removeMesh(mesh);
    }*/


}
