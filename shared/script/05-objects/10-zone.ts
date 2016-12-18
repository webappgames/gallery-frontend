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
            mesh.material.alpha = 0.2

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


        isIn(position:BABYLON.Vector3){


            let center = this.getBabylonPosition();
            //center.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;


            let scaling = new BABYLON.Vector3(BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
            scaling.y = scaling.y * BLOCKS_2D_3D_SHAPES.room.length;
            scaling.x = Math.abs(scaling.x * this.width);
            scaling.z = Math.abs(scaling.z * this.height);


            //r((center.x-scaling.x)+' - '+position.x+' - '+(center.x+scaling.x));

            return(

                center.x-scaling.x/2 <= position.x &&
                center.x+scaling.x/2 >= position.x &&

                center.y-scaling.y/2 <= position.y &&
                center.y+scaling.y/2 >= position.y &&

                center.z-scaling.z/2 <= position.z &&
                center.z+scaling.z/2 >= position.z
            );




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


            /*element.innerHTML +=
            `
                <div id="disqus_thread"></div>
                <script>

                
                var disqus_config = function () {
                this.page.url = window.location;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = 'image'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
                };
                
                (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = '//galerie-fotobernovska-cz.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();
                </script>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            `;*/


            element.innerHTML += `<div class="fb-comments" data-href="http://gallery.local/zatisi" data-mobile="1" data-numposts="5"></div>`;



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