/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Deploy extends Object{


        public deployType: string;
        public server: string;
        public username: string;
        public password: string;
        public directory: string;




        constructor(object){

            super(object);

            this.deployType = this.deployType || 'ftp';
            this.server = this.server || '';
            this.username = this.username || '';
            this.password = this.password || '';
            this.directory = this.directory || '';

        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');

            return $element;

        }





    }

}