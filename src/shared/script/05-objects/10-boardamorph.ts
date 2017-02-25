//import {ProtoBoard} from './07-protoboard.ts';
/// <reference path="07-protoboard" />


module GALLERY.Objects{


    export class BoardAmorph extends ProtoBoard{

        public isPerspective: boolean;


        constructor(object,private realObject=null){

            super(object);
            this.isPerspective = this.isPerspective || false;

        }



        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'isPerspective':
                    return('<input type="checkbox">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }


        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');



            return $element;

        }





        createBoard(container:HTMLElement):HTMLElement{


            let element = super.createBoard(container);




            let self = this;
            if(this.realObject) {

                element.addEventListener('click', function (event) {

                    r(self);
                    self.realObject.show();
                    self.hide();

                });
            }




            return element;
        }




        show(){
            //super.show();
            if(this.getCreatedBoard())
            this.getCreatedBoard().style.display='block';
        }


        hide(){
            //super.hide();
            if(this.getCreatedBoard())
            this.getCreatedBoard().style.display='none';
        }

    }

}