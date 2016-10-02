


namespace GALLERY.Viewer.Effects{

    export function nuke(){



        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.5;
        scene.fogColor = BABYLON.Color3.FromHexString('#ffffff');


        scene.registerBeforeRender(function () {

            scene.fogDensity = scene.fogDensity * 0.995;
        });


        ion.sound.play("nuke");
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