/**
 * @author Towns.cz
 * @fileOverview  Key controls - eg. arrows, wasd,...
 */
//======================================================================================================================


var controls_keys={
    'UP':  [38,87],
    'DOWN':  [40,83],
    'LEFT':  [37,65],
    'RIGHT':  [39,68]


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
    r('DOWN', e.keyCode);

    if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode);

        controls_down.update();

    }
    //}

});

window.addEventListener('keyup', function(e) {

    //if(T.UI.Status.focusOnMap()) {
    r('UP', e.keyCode);

    var i = keys.indexOf(e.keyCode);


    if (i != -1) {
        keys.splice(i, 1);

        controls_down.update();

    }
    //}

});

var speed = 10;


var last = null;
var keys_tick = function (timestamp) {

    if (!last) last = timestamp;
    var progress = (timestamp - last)/1000;
    last = timestamp;

    //if(window_opened)return;






     if (controls_down.UP) {

         window_center.y += speed;
         $admin_world.css('top','+='+speed+'px');

     }


     if (controls_down.DOWN) {

         window_center.y -= speed;
         $admin_world.css('top','-='+speed+'px');

     }




    if (controls_down.LEFT) {

        window_center.x += speed;
        $admin_world.css('left','+='+speed+'px');

    }


    if (controls_down.RIGHT) {

        window_center.x -= speed;
        $admin_world.css('left','-='+speed+'px');

    }



    if(controls_down.UP || controls_down.DOWN || controls_down.LEFT || controls_down.RIGHT){

        moving = true; drawing=false;

    }else{
        if(moving){
            moving=false;
            $admin_world.css('top','0px');
            $admin_world.css('left','0px');
            createMap();

        }

    }





    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);


