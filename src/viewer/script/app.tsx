

/// <reference types="raven-js>
/// <reference path="./components/app" />
/// <reference path="./app-engine" />

/// <reference path="./reference" />

d('app');



module GALLERY.Viewer{


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
            private objects:Objects.CompiledArray,
            private containerElement: HTMLElement,
            private options: AppOptions,
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
            //todo check all other public APIs



            this.develop = options.mode=='develop';
            r('Running gallery with '+objects.getAll().length+' objects in '+(this.develop?'develop':'production')+' mode.');




            ReactDOM.render(<Components.App/>,containerElement,function () {
                r('App component rendered');
            });


            r(containerElement);
            r(containerElement.getElementsByTagName('canvas'));
            this.appEngine = new AppEngine(containerElement.getElementsByTagName('canvas')[0] as HTMLCanvasElement);





            //todo refactor this shitty code below
            Viewer.objects = this.objects;
            Viewer.canvas = document.getElementById('scene');//this.canvas;
            Viewer.appEngine = this.appEngine;
            Viewer.camera = this.appEngine.camera;
            Viewer.scene = this.appEngine.scene;








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






            fpsMeterInit(this.appEngine);
            GamePlayerInit(this.appEngine.scene);






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
