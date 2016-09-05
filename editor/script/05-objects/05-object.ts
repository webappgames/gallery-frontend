


module GALLERY.Objects{

    export class Object{



        constructor(object){


            object.storey = object.storey || '1NP';



            for (var key in object) {

                var this_key = key;

                if (this_key == '_id')this_key = 'id';//todo maybe better solution

                this[this_key] = object[key];
            }



        }


        static init(object) {

            if(object instanceof GALLERY.Objects.Object){
                return (object);
            }

            //----------------------------------
            if (object.type == 'block') {

                object = new GALLERY.Objects.Block(object);

            } else if (object.type == 'light') {

                object = new GALLERY.Objects.Light(object);

            } else if (object.type == 'label') {

                object = new GALLERY.Objects.Label(object);

            } else if (object.type == 'image') {

                object = new GALLERY.Objects.Image(object);

            } else if (object.type == 'tree') {

                 object = new GALLERY.Objects.Tree(object);

            } else if (object.type == 'stairs') {

            object = new GALLERY.Objects.Stairs(object);

            }
            else {

                console.log(object);
                throw new Error('Cant put item into Gallert Objects Array because of unrecognized object type ' + object.type);
            }
            //----------------------------------

            return (object);

        }






        create$Element(){

            let object = this;

            var element = '<div></div>';

            var $element = $(element);


            if(typeof object.position!=='undefined') {

                $element.css('position', 'absolute');

                //if (object.type !== 'image') {

                $element.css('top', object.position.y * zoom_selected + window_center.y);
                $element.css('left', object.position.x * zoom_selected + window_center.x);

                /*} else {

                 $element.css('top', ( object.position.y - 0.5 ) * zoom_selected + window_center.y);
                 $element.css('left', ( object.position.x - 0.5 ) * zoom_selected + window_center.x);

                 }*/

            }


            //$element.addClass('object');
            $element.addClass(object.type);

            $element.attr('id',object.id);
            $element.attr('data-shape',object.shape);
            $element.attr('data-material',object.material);



            $element.css('width', zoom_selected);
            $element.css('height',zoom_selected);

            return(element);

        }




    }

}