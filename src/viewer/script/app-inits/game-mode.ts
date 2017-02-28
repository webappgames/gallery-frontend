/// <reference path="../app" />
/// <reference path="./game-sync" />

/// <reference path="../reference" />


module GALLERY.Viewer {


    console.log(GalleryApp);
    GalleryApp.prototype.gameMode = function(){


        alert('GameMode');

    };




    export function gameMode(){


        Window.open('Herní mód'//todo use mustache
            , `
        
            <p>
            V herním módu se budete moci pohybovat galerií zcela volně pomocí <b>myši</b> a kláves <span class="inline-key">W</span><span class="inline-key">A</span><span class="inline-key">S</span><span class="inline-key">D</span> nebo <b>šipek</b>. Také budete vidět další připojené "hráče" a oni vás, proto musíte zadat své jméno nebo přezdívku. Pomocí klávesy <span class="inline-key">Enter</span> můžete psát zprávy.
            </p>
          
            
            <div>
            <label>
                Vaše jméno:
                <input type="text" id="player-name" value="`+gameSync.getName()+`" placeholder="např.: Jan Novák, tester123,..." />
            </label>
            
         
            
            <button onclick="Window.close(true);">
                Začít
            </button>
             </div>
            
            

        `, function (status) {

                if(status){

                    GALLERY.Viewer.gameModeStart(window.document.getElementById('player-name').value);

                }




            }, 'SMALL');


    }


    //let playerName:string;

    export function gameModeStart(playerName?:string){
        //Window.close();
        canvas.requestPointerLock();
        r('canvas.requestPointerLock();');

        if(typeof playerName === 'string'){
            gameSync.setName(playerName);
        }

        //playerName = _playerName;
    }


    const enginePlayReasonGameMode = new AppEnginePlayReason('game mode');







    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    const WS_SERVER = 'webappgames.com:1357';
    export let gameSync = new GameSync(WS_SERVER,camera,scene);
    //gameSync.connect();
    //play(enginePlayReasonGameMode);





    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", mouseMove, false);

            canvas.focus();
            //pointer_lock.innerHTML='Web mode';
            //$hints.hide();
            //pointer_lock.style.display = 'none';
            $('.game-mode').css('opacity','0.2');
            wasd.style.display = 'block';


            MODE = 'GAME';
            camera.angularSensibility = MOUSE_ANGULAR_SENSIBILITY;
            appEngine.play(enginePlayReasonGameMode);
            //triggerMouseEvent (canvas, "mousedown");

            gameSync.connect();


        } else {
            console.log('The pointer lock status is now unlocked');
            document.removeEventListener("mousemove", mouseMove, false);

            //pointer_lock.innerHTML='Game mode';
            //$hints.show();

            //pointer_lock.style.display = 'block';
            $('.game-mode').css('opacity','1');
            wasd.style.display = 'none';

            camera.detachControl(canvas);

            setTimeout(function () {
                camera.attachControl(canvas);
            }, IMMEDIATELY_MS);

            //$(canvas).trigger('mouseup');

            MODE = 'WEB';
            camera.angularSensibility = -MOUSE_ANGULAR_SENSIBILITY;
            //pause(enginePlayReasonGameMode);

            /*gameSync.disconnect();*/
        }


    }










    function mouseMove(e) {

        //r('mousemove');

        var movementX = e.movementX ||
            e.mozMovementX ||
            0;

        var movementY = e.movementY ||
            e.mozMovementY ||
            0;


        camera.rotation.y += (movementX / 10) / 180 * Math.PI;
        camera.rotation.x += (movementY / 10) / 180 * Math.PI;


    }

    /**/


}