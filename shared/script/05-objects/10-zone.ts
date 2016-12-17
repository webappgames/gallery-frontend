/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Zone extends Object{

        public storey: string;
        public width: number;
        public height: number;
        public uri:string;
        public uri_level:number;
        public isPickable:boolean;

        public name: string;
        public html: string;
        private _mesh;
        private _board:HTMLDivElement;




        constructor(object){

            super(object);

            this.width = this.width || 1;
            this.height = this.height || 1;
            this.uri = this.uri || '';
            this.uri_level = this.uri_level || 0;
            this.isPickable = this.isPickable || false;
            this.name = this.name || '';
            this.html = this.html || '';
            //this.selector = this.selector || '';

        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;


            var $block = $('<div>').addClass('image');


            var width = object.width*zoom_selected;
            var height = object.height*zoom_selected;

            $block.css('width',width);
            $block.css('height',height);
            $block.css('background-color','rgba(0,0,0,0.5)');


            $block.css('position','relative');
            $block.css('top',-height/2);
            $block.css('left',-width/2);

            $block.css('transform','rotate('+object.rotation+'deg)');


            $element.append($block);
            //$element.css('transform','rotate('+object.rotation+'deg)');


            return $element;

        }


        private _createMesh(scene) {


            let mesh = BABYLON.Mesh.CreateBox(this.id, BLOCK_SIZE, scene);
            mesh.material =  new BABYLON.StandardMaterial("texture1", scene);
            mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);


            mesh.position = this.getBabylonPosition();

            mesh.position.y += BLOCK_SIZE;//* BLOCKS_2D_3D_SHAPES.room.length / 2;
            mesh.scaling.y = 1;

            mesh.scaling.x = this.width;
            mesh.scaling.z = this.height;


            mesh.checkCollisions = false;
            mesh.isPickable = false;

            //meshes.push(mesh);
            return(mesh);
        }

        getMesh(scene){

            if("_mesh" in this){
            }else{
                this._mesh = this._createMesh(scene);
            }

            return this._mesh;

        }


        isIn(position:BABYLON.Vector3,scene){


            let center = this.getBabylonPosition();
            //center.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;


            //let scaling = new BABYLON.Vector3(BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
            let scaling = {x:BLOCK_SIZE,y:BLOCK_SIZE,z:BLOCK_SIZE};
            //scaling.y = scaling.y * BLOCKS_2D_3D_SHAPES.room.length;
            scaling.x = scaling.x * this.width * 0.5;
            scaling.z = scaling.z * this.height * 0.5;


            //r((center.x-scaling.x)+' - '+position.x+' - '+(center.x+scaling.x));

            let isIn = (

                center.x-scaling.x <= position.x &&
                center.x+scaling.x >= position.x &&

                /*center.y-scaling.y <= position.y &&
                center.y+scaling.y >= position.y &&*/

                center.z-scaling.z <= position.z &&
                center.z+scaling.z >= position.z
            );

            if(isIn){
                this.getMesh(scene).material.alpha = 0.2;
            }else{
                this.getMesh(scene).material.alpha = 0;
            }


            return(isIn);



        }




        private _createBoard(){
            //if (object.name || object.html) {

            let isNext = false;
            let label = objects.filterTypes('label').findBy('uri', this.uri);
            if (label) {
                if (label.next !== 'none') {
                    isNext = true;
                }

            }


            let element = document.createElement('div');
            element.id = 'zone-' + this.id;
            element.style.display = 'none';
            element.classList.add('zone');
            element.innerHTML = ''

                //+'<div class="previous"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>'
                + (this.name ? '<h1>' + this.name + '</h1>' : '')
                + '<div class="text">' + this.html + '</div>'
                + (isNext ? '<div class="next"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');


            element.onclick = Viewer.appStateNext;

            document.getElementById('zones').appendChild(element);
            return(element);

            //}
        }


        getBoard(){

            if("_board" in this){
            }else{
                this._board = this._createBoard();
            }

            return this._board;

        }




        showBoard(){
            this.getBoard().style.display = 'block';
        }


        hideBoard(){
            this.getBoard().style.display = 'none';
        }




    }

}