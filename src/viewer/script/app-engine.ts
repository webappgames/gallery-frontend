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

            console.log(scene_);



            this.scene = scene_.scene;
            this.camera = scene_.camera;
            this.sun = scene_.sun;



        }




        renderTick() {
            //r(this);
            //r(this.scene);
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

            setTimeout(this._enginePlayReasonsChanged.bind(this),100);

        }




        private _enginePlayReasonsChanged(){
            if(this.enginePlayReasons.length>0) {

                let enginePlayReasonsNamesMap = this.enginePlayReasons.reduce(function (reasons,enginePlayReason) {

                    reasons[enginePlayReason.name] = reasons[enginePlayReason.name] || 0;
                    reasons[enginePlayReason.name]++;

                    return reasons;


                },{});


                //r(enginePlayReasonsNamesMap);

                let enginePlayReasonsNamesArray = [];


                for(let reason in enginePlayReasonsNamesMap){
                    let count = enginePlayReasonsNamesMap[reason];

                    if(count==1){
                        enginePlayReasonsNamesArray.push(reason);
                    }else{
                        enginePlayReasonsNamesArray.push(count+'x '+reason);
                    }

                }

                //r(enginePlayReasonsNamesArray);

                r('Starting engine because of '+enginePlayReasonsNamesArray.join(' and ')+'.');
                this.engine.stopRenderLoop();
                this.engine.runRenderLoop(this.renderTick.bind(this));
                this.running = true;
            }else {
                r('Pausing engine');
                this.engine.stopRenderLoop();
                this.running = false;
            }
        }


    }


}


