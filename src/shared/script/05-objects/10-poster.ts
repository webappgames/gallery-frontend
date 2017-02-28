/// <reference path="../../reference" />

module GALLERY.Objects{

    import scene = GALLERY.Viewer.scene;
    export class Poster extends Image{




        public posterHtml:string;
        public posterDesign:string;
        public voxelPixelRatio:number;


        public posterBackgroundColor: string;
        public posterTextColor: string;


        public opened: boolean;



        //todo private _posterMesh
        public _posterElement:HTMLElement;
        private _posterTexture:BABYLON.DynamicTexture;

        constructor(object){


            this.posterHtml = this.posterHtml || '';
            this.posterDesign = this.posterDesign || 'board';


            this.posterBackgroundColor = this.posterBackgroundColor || '#ffffff';
            this.posterTextColor = this.posterTextColor || '#000000';

            this.opened = this.opened || false;


            this.src = this.src || 'http://cdn.pavolhejny.com/?file=5888cb789f36f-M2Q5OGMxNTk1N2M1ZjVkZDIyN2U1M2RiYzdjYmI2MGQuanBn';//todo remove
            this.width = this.width || 1;
            this.height = this.height || 1;
            this.voxelPixelRatio = this.voxelPixelRatio || 10;

            super(object);

        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'posterHtml': return('<textarea></textarea>');
                case 'posterDesign': return('<input type="text" />');
                case 'voxelPixelRatio': return('<input type="number" />');
                case 'posterBackgroundColor': return('<input type="color" />');
                case 'posterTextColor': return('<input type="color" />');
                case 'opened': return('<input type="checkbox" />');
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



        createImageMesh(scene:BABYLON.Scene):BABYLON.Mesh{

            let object = this;//todo


            this._posterTexture = new BABYLON.DynamicTexture('posterTexture', {
                width: this.width*this.voxelPixelRatio,
                height: this.height*this.voxelPixelRatio
            }, scene, false);


            let posterTextureCtx = this._posterTexture.getContext();
            posterTextureCtx.beginPath();
            posterTextureCtx.rect(0, 0, posterTextureCtx.canvas.width, posterTextureCtx.canvas.height);
            posterTextureCtx.fillStyle = this.posterBackgroundColor;
            posterTextureCtx.fill();
            this._posterTexture.update();



            let material = new BABYLON.StandardMaterial("texture4", scene);


            if (this.isEmitting) {


                material.emissiveTexture = this._posterTexture;


                material.backFaceCulling = !(this.backFace);
                material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                material.specularPower = 32;
                //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                material.diffuseColor = new BABYLON.Color3(0, 0, 0);


            } else {

                material.diffuseTexture = this._posterTexture;

            }



            /*setTimeout(function () {
                this.redrawPosterTexture();
            }.bind(this));*/
            //set interval this.redrawPosterTexture();




            let image00 = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
            image00.material = material;
            return(image00);


        }



        redrawPosterTexture(){

            let object = this;//todo


            let posterElement = this.getPosterElement(document.getElementById('posters'));//todo DI to constructor


            let buttons = posterElement.getElementsByTagName('button');
            for(let button of buttons){
                button.style.visibility = 'hidden';
            }


                html2canvas(posterElement, {
                background :'#FFFFFF',
                onrendered: function (canvas) {


                    let posterTextureCtx = object._posterTexture.getContext();
                    //object._ctx = image_texture_ctx;


                    posterTextureCtx.drawImage(canvas, 0, 0);
                    object._posterTexture.update();



                    GALLERY.Viewer.renderTick();//todo DI


                }
            });
        };


        handlePointerRelease(pressed:boolean, event, pickResult){

            if(pressed) {
                this.virtualObjects.getObjectByIndex(0).show();
                this.hide();
            }

        }


        handlePointerPress(event, pickResult){
            this.redrawPosterTexture();


            /*
            let object = this;//todo remove

            let position = pickResult.pickedMesh.position.subtract(pickResult.pickedPoint);

            let vec2 = {
                x: (Math.abs(position.x)>Math.abs(position.z)?position.x:position.z),
                y: position.y
            };


            vec2.x /= pickResult.pickedMesh.scaling.x * BLOCK_SIZE;
            vec2.y /= pickResult.pickedMesh.scaling.y * BLOCK_SIZE;

            vec2.x += 0.5;
            vec2.y += 0.5;

            vec2.x *= object.width * object.voxelPixelRatio;
            vec2.y *= object.height * object.voxelPixelRatio;



            let ctx = pickResult.pickedMesh.material.emissiveTexture.getContext();

            ctx.beginPath();
            ctx.arc(vec2.x, vec2.y, 10, 0, 2 * Math.PI);
            ctx.fill();


            pickResult.pickedMesh.material.emissiveTexture.update();//todo getBabylonMesh
            */


        }




        private virtualObjects=null;
        createVirtualObjects():Objects.Array{
            this.virtualObjects = new Objects.Array();




            //------------------------------------------------------------
            this.virtualObjects.push(new Objects.Board({

                id: createGuid(),
                type: 'board',

                world: this.world,
                storey: this.storey,
                position: {
                    x: this.position.x,
                    y: this.position.y,
                },

                rotation: this.rotation,

                width:  this.width,
                height: this.height,
                voxelPixelRatio: this.voxelPixelRatio,



                name: this.name,
                html: this.posterHtml,


                //posterBackgroundColor: '#0000ff',
                //posterTextColor: '#000000',


            },this));

            if(this.opened){
                this.hide();
            }else{
                //this.virtualObjects.getObjectByIndex(0).hide();
                this.virtualObjects.getObjectByIndex(0).hidden=true;
            }
            //------------------------------------------------------------






            let posterElement = this.getPosterElement(document.getElementById('posters'));

            //r(posterElement);
            /*let buttons = posterElement.getElementsByTagName('button');

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


                    posterHtml: button.innerHTML,
                    voxelPixelRatio: this.voxelPixelRatio,

                    onClick: button.onclick





                });

                buttonMesh.offsetHorizontal += buttonMesh.width/2;
                buttonMesh.offsetVertical += buttonMesh.height/2;

                virtualObjects.push(buttonMesh);

            }*/




            //----------------------------------------------------



            var cumulativeOffset = function(element) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop  || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while(element);

                return {
                    top: top,
                    left: left
                };
            };

            function offsetFromParent(element,parent){
                let elementOffset = cumulativeOffset(element);
                let parentOffset = cumulativeOffset(parent);

                return {
                    top: elementOffset.top - parentOffset.top,
                    left: elementOffset.left - parentOffset.left
                };

            }


            let cells = posterElement.querySelectorAll('td,th,button');
            r(cells);


            for(let cell of cells) {

                let offset = offsetFromParent(cell, posterElement);
                r('row', offset);
                //r(posterElement.offsetWidth,this.width);

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

                    width: cell.offsetWidth / this.voxelPixelRatio,
                    height:  cell.offsetHeight / this.voxelPixelRatio,


                    offsetHorizontal: (offset.left) / this.voxelPixelRatio,
                    offsetVertical: (offset.top) / this.voxelPixelRatio,


                    posterHtml: cell.innerHTML,
                    voxelPixelRatio: this.voxelPixelRatio,

                    posterBackgroundColor: '#0000ff',
                    posterTextColor: '#000000',

                    onClick: cell.onclick


                });

                buttonMesh.offsetHorizontal += buttonMesh.width/2;
                buttonMesh.offsetVertical += buttonMesh.height/2;

                buttonMesh.offsetHorizontal -= this.width / 2;
                buttonMesh.offsetVertical -= this.height / 2;


                this.virtualObjects.push(buttonMesh);

            }


            /*let tables = posterElement.getElementsByTagName('table');
            for(let table of tables) {

                r('table',table.offsetTop,table.offsetLeft);
                let rows = table.getElementsByTagName('tr');
                for (let row of rows) {

                    r('row',row.offsetTop,row.offsetLeft);
                    let cells = row.getElementsByTagName('td');
                    for (let cell of cells) {


                        r('cell',cell.offsetTop,cell.offsetLeft);

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

                            //width: cell.offsetWidth / this.voxelPixelRatio,
                            //height:  cell.offsetHeight / this.voxelPixelRatio,
                            width: 0.1,
                            height: 0.1,

                            offsetHorizontal: (cell.offsetLeft) / this.voxelPixelRatio,
                            offsetVertical: (cell.offsetTop) / this.voxelPixelRatio,


                            posterHtml: cell.innerHTML,
                            voxelPixelRatio: this.voxelPixelRatio,

                            posterBackgroundColor: '#0000ff',
                            posterTextColor: '#000000',

                            //onClick: cell.onclick





                        });

                        //buttonMesh.offsetHorizontal += buttonMesh.width/2;
                        //buttonMesh.offsetVertical += buttonMesh.height/2;

                        buttonMesh.offsetHorizontal -= this.width/2;
                        buttonMesh.offsetVertical -= this.height/2;


                        virtualObjects.push(buttonMesh);





                    }
                }
            }*/




            //r(virtualObjects);
            return(this.virtualObjects);

        }



        /*getSrc(width=0,ratio=0){//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});

            return uri.toString();


        }*/


    }

}