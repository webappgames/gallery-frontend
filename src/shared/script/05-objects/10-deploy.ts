/// <reference path="../reference" />

module GALLERY.Objects{

    export class Deploy extends Object{


        public deployType: string;
        public server?: string;
        public username?: string;
        public gallery?: string;
        public password: string;
        public directory?: string;
        public url?: string;




        constructor(object){

            super(object);

            this.deployType = this.deployType || 'ftp';
            this.server = this.server || '';
            this.username = this.username || '';
            this.gallery = this.gallery || '';
            this.password = this.password || '';
            this.directory = this.directory || '';
            this.url = this.url || '';

        }


        toString():string{

            if(this.deployType=='ftp'){

                return(`${this.server} to ${this.directory} via FTP`);

            }else
            if(this.deployType=='ssh'){

                return(`${this.server} to ${this.directory} via SSH`);
            }else
            if(this.deployType=='gallery'){

                return(`${this.gallery} on ${this.url}`);

            }else{
                return super.toString();
            }


        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'deployType':
                    return('<input type="text">');
                case 'server':
                    return('<input type="text">');
                case 'username':
                    return('<input type="text">');
                case 'gallery':
                    return('<input type="text">');
                case 'password':
                    return('<input type="password">');
                case 'directory':
                    return('<input type="text">');
                case 'url':
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