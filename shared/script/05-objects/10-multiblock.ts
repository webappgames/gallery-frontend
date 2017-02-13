/// <reference path="../../reference.ts" />

//r('created block');
//r(GALLERY.Objects.Object);

namespace GALLERY.Objects{

    export class MultiBlock extends Object{

        public material: string;

        public size: {
            x: number,
            y: number,
            z: number,
        };
        public opacity: number;





        createBabylonMesh(scene:BABYLON.Scene, getMaterial,environment):BABYLON.Mesh {

            /**/


            //--------------------------------------Endless
            if (environment.endlessStructures) {
                let bottom = this.position.z - this.size.z / 2;
                if (bottom <= BLOCKS_STOREYS_LEVELS[environment.endlessStructuresFromStorey]) {

                    let top = this.position.z + this.size.z / 2;


                    bottom -= 1000;


                    this.position.z = (top + bottom ) / 2;
                    this.size.z = top - bottom;
                }
            }
            //--------------------------------------


            var position = new BABYLON.Vector3(
                this.position.x * -BLOCK_SIZE,
                (this.position.z + BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                this.position.y * BLOCK_SIZE
            );









            /*var box = new BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);
             box.material = getMaterial(this.material, this.opacity, false, this.size.x, this.size.z);*/


            var box = BABYLON.Mesh.CreateBox("room", BLOCK_SIZE, scene);


           /* var f = new BABYLON.StandardMaterial("material0", scene);
            f.diffuseColor = new BABYLON.Color3(0.75, 0, 0);
            var ba = new BABYLON.StandardMaterial("material1", scene);
            ba.diffuseColor = new BABYLON.Color3(0, 0, 0.75);
            var l = new BABYLON.StandardMaterial("material2", scene);
            l.diffuseColor = new BABYLON.Color3(0, 0.75, 0.75);
            var r = new BABYLON.StandardMaterial("material3", scene);
            r.diffuseColor = new BABYLON.Color3(0, 0, 0.75);
            var t = new BABYLON.StandardMaterial("material4", scene);
            t.diffuseColor = new BABYLON.Color3(0, 0.75, 0);
            var bo = new BABYLON.StandardMaterial("material5", scene);
            bo.diffuseColor = new BABYLON.Color3(1, 1, 0);*/


            let f  = getMaterial(this.material, 0.5, true, this.size.z, this.size.x);
            let ba = f;
            let l  = getMaterial(this.material, this.opacity, true, this.size.z, this.size.y);
            let r  = l;
            let t  = getMaterial(this.material, this.opacity, true, this.size.x, this.size.y);
            let bo = t;


            var multi = new BABYLON.MultiMaterial("multimaterial", scene);
            multi.subMaterials.push(f);
            multi.subMaterials.push(ba);
            multi.subMaterials.push(l);
            multi.subMaterials.push(r);
            multi.subMaterials.push(t);
            multi.subMaterials.push(bo);

            //apply material
            box.subMeshes = [];
            var verticesCount = box.getTotalVertices();
            box.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, box));
            box.subMeshes.push(new BABYLON.SubMesh(1, 1, verticesCount, 6, 6, box));
            box.subMeshes.push(new BABYLON.SubMesh(2, 2, verticesCount, 12, 6, box));
            box.subMeshes.push(new BABYLON.SubMesh(3, 3, verticesCount, 18, 6, box));
            box.subMeshes.push(new BABYLON.SubMesh(4, 4, verticesCount, 24, 6, box));
            box.subMeshes.push(new BABYLON.SubMesh(5, 5, verticesCount, 30, 6, box));
            box.material = multi;




            box.isPickable = true;
            box.checkCollisions = true;

            box.position = position;

            box.scaling.x = this.size.x;
            box.scaling.y = this.size.z;
            box.scaling.z = this.size.y;


            return box;




        }


    }






}