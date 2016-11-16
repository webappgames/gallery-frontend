

namespace GALLERY.Viewer {


    export function makeScreenshots(labels: GALLERY.Objects.Array, options: Object, done, screenshots = []) {

        let label = labels.next();

        if (!label) {
            done(screenshots);
            return;
        }


        GALLERY.Viewer.appState(label.uri + window.location.hash);
        BABYLON.Tools.CreateScreenshot(engine, scene.activeCamera, options, function (screenshot) {

            screenshots.push(dataURItoBlob(screenshot));
            //r('Screenshot created');
            makeScreenshots(labels, options, done, screenshots);


        });

    }


}