/// <reference path="reference.ts" />


namespace GALLERY.Viewer {


    export class PlayerMesh{

        private name:string;
        private message:string;
        private mesh;


        constructor(private name:string, message:string, position:BABYLON.Vector3, private scene){

            this.mesh = BABYLON.Mesh.CreateSphere("player", 16, 2, scene);

            this.mesh.material = new BABYLON.StandardMaterial("Mat", scene);

            this.mesh.material.diffuseTexture = new BABYLON.Texture('/media/images/other/eye.jpg', scene);
            this.mesh.material.diffuseTexture.uScale = 1;
            this.mesh.material.diffuseTexture.vScale = 1;



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
        }







    }

}