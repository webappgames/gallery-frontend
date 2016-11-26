





namespace GALLERY.Viewer{





    document.onwheel = function(event) {


        if(MODE == 'WEB'/* && !LOCKED*/) {

        if (event.deltaY > 0) {

            appStateNext();


        } else if (event.deltaY < 0) {

            appStatePrevious();

        }


        }


    };





}