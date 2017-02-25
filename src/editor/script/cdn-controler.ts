namespace TOWNS.CDN{

    
    const URL='http://cdn.pavolhejny.com/';
    const FILE_ACCEPTED_TYPES=[
        'image/jpeg'
        ,'image/jpg'
        ,'image/gif'
        ,'image/png'
        //todo maybe bmp? sync with towns-cdn
    ];
    const FILE_MAX_SIZE = 25 * Math.pow(1024, 2/*MB*/) * 0.9;
    const REQUEST_MAX_SIZE = FILE_MAX_SIZE*10;

    
    

    export function uploadFiles(files,onProgress,onDone,onFail){

        // process all File 05-objects
        var formData = new FormData();
        var files_key = {};
        var request_size=1024;//todo is it OK?
        //var filenames = [];
        for (let i = 0; i < files.length; i++) {

            if(FILE_ACCEPTED_TYPES.indexOf(files[i].type)==-1){

                onFail('Můžete nahrávat pouze obrázky.');
                return;
                //Message.error('Můžete nahrávat pouze obrázky.');
                //throw new Error('Not allowed filetype.');
            }

            if(files[i].size>FILE_MAX_SIZE){


                onFail('Celková velikost jednoho souboru může být maximálně'+' '+bytesToSize(FILE_MAX_SIZE));
                return;
                //alert('Jeden nebo více souborů jsou moc velké.');
                //throw new Error('File too big');
            }

            request_size+=files[i].size;

            var key='image'+i;

            formData.append(key, files[i]);
            files_key[key] = files[i];

            //filenames.push(files[i].name);

        }   //r(files_key);
        //filenames = filenames.join(', ');



        if(request_size>REQUEST_MAX_SIZE){

            //alert('Soubory jsou moc velké.');
            onFail('Celková velikost všech souborů může být maximálně '+' '+bytesToSize(REQUEST_MAX_SIZE));
            return;

        }


        // now post a new XHR request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', URL);



        //var message = Message.info();



        xhr.upload.onprogress = function (event) {

            if (event.lengthComputable) {
                let progress = (event.loaded / event.total * 100 | 0);
                onProgress(progress);
                //message.text('Nahráno '+filenames+' '+complete+'%');

            }

        };

        xhr.onload = function () {
            if (xhr.status === 200) {

                try{

                    console.log('all done: ' + xhr.status);

                    var responseObject=(JSON.parse(xhr.response));


                    let responseArray = [];
                    let index: number;
                    for(let key in responseObject){

                        index = parseInt(key.split('image').join(''));
                        responseArray[index] = responseObject[key];
                    }


                    onDone(responseArray);
                    return;

                    //save();

                }catch(error){



                    onFail('Chyba při nahrávání.');
                    throw error;
                    return;
                    //message.text('Chyba při nahrávání ','error').close();
                    //console.log('Error when processing data...');
                    //r(e);

                }


            } else {

                onFail('Chyba při nahrávání (HTTP status = '+xhr.status+').');
                return;
                //console.log('Something went terribly wrong...');

            }
        };
        xhr.send(formData);
    }
    
}