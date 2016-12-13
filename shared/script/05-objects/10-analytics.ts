/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Analytics extends Object{

        public analyticsType: string;
        public domain: string;


        constructor(object){

            super(object);

            this.analyticsType = this.analyticsType || 'gallery';
            this.domain = this.domain || '';

        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-database" aria-hidden="true"></i>');

            return $element;

        }





    }

}