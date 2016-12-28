

namespace GALLERY.Viewer {


    export class GameSync {


        private loop;

        constructor(public server:string, playerName:string, public camera, public scene, public playerMeshGenerator) {
        }

        public connect() {


            //todo connect to ws
            //todo listen to ws


            let xl, yl, zl;
            this.loop = setInterval(function () {


                let x = camera.position.x / -BLOCK_SIZE;
                let y = camera.position.z / BLOCK_SIZE;
                let z = camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;

                x = Math.round(x * 100) / 100;
                y = Math.round(y * 100) / 100;
                z = Math.round(z * 100) / 100;


                if (x != xl || y != yl || z != zl) {

                    xl = x;
                    yl = y;
                    zl = z;

                    //todo send

                }

            }, 300);


        }

        public disconnect(){
            //todo
        }

    }

}