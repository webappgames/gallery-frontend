/// <reference path="reference.ts" />


namespace GALLERY.Viewer {


    export class GamePlayer{

        private name:string;
        private message:string;
        private mesh;
        private element;


        constructor(private scene){


            //r('Creating player');


            this.mesh = BABYLON.Mesh.CreateSphere("player", 16, 2, scene);

            this.mesh.material = new BABYLON.StandardMaterial("Mat", scene);

            this.mesh.material.diffuseTexture = new BABYLON.Texture('/media/images/other/eye.jpg', scene);
            this.mesh.material.diffuseTexture.uScale = 1;
            this.mesh.material.diffuseTexture.vScale = 1;






            /*let board = new BABYLON.Mesh.CreateSphere(createGuid(), 2, 4 * BLOCK_SIZE, scene);
            board.position = position;
            board.position.y += EYE_VERTICAL * BLOCK_SIZE;


            board.material = new BABYLON.StandardMaterial("texture2", scene);
            board.material.diffuseColor = BABYLON.Color3.FromHexString('#000000');
            board.material.alpha = 0;

            board.checkCollisions = false;*/


            this.element = document.createElement('div');
            this.element.style.position = 'fixed';
            this.element.classList.add('zone-player');
            //element.innerHTML = 'xxx '+this.name;

            document.getElementById('zones').appendChild(this.element);


            boards.push({//todo DI
                mesh: this.mesh,
                element: this.element,
                top: 20
            });
            //todo meshes.push(board);





        }

        private _redrawBoard(){
            if(this.message){
                this.element.innerHTML = 'xxx '+this.message;
            }else{
                this.element.innerHTML = 'xxx '+this.name;
            }

        }




        public setName(name:string){
            this.name = name;
            this._redrawBoard();

        }




        public setPosition(position:BABYLON.Vector3,first=false){

            if(first) {
                this.mesh.position = position;
            }else{


                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    this.mesh,
                    "position",
                    30,//todo what is that
                    30 * 0.1,
                    this.mesh.position,
                    position,
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
                );


            }


        }


        public setRotation(rotation:BABYLON.Vector3){

            rotation.y += Math.PI/2;

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
            );

        }


        public setMessage(message:string){
            this.message = message;
            this._redrawBoard();
        }



        public destruct(){

            this.mesh.dispose();
            this.element.parentNode.removeChild(this.element);

        }






    }

}