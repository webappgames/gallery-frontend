/// <reference path="10-board" />



namespace GALLERY.Objects{

    export class Button extends Poster{


        constructor(object){

            super(object);

        }


        createVirtualObjects():Objects.Array{
            return(null);
        }


        handleEventPress(){
            this.reshape();
        }



    }

}