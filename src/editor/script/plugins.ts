/// <reference path="reference" />





function runGenerator(generatorFunction){



    var images = objects.filter(function (object) {
        return(object.type==='image');
    });

    //r(images);

    var new_objects = generatorFunction(images);

    objects = new_objects;


    save();
    createMap();



}