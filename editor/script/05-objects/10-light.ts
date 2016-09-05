


module GALLERY.Objects{

    export class block extends object{




        static create$Element(){



            var $element = super();
            let object = this;

            $element.html('<i style="color:'+object.color+';" class="fa fa-sun-o" aria-hidden="true"></i>');


            return $element;

        }





    }

}