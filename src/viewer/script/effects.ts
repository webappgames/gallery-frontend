/// <reference path="./reference.ts" />


module GALLERY.Viewer.Effects{

    export function nuke(){



        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.5;
        scene.fogColor = BABYLON.Color3.FromHexString('#ffffff');




        running = true;
        scene.registerBeforeRender(function () {

            if(!running)return;

            scene.fogDensity = scene.fogDensity * 0.995;

            if(scene.fogDensity<0.02){
                scene.fogDensity=0.02;
                running = false;
            }


        });


        setTimeout(function () {
            ion.sound.play("nuke");
        },300);
        /*var easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);


        BABYLON.Animation.CreateAndStartAnimation(
            "anim",
            scene,
            "fogDensity",
            30,
            60,
            camera.position,
            0.02,

            BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
            easingFunction
        );*/


    }


}