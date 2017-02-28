/// <reference path="./reference" />

d('app-engine');


module GALLERY.Viewer {


    export class AppEnginePlayReason{
        constructor(public name: string){
        }
    }



    export class AppEngine {

        public running = false;
        private enginePlayReasons:AppEnginePlayReason[] = [];

        public engine:BABYLON.Engine;
        public scene:BABYLON.Scene;
        public camera:BABYLON.Camera;
        public sun:BABYLON.Light;


        constructor(canvas:HTMLCanvasElement){


            this.engine = new BABYLON.Engine(canvas, true, { /*stencil: true,*/ preserveDrawingBuffer: true });


            let scene_ = createScene(this.engine,canvas);
            this.scene = scene_.scene;
            this.camera = scene_.camera;
            this.sun = scene_.sun;


        }




        appEngine.renderTick() {
            this.scene.render();
        }



        play(enginePlayReason: AppEnginePlayReason): void{

            this.enginePlayReasons.push(enginePlayReason);
            this._enginePlayReasonsChanged();

        }


        pause(enginePlayReason: AppEnginePlayReason): void{


            this.enginePlayReasons = this.enginePlayReasons.filter(function (enginePlayReason_) {
                return(enginePlayReason!=enginePlayReason_);
            });

            setTimeout(this._enginePlayReasonsChanged,100);

        }




        private _enginePlayReasonsChanged(){
            if(this.enginePlayReasons.length>0) {

                let enginePlayReasonsNames = this.enginePlayReasons.map(function (enginePlayReason) {
                    return(enginePlayReason.name);
                }).join(' and ');

                r('Starting engine because of '+enginePlayReasonsNames+'.');
                this.engine.runRenderLoop(this.renderTick);
                this.running = true;
            }else {
                r('Pausing engine');
                this.engine.stopRenderLoop(this.renderTick);
                this.running = false;
            }
        }


    }


}


