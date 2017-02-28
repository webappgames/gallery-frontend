/// <reference path="../reference" />



var r = console.log.bind(console);
var d = console.log.bind(console,'Declaration: ');






/*
var lastContext='';


function r(...args:any[]){





    if(typeof args[0] === 'string' && args.length==2){

        let currentContext = args[0];


        if(currentContext && currentContext !== lastContext) {

            if (lastContext){
                console.groupEnd();
            }

            console.groupCollapsed(currentContext);

            lastContext = currentContext;
        }
    }


    console.log.call(console,...args);
}





function d(moduleName:string){


    r.call(console,'Declaration: ',moduleName);
    //console.groupCollapsed();


}*/