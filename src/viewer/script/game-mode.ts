/// <reference path="reference.ts" />
/// <reference path="game-sync" />


namespace GALLERY.Viewer {



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


    const enginePlayReasonGameMode = new EnginePlayReason('game mode');


    //let pointer_lock = document.getElementById("pointer-lock");
    let wasd = document.getElementById("wasd");
    //var $hints = $('.hints');


    canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock;





    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    const WS_SERVER = 'webappgames.com:1357';
    export let gameSync = new GameSync(WS_SERVER,camera,scene);
    //gameSync.connect();
    //playEngine(enginePlayReasonGameMode);


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
            playEngine(enginePlayReasonGameMode);
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
            //pauseEngine(enginePlayReasonGameMode);

            /*gameSync.disconnect();*/
        }


    }






    window.addEventListener('keydown', function (e) {
        if (
            camera.keysUp.indexOf(e.keyCode) != -1 ||
            camera.keysDown.indexOf(e.keyCode) != -1 ||
            camera.keysLeft.indexOf(e.keyCode) != -1 ||
            camera.keysRight.indexOf(e.keyCode) != -1
        ) {
            $(wasd).fadeOut();
            //wasd.style.display = 'none';
        }
    }, false);





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