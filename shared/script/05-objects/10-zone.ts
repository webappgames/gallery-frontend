/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    //import analyticsObject = GALLERY.Viewer.analyticsObject;
    //import appState = GALLERY.Viewer.appState;


    export class Zone extends Object{

        public storey: string;
        public width: number;
        public height: number;
        public uri:string;
        public uri_level:number;
        public isPickable:boolean;
        public isImportant:boolean;


        public design: string;
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
            this.design = this.design || 'board';
            this.name = this.name || '';
            this.html = this.html || '';
            this.isImportant = this.isImportant || false;
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
            element.classList.add('zone-'+this.design);
            element.style.display = 'none';



            let html = this.html;

            html = Mustache.render(html, {gallery: function () {return function (val, render) {

                let images = objects.filterTypes('image');
                let conds = JSON.parse(val);
                for(let key in conds){
                    images = images.filterBy(key,conds[key]);
                }

                let html = '';
                images.forEach(function (image) {
                    html += '<img src="'+image.getSrc(90,1)+'" onclick="GALLERY.Viewer.appState(\'/:'+image.id+'\', false, false);" />'
                });
                html = '<div class="gallery">'+html+'</div>';


                return html;
            }}});



            element.innerHTML = ''

                //+'<div class="previous"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>'
                + (this.name ? '<h1>' + this.name + '</h1>' : '')
                + '<div class="text">' + html + '</div>'
                + (isNext ? '<div class="next" onclick="GALLERY.Viewer.appStateNext();"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');




            let fullUrl = 'http://'+window.location.hostname+'/'+this.getUri();//+analyticsObject.domain;
            //let fullUrl = 'http://'+analyticsObject.domain+this.getUri();
            r(fullUrl);



            if(/*this.design=='panel'*/this.design=='board' && !isNext) {

                //element.innerHTML += `<button class="fb-share-button" data-href="http://www.your-domain.com/your-page.html"></button>`;

                element.innerHTML += `<button onclick="GALLERY.Viewer.goToParent();"><i class="fa fa-arrow-left" aria-hidden="true"></i> Zpět</button>`;
                element.innerHTML += `<button onclick="GALLERY.Viewer.appStateTurnBack();"><i class="fa fa-repeat" aria-hidden="true"></i> Otočit se</button>`;
                element.innerHTML += `<button class="discuss" onclick="fbDiscuss('`+fullUrl+`');"><i class="fa fa-pencil" aria-hidden="true"></i> Přidat komentář</button>`;

                $.ajax({
                    url: 'http://graph.facebook.com/v2.1/'+encodeURIComponent(fullUrl),
                    dataType: 'jsonp',
                    success: function(data) {

                        data.share = data.share || {};
                        let count = data.share.comment_count || 0;
                        r(data,count);
                        let text = '<i class="fa fa-pencil" aria-hidden="true"></i> ';

                        if(count==0){
                            text += 'Přidat komentář';
                        }else
                        if(count==1){
                            text += '1 komentář';
                        }else
                        if(count<5){
                            text += count+' komentáře';
                        }else
                        if(count>=5){
                            text += count+' komentářů';
                        }

                        element.getElementsByClassName('discuss')[0].innerHTML = text;
                        //alert("comments: " + data.comments);
                    }
                });





                //element.innerHTML += `<div class="fb-comments-count" data-href="`+fullUri+`">0</div>`;
                //element.innerHTML += `com<div class="fb-comments" data-href="`+fullUri+`" data-mobile="1" data-numposts="5"></div>`;
            }






            document.getElementById('zones').appendChild(element);


            $(element).find('a').click(function (e) {
                e.preventDefault();
                appState($(this).attr('href'),false,false);
            });


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
            //this.getBoard().style.display = 'block';
            $(this.getBoard()).stop().slideDown();
        }


        hideBoard(){
            //this.getBoard().style.display = 'none';
            $(this.getBoard()).stop().slideUp();
        }




    }

}