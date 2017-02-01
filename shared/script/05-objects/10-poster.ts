/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Poster extends Image{

        public posterHtml:string;
        public posterDesign:string;
        public voxelPixelRatio:number;

        private _posterElement;

        constructor(object){

            super(object);

            this.posterHtml = this.posterHtml || '';
            this.posterDesign = this.posterDesign || 'board';


            this.src = this.src || 'http://cdn.pavolhejny.com/?file=5888cb789f36f-M2Q5OGMxNTk1N2M1ZjVkZDIyN2U1M2RiYzdjYmI2MGQuanBn';
            this.width = this.width || 1;
            this.height = this.height || 1;
            this.voxelPixelRatio = this.voxelPixelRatio || 10;


        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'posterHtml': return('<textarea></textarea>');
                case 'posterDesign': return('<input type="text" />');
                case 'voxelPixelRatio': return('<input type="number" />');
                default:  return(super.getEditorInputHtml(key));
            }

        }



        /*getSrc(width=0,ratio=0,rotation=0):string{

            html2canvas($('body')[0], {
                onrendered: function(canvas) {
                    canvas.toDataURL();
                }
            });

        }*/



        createPosterElement(container){
            let posterElement = document.createElement('div');
            posterElement.innerHTML = this.posterHtml;
            posterElement.classList.add('zone-'+this.posterDesign);

            //posterElement.style.border = '2px solid red';
            //posterElement.style.backgroundColor = '#fff';



            posterElement.style.width = this.width*this.voxelPixelRatio+'px';
            posterElement.style.height = this.height*this.voxelPixelRatio+'px';
            posterElement.style.overflow = 'hidden';


            container.appendChild(posterElement);

            return(posterElement);


        }


        getPosterElement(container=null):HTMLElement{

            if("_posterElement" in this){
            }else{
                if(!container){
                    container = document.getElementById('zones');
                }
                this._posterElement = this.createPosterElement(container);
            }

            return this._posterElement;

        }


        createBabylonMesh(scene){


            super.createBabylonMesh(scene,function(object){



                let redraw = function() {

                    let posterElement = object.getPosterElement(document.getElementById('posters'));

                    html2canvas(posterElement, {
                        onrendered: function (canvas) {


                            let image_texture = new BABYLON.DynamicTexture('posterTexture', {
                                width: canvas.width,
                                height: canvas.height
                            }, scene, false);
                            let image_texture_ctx = image_texture.getContext();
                            //object._ctx = image_texture_ctx;


                            image_texture_ctx.drawImage(canvas, 0, 0);
                            image_texture.update();

                            if (object.isEmitting) {


                                material.emissiveTexture = image_texture;


                                material.backFaceCulling = !(object.backFace);
                                material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                                material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                                material.specularPower = 32;
                                //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                                material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                                material.diffuseColor = new BABYLON.Color3(0, 0, 0);


                            } else {

                                material.diffuseTexture = image_texture;

                            }

                            GALLERY.Viewer.renderTick();



                        }
                    });
                };

                //posterElement.onmousemove = redraw;
                redraw();


                let material = new BABYLON.StandardMaterial("texture4", scene);

                //material.freeze();



                let image00 = BABYLON.Mesh.CreatePlane(object.id, BLOCK_SIZE, scene);
                image00.material = material;
                return(image00);


            });






        }


        createVirtualObjects():Objects.Array{
            let virtualObjects = new Objects.Array();

            let posterElement = this.getPosterElement(document.getElementById('posters'));

            r(posterElement);
            let buttons = posterElement.getElementsByTagName('button');


            for(let button of buttons){


                let buttonMesh = new Objects.Button({

                    id: createGuid(),
                    type: 'button',

                    world: this.world,
                    storey: this.storey,
                    position: {
                        x: this.position.x,
                        y: this.position.y,
                    },

                    rotation: this.rotation,

                    width: button.offsetWidth / this.voxelPixelRatio,
                    height:  button.offsetHeight / this.voxelPixelRatio,

                    offsetHorizontal: (button.offsetLeft-posterElement.offsetLeft-posterElement.offsetWidth/2) / this.voxelPixelRatio,
                    offsetVertical: (button.offsetTop-posterElement.offsetTop-posterElement.offsetHeight/2) / this.voxelPixelRatio,


                    posterHtml: button.outerHTML,
                    posterDesign: 'none',
                    voxelPixelRatio: this.voxelPixelRatio,


                });

                buttonMesh.offsetHorizontal += buttonMesh.width/2;
                buttonMesh.offsetVertical += buttonMesh.height/2;

                virtualObjects.push(buttonMesh);

            }

            return(virtualObjects);

        }



        /*getSrc(width=0,ratio=0){//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});

            return uri.toString();


        }*/


    }

}