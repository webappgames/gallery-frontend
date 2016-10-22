/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export abstract class Object{


        public id: string;
        public type: string;
        public world: string;
        public position: {
          x: number,
          y: number
        };


        constructor(object){


            object.world = object.world || 'main';
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
            if (object.type == 'environment') {

                object = new GALLERY.Objects.Environment(object);

            } else if (object.type == 'block') {

                object = new GALLERY.Objects.Block(object);

            } else if (object.type == 'multiblock') {

                object = new GALLERY.Objects.MultiBlock(object);

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

            }else if (object.type == 'link') {

                object = new GALLERY.Objects.Link(object);

            }else if (object.type == 'gate') {

                object = new GALLERY.Objects.Gate(object);

            }else if (object.type == 'deploy') {

                object = new GALLERY.Objects.Deploy(object);

            }
            else {

                console.log(object);
                throw new Error('Cant put item into Gallery Objects Array because of unrecognized object type ' + object.type);
            }
            //----------------------------------

            return (object);

        }



        clone():Object{
            return(Object.init(JSON.parse(JSON.stringify(this))));
        }



        /*create$Element(){
            return this._create$Element();
        }*/


        _create$Element(){

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



            $element.css('width', zoom_selected);
            $element.css('height',zoom_selected);

            return($element);

        }




    }

}