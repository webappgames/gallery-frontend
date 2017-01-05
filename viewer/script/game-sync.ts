

namespace GALLERY.Viewer {


    export class GameSync {


        private _connected:boolean;
        private _loop;
        private _connection;
        private _gamePlayers;
        private _name;


        private _chatbox;


        constructor(public server:string, public camera, private scene) {
            this._connected = false;
            this._name = '';


            this._chatbox = document.createElement('div');
            this._chatbox.classList.add('chatbox');

            document.body.appendChild(this._chatbox);

        }

        public connect() {

            if(this._connected){
                console.warn('Already connected.');
                return;
            }


            this._connected = true;
            let self = this;

            //todo connect to ws
            //todo listen to ws

            this._connection = new WebSocket("ws://"+this.server);
            //r(this.ws);
            this._connection.onopen = function(){
                // Web Socket is connected, send data using send()
                //ws.send("Message to send");
                //alert("Message is sent...");
                self._connection.send(JSON.stringify({
                    gallery: window.location.hostname,
                    //name: self.playerName
                }));

            };

            this._gamePlayers = {};

            this._connection.onmessage = function (evt){
                //var received_msg = evt.data;
                //alert("Message is received...");


                let players = JSON.parse(evt.data);



                for(let player in players){


                    if(players[player]) {


                        if (!(player in self._gamePlayers)) {

                            self._gamePlayers[player] = new GamePlayer(self.scene);
                            r('Player '+player+' connected.');

                        }


                        if ("timestamp" in players[player]) {
                            self._gamePlayers[player].date = new Date(players[player].timestamp*1000);
                        }



                        if ("name" in players[player]) {
                            self._gamePlayers[player].setName(players[player].name);
                        }


                        if ("message" in players[player]) {

                            self._gamePlayers[player].setMessage(players[player].message);
                            self._addToChatbox(
                                self._gamePlayers[player].name,
                                self._gamePlayers[player].date,
                                players[player].message
                            );

                        }


                        if ("position" in players[player]) {
                            let _ = players[player].position;
                            let position = new BABYLON.Vector3(
                                _.x * -BLOCK_SIZE,
                                _.z * BLOCK_SIZE,
                                _.y * BLOCK_SIZE
                            );
                            self._gamePlayers[player].setPosition(position);
                        }


                        if ("rotation" in players[player]) {
                            self._gamePlayers[player].setRotation(new BABYLON.Vector3(
                                players[player].rotation.x,
                                players[player].rotation.y,
                                players[player].rotation.z
                            ));
                        }

                    }else{

                        r('Player '+player+' disconnected.');

                        self._gamePlayers[player].destruct();
                        delete self._gamePlayers[player];


                    }


                }


            };

            this._connection.onclose = function(){

                this.connected = false;
                clearInterval(self._loop);
                //alert("Closed");
            };






            let _last;
            this._loop = setInterval(function () {


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

                    self._connection.send(JSON.stringify({
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


        private _addToChatbox(playerName,date,message){


            var html = '';

            if(date){
                html += '<span class="date">['+dateToSmartString(date)+']</span>';
            }
            if(playerName){
                html += '<span class="name">['+playerName+']</span>';
            }
            if(message){
                html += '<span class="message">'+message+'</span>';
            }



            let message = document.createElement('p');
            message.innerHTML = html;
            this._chatbox.appendChild(message);
            if(this._chatbox.childNodes.length>8){
                this._chatbox.removeChild(this._chatbox.firstChild);

            }
        }



        public setName(name:string){
            this._name = name;
            this._connection.send(JSON.stringify({
                name: name
            }));
        }


        public getName(name:string){
            return(this._name);
        }


        public sendMessage(message:string){

            message = message.trim();
            this._addToChatbox(
                this._name,
                new Date(),
                message
            );

            this._connection.send(JSON.stringify({
                message: message
            }));
        }


        public disconnect(){

            //alert("Closing");
            this._connection.close();
            //todo
        }

    }

}