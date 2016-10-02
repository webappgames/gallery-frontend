



namespace GALLERY.Viewer{

    export var running = false;

    export function run(compiled_objects: GALLERY.Objects.CompiledArray){

        running = true;

        objects = compiled_objects;
        r('Running gallery with '+objects.getAll().length+' objects.');







        window.onpopstate = function(event) {
            //r("location: " + document.location + ", state: " + JSON.stringify(event.state));
            processStateFromLocation(window.document.location);

        };


        appState(window.document.location.toString());
        //processStateFromLocation(window.document.location);





        //console.log(getStateFromLocation(document.location.toString()));
        /*alert("location: " + document.location);
        history.pushState({page: 1}, "title 1", "?page=1");
        history.pushState({page: 2}, "title 2", "?page=2");
        history.replaceState({page: 3}, "title 3", "?page=3");
        history.back(); // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
        history.back(); // alerts "location: http://example.com/example.html, state: null
        history.go(2);  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}
        */



    }





    export function appState(location:string,standGround=false) {


        history.replaceState(null, "Gallery", location);//todo normal name
        history.pushState(null, "Gallery", location);//todo normal name
        GALLERY.Viewer.processStateFromLocation(window.document.location,standGround);



    }

    export function appStateBack(location,standGround=false) {

        history.back();
        appState(window.document.location.toString());

    }






    export function processStateFromLocation(location: string,standGround=false){

        r('Processing location...');

        let uri = new URI(location);
        let pathname = uri.pathname();


        if(!standGround) {
            if (pathname.substr(0, 2) === '/:') {

                let objectId = pathname.substr(2);
                moveToObject(objects.getObjectById(objectId));


            } else {

                if (!moveToURI(pathname)) {
                    moveToURI('/');
                }

            }
        }


        unlockGatesAndActivateKeys(uri.hash());


        //r(uri);

    }


}