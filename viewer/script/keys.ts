/// <reference path="reference.ts" />


namespace GALLERY.Viewer {
    const controls_keys = {
        'UP': [38, 87],
        'DOWN': [40, 83],
        'LEFT': [37, 65],
        'RIGHT': [39, 68],
        'JUMP': [32],
        //'REFRESH': [80],
        'PRINTSCR': [80],
        'CHAT': [13],


    };

    let merged_keys = [];
    for(let keyName in controls_keys){
        controls_keys[keyName].forEach(function (key) {
            merged_keys.push(key);
        });

    }



//------------------------------------------------------------


    window.addEventListener('keydown', function (e) {

        if(merged_keys.indexOf(e.keyCode)!=-1){

            e.preventDefault();
            r('Pressed ket '+e.keyCode+' - prevented default.');

        }


        // space and arrow keys
        /*if ([32, 37, 38, 39, 40].indexOf(e.keyCode) != -1) {

            //if(T.UI.Status.focusOnMap()){
            e.preventDefault();
            //}


        }*/
    }, false);

//------------------------------------------------------------

    var keys = [];
    var moving = false;


    var controls_down = {
        update: function () {
            for (var control in controls_keys) {

                this[control] = false;

                for (var i = 0, l = keys.length; i < l; i++) {

                    if (controls_keys[control].indexOf(keys[i]) !== -1) {

                        this[control] = true;

                    }

                }

            }
        }
    };


    window.addEventListener('keydown', function (e) {

        //if(T.UI.Status.focusOnMap()) {
        r('DOWN', e.keyCode);

        if (keys.indexOf(e.keyCode) === -1) {
            keys.push(e.keyCode);

            controls_down.update();

        }
        //}

    });

    window.addEventListener('keyup', function (e) {

        //if(T.UI.Status.focusOnMap()) {
        //r('UP', e.keyCode);

        var i = keys.indexOf(e.keyCode);


        if (i != -1) {
            keys.splice(i, 1);

            controls_down.update();

        }
        //}

    });


    var last = null;
    var keys_tick = function (timestamp) {

        if (!last) last = timestamp;
        var progress = (timestamp - last) / 1000;
        last = timestamp;

        //if(window_opened)return;


        /*

         if (controls_down.UP) {


         ion.sound.play("step");

         //camera.position.x += Math.sin(camera.rotation.y)*5;
         //camera.position.z += Math.cos(camera.rotation.y)*5;

         }


         if (controls_down.DOWN) {

         //camera.position.x -= Math.sin(camera.rotation.y)*5;
         //camera.position.z -= Math.cos(camera.rotation.y)*5;

         }
         */


        /*if (controls_down.LEFT) {
         camera.rotation.y -= SPEED_ROTATION*progress;
         if(camera.rotation.y<0){
         camera.rotation.y+=Math.PI*2;
         }
         }


         if (controls_down.RIGHT) {
         camera.rotation.y += SPEED_ROTATION*progress;
         if(camera.rotation.y>Math.PI*2){
         camera.rotation.y-=Math.PI*2;
         }
         }*/


        if (controls_down.JUMP) {

            if (GALLERY.Viewer.develop) {
                camera.position.y += 1.6;
            }


            //on_air=true;

            //if(!on_air) {
            //camera.position.y += 1.6;
            //}
            /*if(camera.position.y<15){
             movement.z = 5;
             }*/

        }


        /*if (controls_down.REFRESH) {

         runGallery(objects);

         }*/


        if (controls_down.PRINTSCR) {

            controls_down.PRINTSCR = false;
            r('print_scr');

            //r(scene,scene.engine, scene.camera);
            BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, {
                precision: 1,
                //width: 3840,
                //height: 2160
            }, function (screenshot) {

                let filename = "screenshot-4K-gallery-" + (new Date()) + ".png";
                /*r('print_scr_ready');

                 function downloadURI(uri, name) {
                 var link = document.createElement("a");
                 link.download = name;
                 link.href = uri;
                 document.body.appendChild(link);
                 link.click();
                 document.body.removeChild(link);
                 delete link;
                 }

                 downloadURI(screenshot, filename);*/


                saveAs(dataURItoBlob(screenshot), filename);


            });


        }



        if (controls_down.CHAT) {

            controls_down.CHAT = false;
            r('chat');


            Window.open('herni mod'
                , `
            <input type="text" id="player-message" />
                    `, function () {}, 'SMALL');


            document.getElementById('player-message').focus();

            /*let _MODE = MODE;
            let message = prompt('Say:');
            r(_MODE);
            if(_MODE=='GAME'){


                setTimeout(function () {
                    gameModeStart();
                },100);

            }*/


            if(message){
                gameSync.sendMessage(message);
            }


        }




        requestAnimationFrame(keys_tick);
    };
    requestAnimationFrame(keys_tick);

}
//var on_air = true;


