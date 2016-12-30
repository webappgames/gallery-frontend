

namespace GALLERY.Viewer {


    export class GameSync {


        private connected:boolean;
        private loop;
        private ws;
        private playerMeshes;

        constructor(public server:string, playerName:string, public camera, private scene) {
            this.connected = false;
        }

        public connect() {

            if(this.connected){
                console.warn('Already connected.');
                return;
            }


            this.connected = true;
            let self = this;

            //todo connect to ws
            //todo listen to ws

            this.ws = new WebSocket("ws://"+this.server);
            //r(this.ws);
            this.ws.onopen = function(){
                // Web Socket is connected, send data using send()
                //ws.send("Message to send");
                //alert("Message is sent...");
                self.ws.send(JSON.stringify({
                    gallery: window.location.hostname,
                    name: self.playerName
                }));

            };

            this.playerMeshes = {};

            this.ws.onmessage = function (evt){
                //var received_msg = evt.data;
                //alert("Message is received...");


                let players = JSON.parse(evt.data);



                for(let player in players){


                    let _ = players[player].position;
                    let position = new BABYLON.Vector3(
                        _.x * -BLOCK_SIZE,
                        _.z * BLOCK_SIZE,
                        _.y * BLOCK_SIZE
                    );



                    if(!(player in self.playerMeshes)){

                        self.playerMeshes[player] = new PlayerMesh(
                            players[player].name,
                            players[player].message,
                            position,
                            self.scene,
                        );

                    }else{

                        self.playerMeshes[player].setPosition(position);

                    }



                }


            };

            this.ws.onclose = function(){

                this.connected = false;
                clearInterval(self.loop);
                //alert("Closed");
            };






            //let xl, yl, zl;
            this.loop = setInterval(function () {


                let x = camera.position.x / -BLOCK_SIZE;
                let y = camera.position.z / BLOCK_SIZE;
                let z = camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;

                x = Math.round(x * 100) / 100;
                y = Math.round(y * 100) / 100;
                z = Math.round(z * 100) / 100;


                /*if (x != xl || y != yl || z != zl) {

                    xl = x;
                    yl = y;
                    zl = z;*/

                    //todo send
                    self.ws.send(JSON.stringify({
                        position: {
                            x: x,
                            y: y,
                            z: z
                        }
                    }));

                //}

            }, 100);


        }

        public disconnect(){

            //alert("Closing");
            this.ws.close();
            //todo
        }

    }

}