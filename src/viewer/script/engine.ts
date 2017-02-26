/// <reference path="./reference.ts" />

module GALLERY.Viewer {


    export class EnginePlayReason{
        constructor(public name: string){
        }
    }



    export class Engine {

        public running = false;
        private enginePlayReasons:EnginePlayReason[] = [];

        public scene:BABYLON.Scene;
        public camera:BABYLON.Camera;
        public sun:BABYLON.Light;


        constructor(canvas:HTMLCanvasElement){


            let engine = new BABYLON.Engine(canvas, true, { /*stencil: true,*/ preserveDrawingBuffer: true });


            let scene_ = createScene(engine,canvas);
            this.scene = scene_.scene;
            this.camera = scene_.camera;
            this.sun = scene_.sun;


        }




        renderTick() {
            this.scene.render();
        }



        playEngine(enginePlayReason: EnginePlayReason): void{

            this.enginePlayReasons.push(enginePlayReason);
            this._enginePlayReasonsChanged();

        }


        pauseEngine(enginePlayReason: EnginePlayReason): void{


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
                engine.runRenderLoop(this.renderTick);
                this.running = true;
            }else {
                r('Pausing engine');
                engine.stopRenderLoop(this.renderTick);
                this.running = false;
            }
        }


    }


}


