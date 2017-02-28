/// <reference path="./components/app" />
/// <reference path="./app-engine" />

/// <reference path="./reference" />



module GALLERY.Viewer{



    import Camera = BABYLON.Camera;
    interface AppOptions {
        mode: string;
        state: string;
        deployObject?: Objects.Deploy;
        analyticsObject?: Objects.Analytics;
    }


    export let objects: Objects.CompiledArray;
    export let canvas: HTMLCanvasElement;
    export let appEngine: AppEngine;
    export let camera: BABYLON.Camera;
    export let scene: BABYLON.Scene;






    export class GalleryApp{


        private state: string;
        private develop: boolean;
        private appEngine: AppEngine;


        constructor(
            private objects:Objects.Array,
            private containerElement: HTMLElement,
            private options: AppOptions,
            private onStateChange: (state: string) => any,
        ){


            if (!BABYLON.Engine.isSupported()) {
                //todo
            }



            this.develop = options.mode=='develop';


            ReactDOM.render(
                <Components.App/>
                ,containerElement
            );



            //objects = compiled_objects;
            r('Running gallery with '+objects.getAll().length+' objects in '+(this.develop?'develop':'production')+' mode.');

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
                //showStats();
                developMenu();
                $('.develop-menu').draggable();

            }else{
                //runStats();

                Raven.config('https://71d6fb2b651845dea3ef3861e8df529d@sentry.io/122195').install({});

            }



            //todo better name for engine wrapper
            this.appEngine = new AppEngine(containerElement.getElementsByTagName('canvas')[0]);



            fpsMeterInit(this.appEngine);
            GamePlayerInit(this.appEngine.scene);



            objects = this.objects;
            canvas = document.getElementById('scene');//this.canvas;
            appEngine = this.appEngine;
            camera = this.appEngine.camera;
            scene = this.appEngine.scene;






            this.setState(options.state);
            //appState(window.document.location.toString());



        }



        getState():string{
            return(this.state);
        }


        setState(state:string){

            this.state = state;


        }

        resize(){
            //todo
        }






    }


}