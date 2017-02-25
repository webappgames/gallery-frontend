/// <reference path="../../reference.ts" />

module GALLERY.Objects{

    export class Analytics extends Object{

        public analyticsType: string;
        public domain: string;


        constructor(object){

            super(object);

            this.analyticsType = this.analyticsType || 'gallery';
            this.domain = this.domain || '';

        }

        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'analyticsType':
                    return('<input type="text">');
                case 'domain':
                    return('<input type="text">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-database" aria-hidden="true"></i>');

            return $element;

        }





    }

}