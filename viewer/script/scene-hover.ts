/// <reference path="reference.ts" />

namespace GALLERY.Viewer {




    let last_hoovered_mesh = null;
    export function onPointerHover(evt, pickResult) {

        let hoovered_mesh;
        if (pickResult.hit) {
            if(pickResult.pickedMesh.name=='room' || pickResult.pickedMesh.name=='ground'){
                hoovered_mesh = null;
            }else{
                hoovered_mesh=pickResult.pickedMesh;
            }
        }else{
            hoovered_mesh = null;
        }


        if(hoovered_mesh!==last_hoovered_mesh){

            if(hoovered_mesh){
                onPointerEnter(hoovered_mesh);
            }

            if(last_hoovered_mesh){
                onPointerLeave(last_hoovered_mesh);
            }

            last_hoovered_mesh = hoovered_mesh;

        }

    }







    export function onPointerEnter(mesh) {
        r('onPointerEnter');
        hooverLayer.addMesh(mesh, BABYLON.Color3.White());
    }


    export function onPointerLeave(mesh) {
        r('onPointerLeave');
        hooverLayer.removeMesh(mesh);
    }


}