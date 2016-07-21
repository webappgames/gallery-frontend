/**
 * Created by hejny on 21.7.16.
 */








function moveTo(x,y,rotation) {

    r(x,y,rotation);


    camera.rotation.y = -Math.PI/2 - rotation/180*Math.PI;
    camera.position.x = x * -BLOCK_SIZE;
    camera.position.z = y * BLOCK_SIZE;


}