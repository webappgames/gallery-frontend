
/*
todo delete file

namespace GALLERY.Viewer {


    export function getImageMesh(object){


        if(window.innerWidth>1024){
            let quality = 1024;
        }else
        if(window.innerWidth>512){
            let quality = 512;
        }else{
            let quality = 256;
        }

        let distance = 5;

        let image00 = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
        image00.material = getImageMaterial(object.src, quality, object.isEmitting, object.hasAlpha, object.backFace);



        const lods = 5;
        let mesh;

        for(let lod=0;lod<lods;lod++){

            quality = quality/2;
            distance = distance*2;

            let mesh = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
            mesh.material = getImageMaterial(object.src, quality, object.isEmitting, object.hasAlpha, object.backFace);
            image00.addLODLevel(distance,  mesh);


        }





        return image00;

    }





}

*/