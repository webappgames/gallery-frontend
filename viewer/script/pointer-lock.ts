/// <reference path="reference.ts" />


var pointer_lock = document.getElementById("pointer-lock");


canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;



pointer_lock.onclick = function(e) {

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
    if(document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        //document.addEventListener("mousemove", mouseMove, false);

        canvas.focus();
        pointer_lock.innerHTML='<p>Esc</p>';

        //triggerMouseEvent (canvas, "mousedown");


    } else {
        console.log('The pointer lock status is now unlocked');
        //document.removeEventListener("mousemove", mouseMove, false);

        pointer_lock.innerHTML='<p><i class="fa fa-arrows" aria-hidden="true"></i></p>';


        camera.detachControl(canvas);

        setTimeout(function () {
            camera.attachControl(canvas);
        },IMMEDIATELY_MS);

        //$(canvas).trigger('mouseup');

    }



}


/*
function mouseMove (e) {

    r('mousemove');

    var movementX = e.movementX ||
        e.mozMovementX          ||
        0;

    var movementY = e.movementY ||
        e.mozMovementY      ||
        0;


    camera.rotation.y+=(movementX/10)/180*Math.PI;
    camera.rotation.x+=(movementY/10)/180*Math.PI;


}*/