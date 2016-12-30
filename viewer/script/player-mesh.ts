/// <reference path="reference.ts" />


namespace GALLERY.Viewer {


    export class PlayerMesh{

        private name:string;
        private message:string;
        private mesh;


        constructor(private name:string, message:string, position:BABYLON.Vector3, private scene){

            this.mesh = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

            this.setMessage(message);
            this.setPosition(position);


        }

        public setPosition(position:BABYLON.Vector3,first=false){

            if(first) {
                this.mesh.position = position;
            }else{


                BABYLON.Animation.CreateAndStartAnimation(
                    "anim",
                    this.mesh,
                    "position",
                    30,
                    30 * 0.1,
                    this.mesh.position,
                    position,
                    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
                );


            }


        }

        public setMessage(message:string){
            this.message = message;
        }







    }

}