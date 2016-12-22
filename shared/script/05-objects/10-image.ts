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



        getTexture(){
            return(this.src);
        }



        create$Element() {


            var $element = this._create$Element();
            let object = this;


            var src = object.src;
            var src_uri = URI(src)
                .removeSearch("width");
            var src_normal = src_uri.addSearch({width: 100}).toString();



            if(object.onGround) {


                var $image = $('<img>').addClass('image');


                var width = object.width * zoom_selected;
                var height = object.height * zoom_selected;

                $image.css('width', width);
                $image.css('height', height);

                $image.attr('src', src_normal);

                $image.css('position', 'relative');
                $image.css('top', -height / 2);
                $image.css('left', -width / 2);


                //r(object.rotation);
                if(object.rotation) {
                    $image.css('transform', 'rotate(' + object.rotation + 'deg)');
                }


                $element.append($image);
                //$element.css('transform','rotate('+object.rotation+'deg)');


            }else {


                var $image_0 = $('<img>').addClass('image-0').hide();
                var $image_90 = $('<img>').addClass('image-90').hide();
                var $image_180 = $('<img>').addClass('image-180').hide();
                var $image_270 = $('<img>').addClass('image-270').hide();


                $image_0.css('height', object.height * zoom_selected);
                $image_180.css('height', object.height * zoom_selected);
                $image_90.css('width', object.height * zoom_selected);
                $image_270.css('width', object.height * zoom_selected);



                $image_0.attr('src', src_normal);
                $image_90.attr('src', src_normal + '&rotation=90');
                $image_180.attr('src', src_normal + '&rotation=180');
                $image_270.attr('src', src_normal + '&rotation=270');


                //rotateImage($image_90[0],90);
                //rotateImage($image_180[0],180);
                //rotateImage($image_270[0],270);


                if (object.rotation === 0) {
                    $image_0.show();
                } else if (object.rotation === 90) {
                    $image_90.show();
                } else if (object.rotation === 180) {
                    $image_180.show();
                } else if (object.rotation === 270) {
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




        getSrc(width=0,ratio=0){//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});

            return uri.toString();


        }


    }

}