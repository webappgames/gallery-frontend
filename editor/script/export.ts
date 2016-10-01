



/*function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
*/

/*
function download(filename, contentType, content)
{
    if(!contentType) contentType = 'application/octet-stream';
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}*/







namespace GALLERY.Editor{


    export function exportJSON(){

        saveAs(
            new Blob([JSON.stringify(objects.getAll(),null,4)], {type: "application/json;charset=utf-8"})
            , gallery+".json"
        );


        //download(gallery+'.json','application/json',JSON.stringify(objects.getAll(),null,4));

    }





    export function exportJSONCompiled(){

        compiled_objects = new GALLERY.Objects.CompiledArray.compile(objects);

        saveAs(
            new Blob([JSON.stringify(compiled_objects.getAll(),null,4)], {type: "application/json;charset=utf-8"})
            , gallery+".compiled.json"
        );


        //download(gallery+'.json','application/json',JSON.stringify(objects.getAll(),null,4));

    }


/*
    export function importJSON(){


    }
*/


}


