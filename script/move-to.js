/**
 * Created by hejny on 21.7.16.
 */








function moveTo(x,y,rotation) {

    r(x,y,rotation);


    /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    camera.position.x = x * -BLOCK_SIZE;
    camera.position.z = y * BLOCK_SIZE;*/


    var babylon_rotation = new BABYLON.Vector3(
        0,
        ((-rotation-90+(360*2))%360)/180*Math.PI,//todo remove +90
        0
    );


    var babylon_position = new BABYLON.Vector3(
        x * -BLOCK_SIZE,
        camera.position.y,
        y * BLOCK_SIZE
    );


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


    r(camera.rotation.y,babylon_rotation.y);

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