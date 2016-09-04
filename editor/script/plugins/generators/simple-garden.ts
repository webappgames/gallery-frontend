



module Plugins.Generators {


    export function SimpleGarden(images) {


        const min_size = 10;
        const distance_between_images = 1;


        let width = 4 * distance_between_images;



        images.forEach(function (image) {

            //r(image);

            width += image.width;
            width += distance_between_images;
        });





        let y = 0;
        var new_objects = [];
        images.forEach(function (image) {

            image.storey = '1NP';
            image.position.x = 0;
            image.position.y = y;

            y += image.height;

            new_objects.push(image);
        });
        return(new_objects);


        //r(width);




    }


}