


namespace GALLERY.Objects{

    export class Image extends Object{




        static create$Element(){



            var $element = super();
            let object = this;



            var $image_0 = $('<img>').addClass('image-0').hide();
            var $image_90 = $('<img>').addClass('image-90').hide();
            var $image_180= $('<img>').addClass('image-180').hide();
            var $image_270 = $('<img>').addClass('image-270').hide();


            $image_0.css('height',object.height*zoom_selected);
            $image_180.css('height',object.height*zoom_selected);
            $image_90.css('width',object.height*zoom_selected);
            $image_270.css('width',object.height*zoom_selected);


            var src = object.src;
            var src_uri = URI(src)
                .removeSearch("width");
            var src_normal = src_uri.addSearch({ width: 100 }).toString();



            $image_0.attr('src',src_normal);
            $image_90.attr('src',src_normal+'&rotation=90');
            $image_180.attr('src',src_normal+'&rotation=180');
            $image_270.attr('src',src_normal+'&rotation=270');


            //rotateImage($image_90[0],90);
            //rotateImage($image_180[0],180);
            //rotateImage($image_270[0],270);


            if(object.rotation === 0)$image_0.show(); else
            if(object.rotation === 90)$image_90.show(); else
            if(object.rotation === 180)$image_180.show(); else
            if(object.rotation === 270)$image_270.show(); else
                $image_0.show();




            $element.append($image_0);
            $element.append($image_90);
            $element.append($image_180);
            $element.append($image_270);


            return $element;

        }





    }

}