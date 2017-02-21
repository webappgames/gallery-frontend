namespace GALLERY.Viewer {



    export class DeployFile{
        constructor(public name:string,public content:string|Blob){
        }
    }





    export function createZip(onDone) {


        let deployNotification = new PH.Notification('Deploy','Downloading files');



        let index;
        let screenshots;
        let media;


        index = new Promise(function(resolve, reject) {

            let deployFiles = [];

            var xhr = new XMLHttpRequest();
            xhr.open("GET", '/index-src.php');
            xhr.responseType = "text";

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

            resolve([]);
            /*
            var labels = objects.filterTypes('label');

            let width = canvas.width;
            let height = canvas.height;

            canvas.width = 1920;
            canvas.height = 1080;
            GALLERY.Viewer.makeScreenshots(labels, {precision: 1},function (screenshots) {




                let deployFiles = [];
                screenshots.forEach(function (screenshot,index) {

                    let label = labels.getAll()[index];//todo .getObjectByIndex(index);

                    let name = label.uri.split('/').join('-');
                    let screenshotName = 'screenshots/screenshot'+name+'.png';

                    label.screenshot = '/'+screenshotName;

                    deployFiles.push(new DeployFile(screenshotName,screenshot));
                    //deployFiles.push(new DeployFile(routeName,``));



                });


                canvas.width = width;
                canvas.height = height;

                //r(deployFiles);
                resolve(deployFiles);

            });

            /**/

        });




        media = new Promise(function(resolve, reject) {
            let sources = [

                //'viewer/index.html',
                '/viewer/style/viewer.css',
                //'viewer/script/lib/babylon.js',
                //'node_modules/handjs/hand.min.js',


                //'media/images/backgrounds/menu.png',
                //'media/images/backgrounds/page.png',

                //'media/images/ui/mouse-lock.png',
                //'media/images/ui/keys-text.png',


                /*'media/sound/link-key.mp3',
                'media/sound/link-teleport.mp3',
                'media/sound/link-key-none.mp3',
                'media/sound/gate-locked.mp3',
                'media/sound/step-stairs.mp3',
                'media/sound/step-ground.mp3',
                'media/sound/step-room.mp3',*/


                /*'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_ft.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_rt.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_up.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_bk.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_dn.jpg',
                'media/images/skyboxes/TropicalSunnyDay/TropicalSunnyDay_lf.jpg',*/


                '/media/images/other/eye.jpg',



                '/node_modules/react/dist/react.js',
                '/node_modules/react-dom/dist/react-dom.js',

                'https://code.jquery.com/jquery-2.2.4.min.js',
                'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js',
                'https://cdn.ravenjs.com/3.9.1/raven.min.js',
                '/node_modules/jszip/dist/jszip.min.js',
                '/node_modules/file-saver/FileSaver.min.js',
                '/node_modules/mustache/mustache.min.js',

                '/viewer/script/lib/babylon.js',
                '/node_modules/handjs/hand.min.js',
                //'http://www.babylonjs.com/hand.minified-1.2.js',
                //'http://www.babylonjs.com/babylon.js',


                '/viewer/script/viewer.js'

            ];


            let materials = [];
            objects.forEach(function (object) {
               if("material" in object){

                   materials.push(object.material);


               }
            });




            objects.filterTypes('environment').forEach(function (environment) {

                if(environment.ground!='none') {
                    materials.push(environment.ground);
                }

                if(environment.skybox!='none') {
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_ft.jpg');
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_rt.jpg');
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_up.jpg');
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_bk.jpg');
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_dn.jpg');
                    sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_lf.jpg');
                }


            });


            materials = materials.filter(function (material) {
                return(material.substr(0,1)!=='#');
            });


            sources = sources.concat(materials.map(function (material) {
                return '/media/images/textures/'+material+'.jpg';
            }));




            sources = sources.filter((v, i, a) => a.indexOf(v) === i);



            //r(sources);


            let promises = sources.map(function (url) {

                let responseType: string;


                if (url.substr(-3) == '.js') {

                    responseType = 'text';

                } else {

                    responseType = 'blob';

                }


                return new Promise(function(resolve, reject) {


                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.responseType = responseType;

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


            deployNotification.update('Creating zip file');


            let [index,screenshots,media] = results;
            let deployFiles = [].concat(screenshots,media);




            let jsFiles = deployFiles.filter(function (file) {
                return(file.name.substr(-3)=='.js');
            });

            deployFiles = deployFiles.filter(function (file) {
                return(file.name.substr(-3)!=='.js');
            });



            let scripts = jsFiles.map(function (file) {
                return file.content;
            });


            scripts.push(`
            $.get('/objects.compiled.json').done(function(response){
                GALLERY.Viewer.run(new GALLERY.Objects.CompiledArray(response));
            });
`);


            /*scripts.push(`(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v2.8&appId=602465393294706";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));`);*/


            let script = scripts.join(';/**/\n');


            //let gallery_folder = gallery_domain.split('.').join('-');


            let zip = new JSZip();
            //let zipRoot = zip.folder(gallery_folder);


            zip.file('script-bundle.js',script);
            zip.file('objects.compiled.json',JSON.stringify(objects.getAll().map(function (object) {

                let pureObject = {};
                for (var key in object) {
                    if(key.substr(0,1)!=='_'){
                        pureObject[key] = object[key];
                    }
                }

                return(pureObject);


            }),null,true));


            zip.file('.htaccess',`
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . / [L,QSA]
`);



            //r(deployFiles);

            deployFiles.forEach(function (deployFile) {
                zip.file(deployFile.name,deployFile.content);
            });





            let html = index[0].content;





            const COMMENT = /<!--((?!-->)(.|\s))*-->/g;
            const SCRIPT = /<script((?!script>)(.|\s))*script>/g;



            html = html.replace(SCRIPT, '');
            html = html.split('<!--GALLERY SCRIPT-->').join('<script src="/script-bundle.js" async></script>');
            html = html.replace(COMMENT, '');



            zip.file('index.php',html);




            zip.generateAsync({type:"blob"}).then(function(content){
                onDone(content,deployNotification);
            });





        }, function() {
            // one or more failed
        });


        //r(screenshots);

    }



    export function downloadZip(){
        createZip(function(content){
            let gallery_folder = analyticsObject.domain.split('.').join('-');
            saveAs(content, gallery_folder+".zip");
        });

    }




    export function deployToFTP(){

        createZip(function(content,deployNotification){



            var formData = new FormData();
            formData.append("update", content);

            formData.append("server",    deployObject.server);
            formData.append("username",  deployObject.username);
            formData.append("password",  deployObject.password);
            formData.append("directory", deployObject.directory);


            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'tools/ftp-deploy.php', true);


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




            /*var formData = new FormData();
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
            xhr.send(formData);*/




        });



    }






}

