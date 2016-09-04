/**
 * Created by hejny on 21.7.16.
 */
function moveTo(x, y, rotation, immediately) {
    r(x, y, rotation);
    /*camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    camera.position.x = x * -BLOCK_SIZE;
    camera.position.z = y * BLOCK_SIZE;*/
    var babylon_rotation = new BABYLON.Vector3(0, (180 + rotation) / 180 * Math.PI, 0);
    var babylon_position = new BABYLON.Vector3(x * -BLOCK_SIZE, camera.position.y, y * BLOCK_SIZE);
    moveToBabylon(babylon_position, babylon_rotation, immediately);
}
function moveToBabylon(babylon_position, babylon_rotation, immediately) {
    if (immediately) {
        camera.position = babylon_position;
        camera.rotation = babylon_rotation;
        return;
    }
    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("anim", camera, "position", 30, 60, camera.position, babylon_position, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, easingFunction);
    //r(camera.rotation.y,babylon_rotation.y);
    function parseRadians(rad) {
        if (rad < 0)
            rad += Math.PI * 2;
        if (rad > Math.PI * 2)
            rad -= Math.PI * 2;
        return rad;
    }
    camera.rotation.y = parseRadians(camera.rotation.y);
    babylon_rotation.y = parseRadians(babylon_rotation.y);
    var diff = camera.rotation.y - babylon_rotation.y;
    if (diff > Math.PI)
        camera.rotation.y -= Math.PI * 2;
    if (diff < -Math.PI)
        camera.rotation.y += Math.PI * 2;
    BABYLON.Animation.CreateAndStartAnimation("anim", camera, "rotation", 30, 60, camera.rotation, babylon_rotation, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, easingFunction);
}
//# sourceMappingURL=move-to.js.map