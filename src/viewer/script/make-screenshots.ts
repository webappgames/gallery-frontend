/// <reference path="./reference.ts" />

module GALLERY.Viewer {


    export function makeScreenshots(labels: GALLERY.Objects.Array, options: Object, done, screenshots = []) {

        r('Making screenshot...');

        let label = labels.next();

        if (!label) {
            done(screenshots);
            return;
        }


        GALLERY.Viewer.appState(label.uri + window.location.hash);

        setTimeout(function () {

            BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, options, function (screenshot) {

                //r(screenshot);
                //saveAs(dataURItoBlob(screenshot),'screenshot.png');
                //sss;

                screenshots.push(dataURItoBlob(screenshot));
                //r('Screenshot created');
                makeScreenshots(labels, options, done, screenshots);


            });


        },40);




    }






}