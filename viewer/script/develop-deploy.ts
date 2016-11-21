namespace GALLERY.Viewer {



    export class DeployFile{
        constructor(public name:string,public content:string|Blob){
        }
    }





    export function deploy() {


        let deployNotification = new PH.Notification('Deploy','Downloading files');



        let index;
        let screenshots;
        let media;


        index = new Promise(function(resolve, reject) {


            let deployFiles = [];
            deployFiles.push(new DeployFile('.htaccess',`
            
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . / [L,QSA]
`));


            var xhr = new XMLHttpRequest();
            xhr.open("GET", '/index-src.php');
            xhr.responseType = "blob";

            xhr.onload = function () {

                //r(this);

                deployFiles.push(new DeployFile('index.php',this.response));

                if(this.status == 200){
                    resolve(deployFiles);

                }else{
                    reject(deployFiles);
                }


            };
            xhr.send();



        };




        screenshots = new Promise(function(resolve, reject) {

            var labels = objects.filterTypes('label');
            GALLERY.Viewer.makeScreenshots(labels, {width:1920/2,height:1080/2},function (screenshots) {




                let deployFiles = [];
                screenshots.forEach(function (screenshot,index) {

                    let label = labels.getAll()[index];//todo .getObjectByIndex(index);

                    let name = label.uri.split('/').join('-');
                    let screenshotName = 'screenshots/screenshot'+name+'.png';

                    label.screenshot = '/'+screenshotName;

                    deployFiles.push(new DeployFile(screenshotName,screenshot));
                    //deployFiles.push(new DeployFile(routeName,``));



                });




                //r(deployFiles);
                resolve(deployFiles);

            });

        });






        media = new Promise(function(resolve, reject) {
            let sources = [

                //'viewer/index.html',
                'viewer/style/viewer.css',
                'viewer/script/lib/babylon.js',
                'node_modules/handjs/hand.min.js',
                'viewer/script/viewer.js',


                //'media/images/backgrounds/menu.png',
                //'media/images/backgrounds/page.png',

                'media/images/ui/mouse-lock.png',
                'media/images/ui/keys-text.png',


                'media/sound/link-key.mp3',
                'media/sound/link-teleport.mp3',
                'media/sound/link-key-none.mp3',
                'media/sound/gate-locked.mp3',
                'media/sound/step-stairs.mp3',
                'media/sound/step-ground.mp3',
                'media/sound/step-room.mp3',


                /*'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_ft.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_rt.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_up.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_bk.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_dn.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_lf.jpg',*/



            ];


            let materials = [];
            objects.forEach(function (object) {
               if("material" in object){

                   materials.push(object.material);


               }
            });




            objects.filterTypes('environment').forEach(function (environment) {


                materials.push(environment.ground);

                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_ft.jpg');
                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_rt.jpg');
                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_up.jpg');
                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_bk.jpg');
                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_dn.jpg');
                sources.push('media/images/skyboxes/'+environment.skybox+'/'+environment.skybox+'_lf.jpg');



            });


            materials = materials.filter(function (material) {
                return(material.substr(0,1)!=='#');
            });


            sources = sources.concat(materials.map(function (material) {
                return 'media/images/textures/'+material+'.jpg';
            }));




            sources = sources.filter((v, i, a) => a.indexOf(v) === i);



            //r(sources);


            let promises = sources.map(function (url) {

                let dataType: string;

                //r(url.substr(-4));
                if (['.mp3', '.jpg', '.png'].indexOf(url.substr(-4)) !== -1) {//todo better

                    dataType = 'binary';

                } else {

                    dataType = 'text';

                }


                return new Promise(function(resolve, reject) {


                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", '/' + url);
                    xhr.responseType = "blob";

                    xhr.onload = function () {


                        let file = new DeployFile(url,this.response);

                        if(this.status == 200){
                            resolve(file);

                        }else{
                            reject(file);
                        }


                    };
                    xhr.send();




                    /*$.ajax({url: '/' + url, dataType: dataType}).always(function (response) {


                        let file = new DeployFile(url,response.responseText);
                        r(this);
                        if(response.status == 200){
                            resolve(file);

                        }else{
                            reject(file);
                        }
                    });*/
                });


            });


            //r(promises);

            Promise.all(promises).then(function(results) {
                resolve(results);
            }, function() {
                reject();
            });

        });



        //----------------------------------------------------------------







        Promise.all([index,screenshots,media]).then(function(results) {

            r(results);

            deployNotification.update('Creating zip file');



            let deployFiles = [].concat(...results);


            //r(deployFiles);





            let gallery_folder = gallery_domain.split('.').join('-');


            let zip = new JSZip();
            //let zipRoot = zip.folder(gallery_folder);



            zip.file('objects.compiled.json',JSON.stringify(objects.getAll(),null,true));



            //r(deployFiles);

            deployFiles.forEach(function (deployFile) {
                zip.file(deployFile.name,deployFile.content);
            });



            /*screenshots.forEach(function (screenshot,index) {
                zipScreenshots.file(index+'.png',screenshot);
            });


            media.forEach(function (file,index) {
                zipMedia.file(index+'.png',file);
            });*/





            zip.generateAsync({type:"blob"}).then(function(content) {
                // see FileSaver.js
                //saveAs(content, gallery_folder+".zip");


                //r(content);




                var formData = new FormData();
                formData.append("gallery", content);

                formData.append("password", gallery_password);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://'+gallery_domain+'/.gallery/update.php', true);


                xhr.upload.onprogress = function(e) {

                    if (e.lengthComputable) {
                        let percentComplete = (e.loaded / e.total) * 100;
                        percentComplete = Math.floor(percentComplete);
                        deployNotification.update('Uploading zip file '+percentComplete + '%' );
                    }
                };


                deployNotification.update('Uploading');

                xhr.onload = function() {
                    if (this.status == 200) {
                        deployNotification.update('Finished');
                    }else{
                        deployNotification.update('Error while uploading');
                    }
                };
                xhr.send(formData);






            });





        }, function() {
            // one or more failed
        });











        //r(screenshots);





























    }


}

