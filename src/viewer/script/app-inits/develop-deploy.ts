/// <reference path="../app" />


/// <reference path="../reference" />

d('develop-deploy');


module GALLERY.Viewer {



    export class DeployFile{
        constructor(public name:string,public content:string|Blob){
        }
    }






    export function createZip():Promise<Blob> {


        return new Promise(function(resolve, reject) {


            let deployNotification = new PH.Notification('Creating ZIP', 'Downloading files');


            let index;
            let screenshots;
            let media;


            index = new Promise(function (resolve, reject) {

                let deployFiles = [];

                var xhr = new XMLHttpRequest();
                xhr.open("GET", '/index-src.php');
                xhr.responseType = "text";

                xhr.onload = function () {

                    //r(this);

                    deployFiles.push(new DeployFile('index.php', this.response));

                    if (this.status == 200) {
                        resolve(deployFiles);

                    } else {
                        reject(deployFiles);
                    }


                };
                xhr.send();


            });


            screenshots = new Promise(function (resolve, reject) {

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


            media = new Promise(function (resolve, reject) {
                let sources = [

                    '/src/viewer/style/viewer.css',
                    '/dist/viewer.js',
                    '/dist/viewer.libs.js',



                ];


                let materials = [];
                objects.forEach(function (object) {
                    if ("material" in object) {

                        materials.push(object.material);


                    }
                });


                objects.filterTypes('environment').forEach(function (environment) {

                    if (environment.ground != 'none') {
                        materials.push(environment.ground);
                    }

                    if (environment.skybox != 'none') {
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_ft.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_rt.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_up.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_bk.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_dn.jpg');
                        sources.push('/media/images/skyboxes/' + environment.skybox + '/' + environment.skybox + '_lf.jpg');
                    }


                });


                materials = materials.filter(function (material) {
                    return (material.substr(0, 1) !== '#');
                });


                sources = sources.concat(materials.map(function (material) {
                    return '/media/images/textures/' + material + '.jpg';
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


                    return new Promise(function (resolve, reject) {


                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url);
                        xhr.responseType = responseType;

                        xhr.onload = function () {


                            let file = new DeployFile(url, this.response);

                            if (this.status == 200) {
                                resolve(file);

                            } else {
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

                Promise.all(promises).then(function (results) {
                    resolve(results);
                }, function () {
                    reject();
                });

            });


            //----------------------------------------------------------------


            Promise.all([index, screenshots, media]).then(function (results) {


                deployNotification.update('Creating zip file');


                let [index,screenshots,media] = results;
                let deployFiles = [].concat(screenshots, media);





                let zip = new JSZip();



                zip.file('objects.compiled.json', JSON.stringify(objects, null, 4));


                zip.file('.htaccess', `
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . / [L,QSA]
`);


                //r(deployFiles);

                deployFiles.forEach(function (deployFile) {
                    zip.file(deployFile.name, deployFile.content);
                });


                let html = index[0].content;


                const COMMENT = /<!--((?!-->)(.|\s))*-->/g;
                //const SCRIPT = /<script((?!script>)(.|\s))*script>/g;


                //html = html.replace(SCRIPT, '');
                //html = html.split('<!--GALLERY SCRIPT-->').join('<script src="/script-bundle.js" async></script>');
                html = html.replace(COMMENT, '');


                zip.file('index.php', html);


                zip.generateAsync({type: "blob"}).then(function (content) {
                    
                    resolve(content);
                    //onDone(content,deployNotification);


                });


            }).catch(function (reason) {
                reject(reason);
            });

        });
        //r(screenshots);

    }



    export function downloadZip(){
        createZip().then(function (content) {


            let gallery_folder = 'gallery';//todo gallery appname analyticsObject.domain.split('.').join('-');
            saveAs(content, gallery_folder+".zip");

        }).catch(function (reason) {

            console.warn(reason);

        });

    }




    export function deployToFTP(deployObject:Objects.Deploy){

        createZip().then(function(content){



            let deployNotification = new PH.Notification('Deploy', 'Starting');



            var formData = new FormData();
            formData.append("update", content);





            var xhr = new XMLHttpRequest();

            if(deployObject.deployType == 'ftp'){


                formData.append("server",    deployObject.server);
                formData.append("username",  deployObject.username);
                formData.append("password",  deployObject.password);
                formData.append("directory", deployObject.directory);
                xhr.open('POST', 'tools/ftp-deploy.php', true);


            }else
            if(deployObject.deployType == 'ssh'){


                formData.append("server",    deployObject.server);
                formData.append("username",  deployObject.username);
                formData.append("password",  deployObject.password);
                formData.append("directory", deployObject.directory);
                xhr.open('POST', 'tools/ssh-deploy.php', true);


            }else
            if(deployObject.deployType == 'gallery'){

                formData.append("gallery",  deployObject.gallery);
                formData.append("password",  deployObject.password);
                xhr.open('POST', deployObject.url, true);


            }else{
                throw new Error(`Unknown deploy type "${deployObject.deployType}".`);
            }



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

