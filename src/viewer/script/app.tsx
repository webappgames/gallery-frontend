/// <reference path="app-state.ts" />
//-/ <reference path="@types/raven-js">
//-/ <reference path="@types/jqueryui">

/// <reference path="./reference.ts" />



module GALLERY.Viewer{



    interface appOptions {
        mode: string;
        state: string;
        deployObject?: Objects.Deploy;
        analyticsObject?: Objects.Analytics;
    }


    export class app{


        private state: string;
        private develop: boolean;
        private engine: Engine;


        constructor(
            private objects:Objects.Array,
            private containerElement: HTMLElement,
            private options: appOptions,
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



            objects = compiled_objects;
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




            this.engine = new Engine(containerElement.getElementsByTagName('canvas')[0]);






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