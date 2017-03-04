/// <reference path="../../reference" />

//r('created block');
//r(GALLERY.Objects.Object);

module GALLERY.Objects{

    export class Block extends Object{

        public storey: string;
        public shape: string;
        public material: string;
        public opacity: number;



        constructor(object){

            super(object);

            this.opacity = this.opacity || 1;


        }

        toString():string{

            return(`block(${this.shape}|${this.material}|${this.opacity*100}%)`);

        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'opacity':
                    return('<input type="range" min="0" max="1" step="0.1">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }


        create$Element(){


            var $element = this._create$Element();

            //r($element);

            let object = this;


            $element.attr('data-shape',object.shape);
            $element.attr('data-material',object.material);
            $element.attr('data-opacity',object.opacity);
            $element.css('opacity',object.opacity);


            $element.css('top', '-='+ 0.5 * zoom_selected);
            $element.css('left','-='+ 0.5 * zoom_selected);



            object.material = object.material || 'stone-plain';


            if(object.material.substr(0,1)=='#'){

                $element.css('background-color', object.material);
            }else {

                $element.css('background', 'url("/media/images/textures/' + object.material + '.jpg")');
                $element.css('background-size', 'cover');

            }



            if (object.shape != 'room') {
                $element.html('<img src="/media/images/shapes/' + object.shape + '.png">');
            }



            return $element;


        }




        static isWallOn(objects: GALLERY.Objects.Array,position,storey){



            let objects_: GALLERY.Objects.Object[] = objects.getAll();
            let object  : GALLERY.Objects.Object;

            //r(objects_);

            for(let object of objects_) {


                if(object.type=='block' && object.storey == storey) {

                    //r('isWallOn testing',object.position,position,object);

                    if (
                        object.position.x - 0.5 <= position.x &&
                        object.position.y - 0.5 <= position.y &&
                        object.position.x + 0.5 >= position.x &&
                        object.position.y + 0.5 >= position.y
                    ) {



                        if (<GALLERY.Objects.Block>object.shape == 'wall') {
                            return(true);
                        }else{
                            return(false);
                        }
                    }
                }




            }

            return(null);

        }




        static wallRotation(objects,position,storey){

            //r('wallRotation',position);

            var a  = this.isWallOn(objects,{x:position.x+0.5,y:position.y+0.5},storey);
            var b  = this.isWallOn(objects,{x:position.x-0.5,y:position.y+0.5},storey);
            var c  = this.isWallOn(objects,{x:position.x-0.5,y:position.y-0.5},storey);
            var d  = this.isWallOn(objects,{x:position.x+0.5,y:position.y-0.5},storey);

            //r(a,b,c,d);

            if(a && b && !c && !d){
                return(180);
            }else
            if(!a && b && c && !d){
                return(270);
            }else
            if(!a && !b && c && d){
                return(0);
            }else
            if(a && !b && !c && d){
                return(90);
            }else{
                return(false);
            }


        }



    }

}