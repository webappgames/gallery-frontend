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


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'deployType':
                    return('<input type="text">');
                case 'server':
                    return('<input type="text">');
                case 'username':
                    return('<input type="text">');
                case 'password':
                    return('<input type="password">');
                case 'directory':
                    return('<input type="text">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }


        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');

            return $element;

        }





    }

}