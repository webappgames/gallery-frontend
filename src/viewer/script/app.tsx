

//-/ <reference types="raven-js>
/// <reference path="./components/app" />
/// <reference path="./app-engine" />

/// <reference path="./reference" />

d('app');



module GALLERY{
    //todo refactor this shitty code below
    export let objects: Objects.CompiledArray;
    export let canvas: HTMLCanvasElement;
    export let appEngine: Viewer.AppEngine;
    export let camera: BABYLON.FreeCamera;
    export let scene: BABYLON.Scene;
    export let sun: BABYLON.Light;
    export let develop: boolean;
    export let deployObjects: Objects.Array;
    export let analyticsObject: Objects.Analytics;
}





module GALLERY.Viewer{


    interface AppOptions {
        mode: string;
        state: string;
        deployObjects?: Objects.Array;
        analyticsObject?: Objects.Analytics;
    }




    export class GalleryApp{


        private state: string;
        private develop: boolean;
        private appEngine: AppEngine;


        constructor(
            private objects:Objects.CompiledArray,
            private containerElement: HTMLElement,
            public options: AppOptions,
            private onStateChange: (state: string) => any,
        ){


            if (!BABYLON.Engine.isSupported()) {
                //todo
            }
            if(!(this.objects instanceof Objects.Array)){
                throw new Error('Creating GalleryApp: Param "objects" should be instance of GALLERY.Objects.CompiledArray.');
            }
            if(!(this.containerElement instanceof HTMLElement)){
                throw new Error('Creating GalleryApp: Param "containerElement" should be instance of HTMLElement.');
            }
            if(options.mode=='develop'){
                if(!(options.deployObjects||null)){
                    throw new Error('Missing "option.deployObjects".');
                }
                /*if(!(options.analyticsObject||null)){
                    throw new Error('Missing "option.analyticsObject".');
                }*/
            }

            //todo check all other public APIs



            this.develop = options.mode=='develop';
            r('Running gallery with '+objects.length+' objects in '+(this.develop?'develop':'production')+' mode.');



            objects.forEach( (object) => {
                object.registerApp(this);
            });



            ReactDOM.render(<Components.App app={this}/>,containerElement,function () {
                r('App component rendered');
            });


            let canvas = containerElement.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
            this.appEngine = new AppEngine(canvas);



            //todo refactor this shitty code below
            GALLERY.objects = this.objects;
            GALLERY.canvas = canvas;
            GALLERY.appEngine = this.appEngine;
            GALLERY.camera = this.appEngine.camera;
            GALLERY.scene = this.appEngine.scene;
            GALLERY.sun = this.appEngine.sun;
            GALLERY.develop = this.develop;
            GALLERY.deployObjects = this.options.deployObjects;
            GALLERY.analyticsObject = this.options.analyticsObject;









            if(this.develop) {
                if (options.deployObject) {
                    r(options.deployObject);
                } else {
                    console.warn('Deploy object is missing in develop mode!');
                }
                if (options.analyticsObject) {
                    r(options.analyticsObject);
                } else {
                    console.warn('Analytics object is missing in develop mode!');
                }
            }


            if(this.develop){
            }else{
                //runStats();

                //todo Raven.config('https://71d6fb2b651845dea3ef3861e8df529d@sentry.io/122195').install({});

            }




            fpsMeterInit(this.appEngine);
            GamePlayerInit(this.appEngine.scene);






            this.setState(options.state);
            //appState(window.document.location.toString());



        }


        isDevelop():boolean{
            return this.develop;
        }


        getState():string{
            return(this.state);
        }


        get engine():AppEngine{
            return this.appEngine;
        }


        setState(state:string,standGround=false,immediately=true){


            appState(state,standGround,immediately);
            this.state = state;



        }

        resize(){
            this.appEngine.engine.resize();
        }






    }


}
