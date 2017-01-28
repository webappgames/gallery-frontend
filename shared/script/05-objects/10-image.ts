/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Image extends Object{

        public storey: string;
        public design:string;
        public name:string;
        public html: string;

        public uri:string;
        public parent:string;
        public width:number;
        public height: number;
        public src: string;

        public rotation: number;
        public onGround: boolean;
        public hasAlpha: boolean;
        public isEmitting: boolean;
        public checkCollisions: boolean;
        public backFace: boolean;






        constructor(object){

            super(object);

            this.design = this.design || 'board';
            this.name = this.name || '';
            this.html = this.html || '';


            this.uri = this.uri || 'none';
            this.parent = this.parent || 'none';


            this.rotation = this.rotation || 0;
            this.onGround = this.onGround || false;
            this.hasAlpha = this.hasAlpha || false;
            if(typeof this.isEmitting == 'undefined'){this.isEmitting=true;}
            this.checkCollisions = this.checkCollisions || false;
            this.backFace = this.backFace || false;

        }





        create$Element() {


            var $element = this._create$Element();
            //let object = this;


           /* var src = object.src;
            var src_uri = URI(src)
                .removeSearch("width");
            var src_normal = src_uri.addSearch({width: 100}).toString();*/



            if(this.onGround) {


                var $image = $('<img>').addClass('image');


                var width = this.width * zoom_selected;
                var height = this.height * zoom_selected;

                $image.css('width', width);
                $image.css('height', height);

                $image.attr('src', this.getSrc(100));

                $image.css('position', 'relative');
                $image.css('top', -height / 2);
                $image.css('left', -width / 2);


                //r(object.rotation);
                if(this.rotation) {
                    $image.css('transform', 'rotate(' + this.rotation + 'deg)');
                }


                $element.append($image);
                //$element.css('transform','rotate('+object.rotation+'deg)');


            }else {


                var $image_0 = $('<img>').addClass('image-0').hide();
                var $image_90 = $('<img>').addClass('image-90').hide();
                var $image_180 = $('<img>').addClass('image-180').hide();
                var $image_270 = $('<img>').addClass('image-270').hide();


                $image_0  .css('height',this.height * zoom_selected);
                $image_180.css('height',this.height * zoom_selected);
                $image_90 .css('width', this.height * zoom_selected);
                $image_270.css('width', this.height * zoom_selected);



                $image_0  .attr('src', this.getSrc(100,0,0));
                $image_90 .attr('src', this.getSrc(100,0,90));
                $image_180.attr('src', this.getSrc(100,0,180));
                $image_270.attr('src', this.getSrc(100,0,270));


                //rotateImage($image_90[0],90);
                //rotateImage($image_180[0],180);
                //rotateImage($image_270[0],270);


                if (this.rotation === 0) {
                    $image_0.show();
                } else if (this.rotation === 90) {
                    $image_90.show();
                } else if (this.rotation === 180) {
                    $image_180.show();
                } else if (this.rotation === 270) {
                    $image_270.show();
                } else {
                    $image_0.show();
                }


                $element.append($image_0);
                $element.append($image_90);
                $element.append($image_180);
                $element.append($image_270);

            }


            return $element;

        }




        getSrc(width=0,ratio=0,rotation=0):string{//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});
            if(rotation)uri.addSearch({rotation: rotation});

            return uri.toString();


        }


        getTexture(){
            return(this.src);
        }







        createBabylonMesh(scene,getImageMesh){

            let object = this;
            let position = this.getBabylonPosition();



            if (typeof this.rotation !== 'number') {this.rotation = 0;}//todo remove


            let rotation_rad = (object.rotation / 180) * Math.PI;

            let image = getImageMesh(object);


            if (object.onGround) {


                image.position = position;
                image.position.y = (this.getLevelNumber() + BLOCKS_1NP_LEVEL + 0.5) * BLOCK_SIZE + 0.1;


                image.rotation.x = Math.PI / 2;
                image.rotation.y = Math.PI + rotation_rad;


            } else {

                position.x += Math.sin(rotation_rad) * BLOCK_SIZE / 100;
                position.z += Math.cos(rotation_rad) * BLOCK_SIZE / 100;
                image.position = position;



                //(level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE
                //image.position.y = (/*level + BLOCKS_1NP_LEVEL +*/ EYE_VERTICAL) * BLOCK_SIZE ;

                image.rotation.y = Math.PI + rotation_rad;
                image.position.y += (EYE_VERTICAL - BLOCKS_1NP_LEVEL) * BLOCK_SIZE;


            }


            image.scaling.x = object.width;
            image.scaling.y = object.height;
            //image.scaling.z = 0.1;


            image.checkCollisions = object.checkCollisions;


            return(image);

            //r(object);
            //r(image);



        }


        createVirtualObjects(zoneIdsCreatedForImages){

            let virtualObjects = new Objects.Array();


            let object = this;
            let position = this.getBabylonPosition();



            if (typeof this.rotation !== 'number') {this.rotation = 0;}//todo remove
            let rotation_rad = (object.rotation / 180) * Math.PI;//todo method



            if (typeof object.rotation === 'number') {
                if (!object.onGround) {

            if (/*develop && /*(object.uri || object.name) &&*/ (zoneIdsCreatedForImages.indexOf(object.id) == -1)) {

                r('Creating zone for ' + object.name);


                zoneIdsCreatedForImages.push(object.id);


                let uri: string;
                if (object.uri && object.uri != 'none') {
                    uri = object.uri;
                } else if (object.name) {
                    uri = '/' + createUriFromName(object.name);
                    object.uri = uri;
                } else {

                    //uri = '/' + (object.id.split('-')[0]);
                    uri = '/:' + object.id;
                    //object.uri = uri;
                }


                object.zoneCreated = true;


                let size = Math.max(object.width, object.height);

                let x = Math.sin(rotation_rad) * size / -2;
                let y = Math.cos(rotation_rad) * size / 2;


                let zone = new Objects.Zone({

                    id: createGuid(),
                    type: 'zone',

                    world: object.world,
                    storey: object.storey,
                    position: {
                        x: object.position.x + x,
                        y: object.position.y + y,
                    },


                    limit: true,
                    limitRotation: object.rotation + 180,
                    limitRotationTolerance: 90,


                    width: object.width * Math.cos(rotation_rad) + size * Math.sin(rotation_rad),
                    height: object.width * Math.sin(rotation_rad) + size * Math.cos(rotation_rad),

                    design: object.design,
                    name: object.name,
                    html: object.html,
                    uri: uri,
                    uri_level: 10000,//todo better low priority

                });


                virtualObjects.push(zone);



                let label = new Objects.Label({

                    id: createGuid(),
                    type: 'label',

                    world: object.world,
                    storey: object.storey,
                    position: {
                        x: object.position.x + (x * 1.9),
                        y: object.position.y + (y * 1.9),
                    },

                    rotation: object.rotation,


                    name: object.name,
                    uri: uri,
                    parent: object.parent,

                });

                virtualObjects.push(zone);
                //processObject(label);//todo better
                //objects.push(label);


                //r(objects);

            }
            }

            return(virtualObjects);


        }










    }

}