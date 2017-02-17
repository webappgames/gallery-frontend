/// <reference path="reference.ts" />



//----------------------------------------------------------------------




// file drop
document.addEventListener("dragover", function(e){
    e.preventDefault();

}, false);



document.addEventListener("dragleave", function(e){
    e.preventDefault();

}, false);






function setImageWidth(src:string,object:GALLERY.Objects.Object,height:number,onDone) {//todo promise

    var image = new Image();
    image.src = src;


    image.onload = function(){

        /*let object = objects.getObjectById(id);
        if(!object){
            throw new Error('There is no object with id '+id);
        }*/

        let width = (this.width * height) / this.height;
        object.width = width;
        r('setting image width',object);

        onDone();

        save();

    };

}





document.addEventListener("drop", function(e){
    e.preventDefault();


    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    //r(files);
    if(files.length==0){
        r('Shit dropped.');
        return;
    }

    r(files);


    //r(files[0].name.substr(-5));
    if(files.length == 1 && files[0].name.substr(-5)== '.json'){

        //alert('json');


        var reader = new FileReader();
        reader.onloadend = function(e) {


            var new_objects = JSON.parse(this.result);


            if(confirm('Chcete importovat '+new_objects.length+' objektů a přepsat vše ostatní?')) {
                objects = new GALLERY.Objects.Array(new_objects);
                saveAndRedraw();
            }



        };
        reader.readAsText(files[0]);

        return;

    }


    let position = getPositionFromLeftTop(e.clientX,e.clientY);


    let filesArray = [];
    for (let i = 0; i < files.length; i++) {
        filesArray.push(files[i]);
    }


    filesArray.forEach(function (file) {

        let filename = file.name;
        let message = Message.info(filename+': Nahrávání...');

        TOWNS.CDN.uploadFiles(
            [file]
            ,function(progress){
                message.text(filename+': '+progress+'%');

            }
            ,function(response){







                let url = response[0];



                let object;
                objects.push(object = new GALLERY.Objects.Image({
                    id: createGuid(),
                    type: 'image',
                    position:position,
                    storey: storey_selected,
                    world: world_selected,
                    name: file.name,
                    src: url,
                    height: 2,
                    rotation: 0,
                    onGround: false,
                    hasAlpha: false,
                    isEmitting: true,
                    name: '',
                    uri: ''

                }));


                message.text(filename+': Nastavování velikosti obrázku');


                setImageWidth(url,object,2,function () {

                    message.text(filename+': Hotovo','success').close();


                });


                //position={x:position.x,y:position.y+2};



                createMap();



            },function(errorMessage){

                console.warn('error while uploading', errorMessage);
                message.text(filename+': '+errorMessage,'error');


            }
        );


    });






    //-----------------






}, false);

//});

