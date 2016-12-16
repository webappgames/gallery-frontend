/// <reference path="reference.ts" />

namespace GALLERY.Viewer {




    let last_hoovered_mesh = null;
    export function onPointerHover(evt, pickResult) {

        let hoovered_mesh;
        if (pickResult.hit) {
            if(pickResult.pickedMesh.name.substr(0,4)=='room' || pickResult.pickedMesh.name.substr(0,6)=='ground'){
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


    let beforeHoverScaling;
    //let hooverInterval;

    //let hoverColor = BABYLON.Color3.White();//BABYLON.Color3.FromHexString('#37beff');

    export function onPointerEnter(mesh) {
        r('onPointerEnter',mesh);

        let distance = BABYLON.Vector3.Distance(camera.position,mesh.position)/BLOCK_SIZE;

        beforeHoverScaling = mesh.scaling;
        mesh.scaling = beforeHoverScaling.clone();
        let q = 1 + 0.005*distance;
        mesh.scaling.x *= q;
        mesh.scaling.y *= q;
        renderTick();

        /*let rad = 0;
        hooverInterval = setInterval(function () {

            rad += 30 / 180 * Math.PI;
            let q = 1+(-Math.cos(rad)+1)/5;

            mesh.scaling = beforeHoverScaling.clone();
            mesh.scaling.x *= q;
            mesh.scaling.y *= q;


        },50);*/



        //hooverLayer.addMesh(mesh, hoverColor);
    }


    export function onPointerLeave(mesh) {
        r('onPointerLeave');
        //clearInterval(hooverInterval);
        mesh.scaling = beforeHoverScaling;
        renderTick();
        //hooverLayer.removeMesh(mesh);
    }


}