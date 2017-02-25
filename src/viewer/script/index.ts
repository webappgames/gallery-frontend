/// <reference path="../../shared/script/shared.ts" />
/// <reference path="./viewer.ts" />




if (window.location.hash == '#preview') {


    var compiled_objects = new GALLERY.Objects.CompiledArray(JSON.parse(localStorage.getItem('preview-compiledObjects')));


    var analyticsObject = JSON.parse(localStorage.getItem('preview-analyticsObject'));
    if (analyticsObject) {
        analyticsObject = new GALLERY.Objects.Analytics(analyticsObject);
    }


    var deployObject = JSON.parse(localStorage.getItem('preview-deployObject'));
    if (deployObject) {
        deployObject = new GALLERY.Objects.Deploy(deployObject);
    }







    let viewerApp = GALLERY.Viewer.App(
        compiled_objects,
        document.getElementById('app'),
        {
            mode: 'develop',
            state: location.toString(),
            deployObject:deployObject,
            analyticsObject: analyticsObject
        },
        function (newState) {
            //...
        }
    );



    viewerApp.setState('/',true,true);
    viewerApp.getState();







}


