/// <reference path="reference.ts" />




//var TOWNS_CDN_URL='http://towns-cdn.local/';
var TOWNS_CDN_URL='http://cdn.pavolhejny.com/';
var TOWNS_CDN_FILE_ACCEPTED_TYPES=[
    'image/jpeg'
    ,'image/jpg'
    ,'image/gif'
    ,'image/png'
    //todo maybe bmp? sync with towns-cdn
];
var TOWNS_CDN_FILE_MAX_SIZE = 25 * Math.pow(1024, 2/*MB*/);
var TOWNS_CDN_REQUEST_MAX_SIZE = TOWNS_CDN_FILE_MAX_SIZE*10;



//----------------------------------------------------------------------




// file drop
document.addEventListener("dragover", function(e){
    e.preventDefault();

}, false);



document.addEventListener("dragleave", function(e){
    e.preventDefault();

}, false);






function setImageWidth(src,id,height) {

    var image = new Image();
    image.src = src;


    image.onload = function(){

        let object = objects.getObjectById(id);

        let width = (this.width * height) / this.height;
        object.width = width;
        r('setting image width',object);

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



    // process all File 05-objects
    var formData = new FormData();
    var files_key = {};
    var request_size=1024;//todo is it OK?
    var filenames = [];
    for (var i = 0; i < files.length; i++) {

        if(TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type)==-1){

            Message.error('Můžete nahrávat pouze obrázky.');
            throw new Error('Not allowed filetype.');
        }

        if(files[i].size>TOWNS_CDN_FILE_MAX_SIZE){

            //alert('Jeden nebo více souborů jsou moc velké.');
            Message.error('Celková velikost jednoho souboru může být maximálně'+' '+bytesToSize(TOWNS_CDN_FILE_MAX_SIZE));
            throw new Error('File too big');
        }

        request_size+=files[i].size;

        var key='image'+i;

        formData.append(key, files[i]);
        files_key[key] = files[i];

        filenames.push(files[i].name);

    }   //r(files_key);
    filenames = filenames.join(', ');



    if(request_size>TOWNS_CDN_REQUEST_MAX_SIZE){

        //alert('Soubory jsou moc velké.');
        Message.error('Celková velikost všech souborů může být maximálně '+' '+bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE));
        throw new Error('Request too big');

    }


    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', TOWNS_CDN_URL);



    var message = Message.info();



    xhr.upload.onprogress = function (event) {

        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            message.text('Nahráno '+filenames+' '+complete+'%');

        }

    };

    xhr.onload = function () {
        if (xhr.status === 200) {

            try{

                console.log('all done: ' + xhr.status);
                r(e);

                var position = getPositionFromLeftTop(e.clientX,e.clientY);
                r(position);

                var response=(JSON.parse(xhr.response));

                
                var object;
                for (var key in files_key) {


                    objects.push(object = {
                        id: createGuid(),
                        type: 'image',
                        position:position,
                        storey: storey_selected,
                        name: files_key[key].name,
                        src: response[key],
                        height: 2,
                        rotation: 0,
                        onGround: false,
                        hasAlpha: false,
                        isEmitting: true,
                        name: '',
                        uri: ''

                    });


                    setImageWidth(response[key],object.id,2);


                    position={x:position.x,y:position.y+2};

                }


                createMap();
                message.text('Nahráno '+filenames+' 100%','success').close();

                //save();

            }catch(e){

                message.text('Chyba při nahrávání ','error').close();


                console.log('Error when processing data...');
                r(e);

            }


        } else {

            console.log('Something went terribly wrong...');

        }
    };
    xhr.send(formData);

    //-----------------






}, false);

//});

