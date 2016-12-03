/// <reference path="reference.ts" />

namespace GALLERY.Viewer {

    export function onCollide(collidedMesh) {

        //r(collidedMesh);
        //collidedMesh.checkCollisions = false;


        if (['ground', 'room', 'stairs'].indexOf(collidedMesh.id) !== -1) {

            //on_air = false;

            //r('collide with '+collidedMesh.id);
            ion.sound.play("step-" + collidedMesh.id);
            return;
        }


        var object = objects.getObjectById(collidedMesh.name);
        if (object) {

            r('collide', object);

            if (object.type == 'link') {

                if (object.href.substr(0, 1) === '#') {

                    if (window.location.hash != object.href) {


                        GALLERY.Viewer.appState('/:' + object.id + object.href, true);

                        //window.location.hash = object.href;
                        //unlockGatesAndActivateKeys(object.href);

                        ion.sound.play("link-key");
                        //history.pushState(null, "Galerie", "bar.html");

                    }
                    /*else{

                     ion.sound.play("link-key-none");
                     }*/

                } else if (object.href.substr(0, 1) === '/') {

                    r('teleporting...');

                    objects.filterTypes('label').forEach(function (label) {

                        //r(object.uri,object.href);
                        if (label.uri == object.href) {


                            GALLERY.Viewer.appState(label.uri + window.location.hash);


                            //todo processStateFromLocation
                            //moveTo(label.position.x,label.position.y,parseInt(label.rotation),label.world,label.storey,true);
                            //ion.sound.play("link-teleport");


                        }


                    });


                } else if (object.href.substr(0, 4) === 'http') {

                    r('opening new tab...');

                    /*function openInNewTab(url) {
                     var win = window.open(url, '_blank');
                     win.focus();
                     }
                     openInNewTab(object.href);*/

                    Window.open(object.name, '<iframe src="' + object.href + '"></iframe>', function () {
                    }, 'NORMAL');
                    collidedMesh.dispose();


                }

                if (object.script) {

                    collidedMesh.dispose();

                    try {
                        eval(object.script);
                    }
                    catch (error) {
                        console.warn(error);
                    }


                }


                /*
                 //collidedMesh.dispose();
                 collidedMesh.checkCollisions = false;
                 collidedMesh.material.alpha=0.1;

                 setTimeout(function () {
                 collidedMesh.checkCollisions = true;
                 collidedMesh.material.alpha=1;
                 },1000);*/


            } else if (object.type == 'gate') {


                //camera.position.x -= Math.sin(camera.rotation.y)*5;
                //camera.position.z -= Math.cos(camera.rotation.y)*5;

                ion.sound.play("gate-locked");

            }


        } else {

            r('collide with ' + collidedMesh.name);

        }


    }


}