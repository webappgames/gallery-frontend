/// <reference path="reference.ts" />


function onCollide(collidedMesh) {

    //r(collidedMesh);
    //collidedMesh.checkCollisions = false;


    if(['ground','room','stairs'].indexOf(collidedMesh.id) !== -1){

        ion.sound.play("step-"+collidedMesh.id);
        return;
    }



    var object = objects.getObjectById(collidedMesh.name);
    if(object){

        //r('collide',object);

        if(object.type=='link'){

            if(object.href.substr(0,1)==='#') {

                if (window.location.hash != object.href){

                    window.location.hash = object.href;
                    unlockGatesAndActivateKeys();

                    ion.sound.play("link-key");
                    //history.pushState(null, "Galerie", "bar.html");

                }/*else{

                    ion.sound.play("link-key-none");
                }*/

            }else
            if(object.href.substr(0,1)==='/') {

                r('teleporting...');

                objects.filterTypes('label').forEach(function (label) {

                    //r(object.uri,object.href);
                    if(label.uri == object.href){

                        moveTo(label.position.x,label.position.y,parseInt(label.rotation),label.world,label.storey,true);
                        ion.sound.play("link-teleport");


                    }


                });


            }



            /*
            //collidedMesh.dispose();
            collidedMesh.checkCollisions = false;
            collidedMesh.material.alpha=0.1;

            setTimeout(function () {
                collidedMesh.checkCollisions = true;
                collidedMesh.material.alpha=1;
            },1000);*/


        }else
        if(object.type=='gate'){


            //camera.position.x -= Math.sin(camera.rotation.y)*5;
            //camera.position.z -= Math.cos(camera.rotation.y)*5;

            ion.sound.play("gate-locked");

        }



    }else{

        r('collide with '+collidedMesh.name);

    }





};