/// <reference path="reference.ts" />


var world_selected;


function moveTo(x,y,rotation,world,storey,immediately=true) {


    if(world_selected !== world){
        r('Moving to new world "'+world+'" from world "'+world_selected+'"');

        document.getElementById("scene").focus();

        clearWorld();
        runWorld(objects.filterWorld(world));
        world_selected = world;


        immediately=true;

    }

    r(x,y,world,storey,rotation,immediately);


    /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    camera.position.x = x * -BLOCK_SIZE;
    camera.position.z = y * BLOCK_SIZE;*/


    var babylon_rotation = new BABYLON.Vector3(
        0,
        (180+rotation)/180*Math.PI,
        0
    );


    var level = BLOCKS_STOREYS_LEVELS[storey];

    var babylon_position = new BABYLON.Vector3(
        x * -BLOCK_SIZE,
        (level+EYE_VERTICAL) * BLOCK_SIZE,
        y * BLOCK_SIZE
    );

    moveToBabylon(babylon_position,babylon_rotation,immediately);

}





function moveToBegining(immediately=true){

    objects.filterTypes('label').forEach(function (label) {
        if(label.uri == '/'){

            moveTo(label.position.x,label.position.y,label.rotation/1,label.world,label.storey,immediately);
            return;

        }
    })

    throw new Error('There is no label with uri "/"!');
}





function moveToBabylon(babylon_position,babylon_rotation,immediately) {




    if(immediately){
        camera.position = babylon_position;
        camera.rotation = babylon_rotation;
        return;
    }


    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    BABYLON.Animation.CreateAndStartAnimation(
        "anim",
        camera,
        "position",
        30,
        60,
        camera.position,
        babylon_position,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
        easingFunction
    );


    //r(camera.rotation.y,babylon_rotation.y);
    function parseRadians(rad) {
        if(rad<0)rad+=Math.PI*2;
        if(rad>Math.PI*2)rad-=Math.PI*2;
        return rad;
    }


    camera.rotation.y  = parseRadians(camera.rotation.y);
    babylon_rotation.y = parseRadians(babylon_rotation.y);

    var diff =  camera.rotation.y - babylon_rotation.y;

    if(diff>Math.PI)camera.rotation.y-=Math.PI*2;
    if(diff<-Math.PI)camera.rotation.y+=Math.PI*2;


    BABYLON.Animation.CreateAndStartAnimation(
        "anim",
        camera,
        "rotation",
        30,
        60,
        camera.rotation,
        babylon_rotation,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
        easingFunction
    );


}
