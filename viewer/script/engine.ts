/// <reference path="reference.ts" />


namespace GALLERY.Viewer {




    export class EnginePlayReason{
        constructor(public name: string){
        }
    }


    export let engineRunning = false;
    export let enginePlayReasons = [];



    export function renderTick() {
        scene.render();
    }


    function _enginePlayReasonsChanged(){
        if(enginePlayReasons.length>0) {

            let enginePlayReasonsNames = enginePlayReasons.map(function (enginePlayReason) {
                return(enginePlayReason.name);
            }).join(' and ');

            r('Starting engine because of '+enginePlayReasonsNames+'.');
            engine.runRenderLoop(renderTick);
            engineRunning = true;
        }else {
            r('Pausing engine');
            engine.stopRenderLoop(renderTick);
            engineRunning = false;
        }
    }


    export function playEngine(enginePlayReason: EnginePlayReason): void{

        enginePlayReasons.push(enginePlayReason);
        _enginePlayReasonsChanged();

    }

    export function pauseEngine(enginePlayReason: EnginePlayReason): void{


        enginePlayReasons = enginePlayReasons.filter(function (enginePlayReason_) {
            return(enginePlayReason!=enginePlayReason_);
        });

        setTimeout(_enginePlayReasonsChanged,100);

    }



    //==================================================================================================================



    export let canvas;
    export let engine;
    export let scene;
    export let camera;
    export let sun;



    canvas = document.getElementById("scene");
    engine = new BABYLON.Engine(canvas, true, { /*stencil: true,*/ preserveDrawingBuffer: true });


    let scene_ = createScene(engine,canvas);
    scene = scene_.scene;
    camera = scene_.camera;
    sun = scene_.sun;


    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
        renderTick();
    });


    BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed() ,
        function() {
        }, function() {
        });




}


