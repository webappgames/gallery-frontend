

namespace GALLERY.Viewer {


    export class GameSync {


        private connected:boolean;
        private loop;
        private ws;
        private gamePlayers;

        constructor(public server:string, public camera, private scene) {
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
                    //name: self.playerName
                }));

            };

            this.gamePlayers = {};

            this.ws.onmessage = function (evt){
                //var received_msg = evt.data;
                //alert("Message is received...");


                let players = JSON.parse(evt.data);



                for(let player in players){


                    if(players[player]) {


                        if (!(player in self.gamePlayers)) {

                            self.gamePlayers[player] = new GamePlayer(self.scene);
                            r('Player '+player+' connected.');

                        }


                        if ("name" in players[player]) {
                            self.gamePlayers[player].setName(players[player].name);
                        }


                        if ("message" in players[player]) {
                            self.gamePlayers[player].setMessage(players[player].message);
                        }


                        if ("position" in players[player]) {
                            let _ = players[player].position;
                            let position = new BABYLON.Vector3(
                                _.x * -BLOCK_SIZE,
                                _.z * BLOCK_SIZE,
                                _.y * BLOCK_SIZE
                            );
                            self.gamePlayers[player].setPosition(position);
                        }


                        if ("rotation" in players[player]) {
                            self.gamePlayers[player].setRotation(new BABYLON.Vector3(
                                players[player].rotation.x,
                                players[player].rotation.y,
                                players[player].rotation.z
                            ));
                        }

                    }else{

                        r('Player '+player+' disconnected.');

                        self.gamePlayers[player].destruct();
                        delete self.gamePlayers[player];


                    }


                }


            };

            this.ws.onclose = function(){

                this.connected = false;
                clearInterval(self.loop);
                //alert("Closed");
            };






            let _last;
            this.loop = setInterval(function () {


                let x = camera.position.x / -BLOCK_SIZE;
                let y = camera.position.z / BLOCK_SIZE;
                let z = camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;

                x = Math.round(x * 100) / 100;
                y = Math.round(y * 100) / 100;
                z = Math.round(z * 100) / 100;


                let _current = [
                    x,y,z,camera.rotation.x,camera.rotation.y,camera.rotation.z
                ].join(',');


                if (_last != _current) {

                    _last = _current;

                    self.ws.send(JSON.stringify({
                        position: {
                            x: x,
                            y: y,
                            z: z
                        },
                        rotation: {
                            x: camera.rotation.x,
                            y: camera.rotation.y,
                            z: camera.rotation.z
                        }
                    }));

                }

            }, 100);


        }

        public setName(name:string){
            this.ws.send(JSON.stringify({
                name: name
            }));
        }


        public sendMessage(message:string){
            this.ws.send(JSON.stringify({
                message: message
            }));
        }


        public disconnect(){

            //alert("Closing");
            this.ws.close();
            //todo
        }

    }

}