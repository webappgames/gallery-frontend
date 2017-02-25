/// <reference path="reference.ts" />


namespace GALLERY.Viewer {


    if (window.location.hash == '#preview') {


        var compiled_objects = new Objects.CompiledArray(JSON.parse(localStorage.getItem('preview-compiledObjects')));


        var analyticsObject = JSON.parse(localStorage.getItem('preview-analyticsObject'));
        if (analyticsObject) {
            analyticsObject = new Objects.Analytics(analyticsObject);
        }


        var deployObject = JSON.parse(localStorage.getItem('preview-deployObject'));
        if (deployObject) {
            deployObject = new Objects.Deploy(deployObject);
        }


        Viewer.run(compiled_objects, true, deployObject, analyticsObject);
    }


}
