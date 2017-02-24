



namespace GALLERY.Viewer{

    export var running = false;
    export var develop=false;
    export var deployObject='';
    export var analyticsObject='';

    export function run(compiled_objects: GALLERY.Objects.CompiledArray, develop_=false, deployObject_=null,analyticsObject_=null){

        //r(compiled_objects);aaa;

        running = true;
        develop = develop_;
        deployObject = deployObject_;
        analyticsObject = analyticsObject_;


        objects = compiled_objects;
        r('Running gallery with '+objects.getAll().length+' objects in '+(develop?'develop':'production')+' mode.');

        if(deployObject){
            r(deployObject);
        }else{
            console.warn('Deploy object is missing!');
        }
        if(analyticsObject){
            r(analyticsObject);
        }else{
            console.warn('Analytics object is missing!');
        }



        if(develop){
            //showStats();
            developMenu();

            $('.develop-menu').draggable();
        }else{
            //runStats();

            Raven.config('https://71d6fb2b651845dea3ef3861e8df529d@sentry.io/122195').install({});

        }








        /*
        todo
        var $zones = $('#zones');
        $zones.html('');

        objects.filterTypes('zone').forEach(function (zone) {

            let $zone = $('<div></div>');
            $zone.addClass('zone');
            $zone.attr('id','zone-'+zone.id);
            //$zone.css('display','none');
            $zone.html(zone.html);

            $zones.append($zone);


        });*/







        //r('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //r($zones.html());






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






}