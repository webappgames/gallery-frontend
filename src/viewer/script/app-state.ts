/// <reference path="./reference" />

d('app-state');


module GALLERY.Viewer{



    export let MODE = 'WEB';
    export let LOCKED = false;
    export let current_label = null;



    export function currentLinks() {
        $('a').each(function () {

            if ($(this).attr('href') == window.document.location.pathname) {
                $(this).addClass('current');
            } else {
                $(this).removeClass('current');
            }
        });
    }
    currentLinks();





    export function appState(location:string,standGround=false,immediately=true) {


        current_label = objects.filterTypes('label').findBy('uri',location);


        history.replaceState(null, "Gallery", location);//todo normal name
        history.pushState(null, "Gallery", location);//todo normal name
        GALLERY.Viewer.processStateFromLocation(/*window.document.location*/location,standGround,immediately);

        currentLinks();
    }

    export function appStateBack(standGround=false,immediately=true) {

        history.back();
        appState(window.document.location.toString(),standGround,immediately);

    }






    export function processStateFromLocation(location: string,standGround=false,immediately=true){

        r('Processing location...',arguments);

        let uri = new Uri(location);
        let pathname = uri.path();



        let rootLabel = objects.filterTypes('label').findBy('uri','/');
        let label;



        if (pathname.substr(0, 2) === '/:') {

            let objectId = pathname.substr(2);
            let object = objects.getObjectById(objectId) as Objects.Label|Objects.Image;

            if(object instanceof Objects.Label){
                label = object;
            }else
            if(object instanceof Objects.Image){
                label = object.getVirtualLabel();
            }else{
                throw new Error(`App state string in format :id should be Label or Image.`);
            }

        } else {

            label = objects.filterTypes('label').findBy('uri',pathname);

            if (!label) {
                label = rootLabel;
            }

        }


        if(!label){
            r(objects.filterTypes('label'));
            throw new Error(`Label identified as "${pathname}" do not exists.`);
        }






        if(label == rootLabel || !label.name){
            window.document.title = rootLabel.name;
        }else{
            window.document.title = label.name+' | '+rootLabel.name;
        }



        if(!standGround) {
            moveToObject(label,immediately);
        }


        unlockGatesAndActivateKeys('#'+uri.anchor());


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
    export function appStateTurnBack(){

        let babylon_rotation = new BABYLON.Vector3(
            0,
            camera.rotation.y + Math.PI,
            0
        );
        rotateToBabylon(babylon_rotation);

    }




    export function getAppStateLabel(){


        //r(objects.filterTypes('label'),window.document.location);

        let pathname = window.document.location.pathname;
        return objects.filterTypes('label').findBy('uri',pathname);
        /*if(pathname.substr(0,2)=='/:'){
            //r(pathname.substr(2));
            return objects.findBy('id',pathname.substr(2));
        }else{
            return objects.filterTypes('label').findBy('uri',pathname);
        }*/

    }




}

