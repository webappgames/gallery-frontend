/// <reference path="reference.ts" />


namespace GALLERY.Viewer {




    let pointer_lock = document.getElementById("pointer-lock");
    let wasd = document.getElementById("wasd");
    //var $hints = $('.hints');


    canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock;


    //canvas.requestPointerLock();
    pointer_lock.onclick = function (e) {

        e.preventDefault();
        //setTimeout(//todo is there a better solution?
        //    function () {
        canvas.requestPointerLock();
        //    }, IMMEDIATELY_MS
        //);

    };


// Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    function lockChangeAlert() {
        if (document.pointerLockElement === canvas ||
            document.mozPointerLockElement === canvas) {
            console.log('The pointer lock status is now locked');
            document.addEventListener("mousemove", mouseMove, false);

            canvas.focus();
            //pointer_lock.innerHTML='Web mode';
            //$hints.hide();
            pointer_lock.style.display = 'none';
            wasd.style.display = 'block';


            MODE = 'GAME';
            //triggerMouseEvent (canvas, "mousedown");


        } else {
            console.log('The pointer lock status is now unlocked');
            document.removeEventListener("mousemove", mouseMove, false);

            //pointer_lock.innerHTML='Game mode';
            //$hints.show();

            pointer_lock.style.display = 'block';
            wasd.style.display = 'none';

            camera.detachControl(canvas);

            setTimeout(function () {
                camera.attachControl(canvas);
            }, IMMEDIATELY_MS);

            //$(canvas).trigger('mouseup');

            MODE = 'WEB';

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