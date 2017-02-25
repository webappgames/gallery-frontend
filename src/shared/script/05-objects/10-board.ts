/// <reference path="10-boardamorph" />



module GALLERY.Objects{

    export class Board extends BoardAmorph{


        public width:number;
        public height:number;
        public voxelPixelRatio:number;



        constructor(object,private realObject=null){

            super(object);
            this.width = this.width || 2;
            this.height = this.height || 4;
            this.voxelPixelRatio = this.voxelPixelRatio || 100;

        }



        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'width':
                    return('<input type="number">');
                case 'height':
                    return('<input type="number">');
                case 'voxelPixelRatio':
                    return('<input type="number">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-square-o" aria-hidden="true"></i>');



            return $element;

        }




        createBoard(container:HTMLElement):HTMLElement{


            let element = super.createBoard(container);

            element.style.width = this.width * this.voxelPixelRatio;
            element.style.height = this.height * this.voxelPixelRatio;
            element.style.overflow = 'hidden';



            return element;
        }


    }

}