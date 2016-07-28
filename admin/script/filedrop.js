


//var TOWNS_CDN_URL='http://towns-cdn.local/';
var TOWNS_CDN_URL='http://cdn.pavolhejny.com/';
var TOWNS_CDN_FILE_ACCEPTED_TYPES=[
    'image/jpeg'
    ,'image/jpg'
    ,'image/gif'
    ,'image/png'
    //todo maybe bmp? sync with towns-cdn
];
var TOWNS_CDN_FILE_MAX_SIZE = 7 * Math.pow(1024, 2/*MB*/);
var TOWNS_CDN_REQUEST_MAX_SIZE = 11047955;



//----------------------------------------------------------------------




// file drop
document.addEventListener("dragover", function(e){
    e.preventDefault();

}, false);



document.addEventListener("dragleave", function(e){
    e.preventDefault();

}, false);






function setImageWidth(file,object,height) {

    var reader = new FileReader();
    reader.onload = function (event) {

        var image = new Image();
        image.src = event.target.result;


        image.onload = function(){

            var width = (this.width * height) / this.height;
            object.width = width;
            r(object);

        };

    };

    reader.readAsDataURL(file);

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

    // process all File objects
    var formData = new FormData();
    var files_key = {};
    var request_size=1024;//todo is it OK?
    for (var i = 0; i < files.length; i++) {

        if(TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type)==-1){

            T.UI.Message.error(T.Locale.get('upload error only images'));
            throw new Error('Not allowed filetype.');
        }

        if(files[i].size>TOWNS_CDN_FILE_MAX_SIZE){

            alert('Jeden nebo více souborů jsou moc velké.');
            //T.UI.Message.error(T.Locale.get('upload error max filesize')+' '+bytesToSize(TOWNS_CDN_FILE_MAX_SIZE));
            throw new Error('File too big');
        }

        request_size+=files[i].size;

        var key='image'+i;

        formData.append(key, files[i]);
        files_key[key] = files[i];

    }   //r(files_key);

    if(request_size>TOWNS_CDN_REQUEST_MAX_SIZE){

        alert('Soubory jsou moc velké.');
        //T.UI.Message.error(T.Locale.get('upload error max requestsize')+' '+bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE));
        throw new Error('Request too big');

    }


    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', TOWNS_CDN_URL);


    xhr.upload.onprogress = function (event) {

        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            //message.text(T.Locale.get('upload progress')+' '+complete+'%');

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
                        name: files_key[key].name,
                        src: response[key],
                        height: 2,
                        rotation: 0,
                        name: '',
                        uri: ''

                    });


                    setImageWidth(files_key[key],object,2);


                    position={x:position.x,y:position.y+2};

                }


                createMap();




            }catch(e){

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

