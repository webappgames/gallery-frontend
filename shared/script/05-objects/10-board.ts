/// <reference path="07-protoboard" />



namespace GALLERY.Objects{

    export class Board extends ProtoBoard{

        public isPerspective: boolean;


        public width:number;
        public height:number;
        public voxelPixelRatio:number;



        constructor(object,public realObject=null){

            super(object);
            this.isPerspective = this.isPerspective || false;
            this.width = this.width || 2;
            this.height = this.height || 4;
            this.voxelPixelRatio = this.voxelPixelRatio || 100;

        }



        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'isPerspective':
                    return('<input type="checkbox">');
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


            $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');



            return $element;

        }





        createBoard(container:HTMLElement):HTMLElement{


            let element = super.createBoard(container);

            element.style.width = this.width * this.voxelPixelRatio;
            element.style.height = this.height * this.voxelPixelRatio;
            element.style.overflow = 'hidden';


            let self = this;
            if(this.realObject) {

                element.addEventListener('click', function (event) {

                    r(self);
                    self.realObject.getCreatedBabylonMesh().position.y += BLOCK_SIZE;//material.opacity = Math.random();

                });
            }

            return element;
        }








    }

}