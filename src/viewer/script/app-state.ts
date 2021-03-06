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


        observers.forEach(function (observerOnChange) {
            observerOnChange();
        });

    }



    let observers=[];
    export function observeAppState(onChange:()=>{} ){
        observers.push(onChange);
        onChange();
    }



    export function appStateBack(standGround=false,immediately=true) {

        history.back();
        appState(window.document.location.toString(),standGround,immediately);

    }






    export function processStateFromLocation(location: string,standGround=false,immediately=true){

        r('Processing location...',arguments);



        const pathname =  new Uri(location).path();
        r(pathname);


        const rootLabel = objects.filterTypes('label').findBy('uri','/');


        let object: Objects.Object;


        if (pathname.substr(0, 2) === '/:') {
            object = objects.getObjectById(pathname.substr(2));
        } else {
            object = objects.createWithVirtual().filterTypes('label').findBy('uri',pathname);

            if(!object){
                throw new Error(`App state should refer to existing or virtual label.`);
            }
        }





        let label:Objects.Label;

        if(object instanceof Objects.Label){
            label = object;
        }else
        if(object instanceof Objects.Image){
            label = object.getVirtualLabel();
        }else{
            r(object);
            throw new Error(`App state should refer to Label or Image.`);
        }


        /*if (!label) {
            label = rootLabel;
        }*/



        if(!label){
            r(objects.createWithVirtual().filterTypes('label'));
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


        unlockGatesAndActivateKeys('#'+ new Uri(location).anchor());


        //r(uri);

    }



    export function appStateParent() {

        let current = getAppStateLabel();

        r(current);
        if (current.parent && current.parent !== 'none') {

            //r('Going to parent');
            GALLERY.Viewer.appState(current.parent, false, false);
        } else if (current.next && current.next !== 'none') {
            //todo context menu
            //GALLERY.Viewer.appState(current.next, false, false);
        }


    }



    export function appStateNext() {

        if(LOCKED == 'NEXT')return;


        let label = getAppStateLabel();
        let label_next = objects.createWithVirtual().filterTypes('label').findBy('uri',label.next);

        if(label_next) {

            LOCKED = 'NEXT';
            appState(label_next.uri, false, false);
        }
    }




    export function appStatePrevious() {

        if(LOCKED=='PREVIOUS')return;

        let label = getAppStateLabel();
        let label_previous = objects.createWithVirtual().filterTypes('label').findBy('next',label.uri);

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



    export function getAppState(){
        return window.document.location.pathname;
    }


    export function getAppStateLabel():Objects.Label{
        return objects.createWithVirtual().filterTypes('label').findBy('uri',getAppState()) as Objects.Label;

    }




}

