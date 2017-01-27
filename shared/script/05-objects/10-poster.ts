/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Poster extends Image{

        public posterHtml:string;



        constructor(object){

            super(object);

            this.posterHtml = this.posterHtml || '';


            this.src = this.src || 'http://cdn.pavolhejny.com/?file=5888cb789f36f-M2Q5OGMxNTk1N2M1ZjVkZDIyN2U1M2RiYzdjYmI2MGQuanBn';
            this.width = this.width || 1;
            this.height = this.height || 1;


        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'posterHtml': return('<textarea></textarea>');
                default:  return(super.getEditorInputHtml(key));
            }

        }



        /*getSrc(width=0,ratio=0){//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});

            return uri.toString();


        }*/


    }

}