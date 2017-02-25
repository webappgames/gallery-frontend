/// <reference path="./reference.ts" />


module GALLERY.Viewer {



    let personToClone;



    BABYLON.SceneLoader.ImportMesh("", "/media/meshes/dude/", "dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {

        newMeshes[0].scaling.x = 0.2;
        newMeshes[0].scaling.y = 0.2;
        newMeshes[0].scaling.z = 0.2;




        personToClone = {
            meshes: newMeshes,
            skeleton: skeletons[0]
        };


    });












    export class GamePlayer{

        public date:Date;
        public name:string;
        public message:string;
        private element;//todo _


        private clonedPreson;//todo _
        private babylonPosition;//todo _
        private babylonRotation;//todo _
        private headRotation: number;//todo _




        constructor(private scene){
            let self = this;


            //r('Creating player');

            this._clonePlayerMesh();


            scene.registerBeforeRender(function(){
                self._easeHead();
                self._easeMovement();
            });
            /*this.mesh = BABYLON.Mesh.CreateSphere("player", 16, 2, scene);

            this.mesh.material = new BABYLON.StandardMaterial("Mat", scene);

            this.mesh.material.diffuseTexture = new BABYLON.Texture('/media/images/other/eye.jpg', scene);
            this.mesh.material.diffuseTexture.uScale = 1;
            this.mesh.material.diffuseTexture.vScale = 1;*/









            this.element = document.createElement('div');
            this.element.style.position = 'fixed';
            this.element.classList.add('zone-player');
            //element.innerHTML = 'xxx '+this.name;

            document.getElementById('zones').appendChild(this.element);


            /*boards.push({//todo DI
                mesh: this.mesh,
                element: this.element,
                top: 20
            });*/



            // todo remove meshes or meshes.push(board);



            this.setName('');
            this.setMessage('');


        }



        private _clonePlayerMesh(){
            let self = this;


            this.babylonPosition = new BABYLON.Vector3(0,0,0);
            this.babylonRotation = new BABYLON.Vector3(0,0,0);
            this._babylonPositionMovement = new BABYLON.Vector3(0,0,0);


            this.clonedPreson = {
                meshes: [],
                skeleton: personToClone.skeleton.clone('player-skeleton')
            };



            personToClone.meshes.forEach(function(mesh,i){

                if(i==0)return;

                self.clonedPreson.meshes[i] = mesh.clone('player');
                self.clonedPreson.meshes[i].rotation = self.babylonRotation;
                self.clonedPreson.meshes[i].position = self.babylonPosition;

                self.clonedPreson.meshes[i].skeleton = self.clonedPreson.skeleton;

            });


        }





        private _redrawBoard(){

            this.element.innerHTML = '';

            if(this.name){
                this.element.innerHTML += '<span class="name">['+this.name+']</span>';
            }


            if(this.message){
                this.element.innerHTML += '<span class="message">'+this.message+'</span>';
            }


        }




        public setName(name:string){
            this.name = name;
            this._redrawBoard();

        }



        //private _babylonPositionMovement;
        private _inStep:boolean;

        public setPosition(position:BABYLON.Vector3,first=false){

            let self = this;

            /*this.babylonPosition.x=position.x/0.2;
            this.babylonPosition.y=(position.y-EYE_VERTICAL*BLOCK_SIZE)/0.2;
            this.babylonPosition.z=position.z/0.2;
                */

            position.y -= EYE_VERTICAL*BLOCK_SIZE;
            position.x /= 0.2;
            position.y /= 0.2;
            position.z /= 0.2;




            /*if(!first) {

                this._babylonPositionMovement = new BABYLON.Vector3(
                    position.x-this.babylonPosition.x,
                    position.y-this.babylonPosition.y,
                    position.z-this.babylonPosition.z
                );


            }


            this.babylonPosition.x=position.x;
            this.babylonPosition.y=position.y;
            this.babylonPosition.z=position.z;*/


            this.clonedPreson.meshes.forEach(function (mesh) {
                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    mesh,
                    "position",
                    30,
                    30 * 0.1,
                    mesh.position,
                    position,
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
                );
            });



            if(! this._inStep) {
                this._inStep = true;
                scene.beginAnimation(this.clonedPreson.skeleton, 100 - 80, 80, false, 3, function () {
                    self._inStep = false;
                });
            }

            //this.mesh.position = position;




        }



        private _easeMovement(){

            this.babylonPosition.x+=this._babylonPositionMovement.x*0.1;
            this.babylonPosition.y+=this._babylonPositionMovement.y*0.1;
            this.babylonPosition.z+=this._babylonPositionMovement.z*0.1;

        }




        public setRotation(rotation:BABYLON.Vector3){

            this.headRotation = rotation.x;

            rotation.x = 0;
            rotation.z = 0;
            rotation.y += Math.PI;

            this.clonedPreson.meshes.forEach(function (mesh) {
                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    mesh,
                    "rotation",
                    30,
                    30 * 0.1,
                    mesh.rotation,
                    rotation,
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
                );
            });

            //this.babylonRotation.y=rotation.y+Math.PI;





            /*rotation.y += Math.PI/2;

            let _=rotation.x;
            rotation.x = rotation.z;
            rotation.z = _;


            //this.mesh.rotation = rotation;
            BABYLON.Animation.CreateAndStartAnimation(
                "anim",
                this.mesh,
                "rotation",
                30,
                30 * 0.1,
                this.mesh.rotation,
                rotation,
                BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
            );*/

        }

        private _easeHead(){

            //let from = this.clonedPreson.skeleton.bones[7].getRotation().z;
            let to = this.headRotation;

            //let current = (from+to)/2;

            this.clonedPreson.skeleton.bones[7].setRotation(
                new BABYLON.Vector3(0,0,to)
            );
        }




        public setMessage(message:string){
            this.message = message;
            this._redrawBoard();
        }



        public destruct(){

            this.clonedPreson.skeleton.dispose();
            this.clonedPreson.meshes.forEach(function (mesh) {
                mesh.dispose();
            });
            //this.mesh.dispose();
            this.element.parentNode.removeChild(this.element);

        }






    }

}