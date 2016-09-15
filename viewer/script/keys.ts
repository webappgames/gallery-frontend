/// <reference path="reference.ts" />


var controls_keys={
    'UP':  [38,87],
    'DOWN':  [40,83],
    'LEFT':  [37,65],
    'RIGHT':  [39,68],
    'JUMP': [32],
    'REFRESH': [80]


};

//------------------------------------------------------------




window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {

        //if(T.UI.Status.focusOnMap()){
            e.preventDefault();
        //}


    }
}, false);

//------------------------------------------------------------

var keys=[];
var moving=false;


var controls_down = {
    update: function () {
        for (var control in controls_keys) {

            this[control] = false;

            for (var i = 0, l = keys.length; i < l; i++) {

                if(controls_keys[control].indexOf(keys[i]) !== -1) {

                    this[control] = true;

                }

            }

        }
    }
};




window.addEventListener('keydown', function(e) {

    //if(T.UI.Status.focusOnMap()) {
        //r('DOWN', e.keyCode);

        if (keys.indexOf(e.keyCode) === -1) {
            keys.push(e.keyCode);

            controls_down.update();

        }
    //}

});

window.addEventListener('keyup', function(e) {

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
    var progress = (timestamp - last)/1000;
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





    if (controls_down.LEFT) {
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
    }

    if (controls_down.JUMP) {

        camera.position.y+=1.6;
       /*if(camera.position.y<15){
           movement.z = 5;
       }*/

    }



    if (controls_down.REFRESH) {

        runGallery(objects);

    }




    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);



