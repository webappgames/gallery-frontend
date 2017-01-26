/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Poster extends Image{

        public posterHtml:string;



        constructor(object){

            super(object);

            this.posterHtml = this.posterHtml || '';

        }



        /*getSrc(width=0,ratio=0){//todo use this

            let uri = URI(this.src);

            if(width)uri.addSearch({width: width});
            if(ratio)uri.addSearch({ratio: ratio});

            return uri.toString();


        }*/


    }

}