/// <reference path="../reference.ts" />





module GALLERY.Viewer{





    document.onwheel = function(event) {


        if(MODE == 'WEB'/* && !LOCKED*/) {

        if (event.deltaY > 0) {

            appStateNext();


        } else if (event.deltaY < 0) {

            appStatePrevious();

        }


        }else{

            /*if (event.deltaY > 0) {
                camera.fov -=0.01;
            } else if (event.deltaY < 0) {
                camera.fov +=0.01;
            }

            r('FOV is now '+camera.fov);*/

        }


    };





}