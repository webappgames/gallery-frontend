namespace GALLERY.Viewer{



    export var MODE = 'WEB';
    export var LOCKED = false;
    export var current_label = null;





    export function appState(location:string,standGround=false,immediately=true) {


        current_label = objects.filterTypes('label').findBy('uri',location);


        history.replaceState(null, "Gallery", location);//todo normal name
        history.pushState(null, "Gallery", location);//todo normal name
        GALLERY.Viewer.processStateFromLocation(/*window.document.location*/location,standGround,immediately);


    }

    export function appStateBack(standGround=false,immediately=true) {

        history.back();
        appState(window.document.location.toString(),standGround,immediately);

    }






    export function processStateFromLocation(location: string,standGround=false,immediately=true){

        r('Processing location...');

        let uri = new URI(location);
        let pathname = uri.pathname();



        let rootLabel = objects.filterTypes('label').findBy('uri','/');
        let label;


        /*if (pathname.substr(0, 2) === '/:') {

            let objectId = pathname.substr(2);
            label = objects.filterTypes('label').getObjectById(objectId);


        } else {*/

            label = objects.filterTypes('label').findBy('uri',pathname);

            if (!label) {
                label = rootLabel;
            }

        //}

        if(label == rootLabel){
            window.document.title = rootLabel.name;
        }else{
            window.document.title = label.name+' | '+rootLabel.name;
        }



        if(!standGround) {
            moveToObject(label,immediately);
        }


        unlockGatesAndActivateKeys(uri.hash());


        //r(uri);

    }




    export function appStateNext() {

        if(LOCKED == 'NEXT')return;


        let label = getAppStateLabel();
        let label_next = objects.filterTypes('label').findBy('uri',label.next);

        if(label_next) {

            LOCKED = 'NEXT';
            appState(label_next.uri, false, false);
        }
    }




    export function appStatePrevious() {

        if(LOCKED=='PREVIOUS')return;

        let label = getAppStateLabel();
        let label_previous = objects.filterTypes('label').findBy('next',label.uri);

        if(label_previous) {
            LOCKED = 'PREVIOUS';
            appState(label_previous.uri, false, false);
        }
    }



    export function appStateTurnLeft(){

        let babylon_rotation = new BABYLON.Vector3(
            0,
            camera.rotation.y - Math.PI/2,
            0
        );
        rotateToBabylon(babylon_rotation);

    }
    export function appStateTurnRight(){

        let babylon_rotation = new BABYLON.Vector3(
            0,
            camera.rotation.y + Math.PI/2,
            0
        );
        rotateToBabylon(babylon_rotation);

    }




    export function getAppStateLabel(){


        //r(objects.filterTypes('label'),window.document.location);


        return objects.filterTypes('label').findBy('uri',window.document.location.pathname);

    }




}

