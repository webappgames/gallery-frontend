



module GALLERY.Plugins.Generators {


    export function SimpleGarden(images) {


        const min_size = 10;
        const distance_between_images = 1;


        let width = 0;//4 * distance_between_images;



        images.forEach(function (image) {

            //r(image);

            width += image.width;
            width += distance_between_images;
        });

        width = width / 4;

        width = Math.ceil(width);

        width+=2;



        var new_objects = [];




        let shape;
        for(let x=0;x<width;x++){
            for(let y=0;y<width;y++){


                if(x===0 || y===0 || x===width-1 || y===width-1){

                    shape = 'wall';
                }else{
                    shape = 'room';
                }


                new_objects.push({

                    type: 'block',
                    position: {x:x-width/2,y:y-width/2},
                    storey: '1NP',
                    shape: shape,
                    material: 'stone-plain'
                });

            }
        }





        var walls = new_objects.filter(function (object) {
            return(object.type==='block' && object.shape==='wall');
        });




        var positions_rotations = [];
        walls.forEach(function (wall) {


            let testing_positions_rotations = [
                {x:wall.position.x-1,y:wall.position.y,rotation:0},
                {x:wall.position.x+1,y:wall.position.y,rotation:180},
                {x:wall.position.x,y:wall.position.y-1,rotation:270},
                {x:wall.position.x,y:wall.position.y+1,rotation:90}
            ];

            testing_positions_rotations.forEach(function (position) {

                if(!GALLERY.Objects.Block.isWallOn(walls,position,storey_selected)){
                    positions_rotations.push(position);
                }

            });

        });



        r(positions_rotations);

        if(positions_rotations.length<images.length){
            throw new Error('Not enough positions for images.');
        }




        images.forEach(function (image,i) {


            image.position = {
                x:positions_rotations[i].x,
                y:positions_rotations[i].y
            };

            image.rotation = positions_rotations.rotation;

            new_objects.push(image);
        });






        /*let section = 0;
        let section_x = 0;
        images.forEach(function (image) {

            r(section,section_x);

            image.storey = '1NP';

            let position;
            if(section===0){
                position = {
                    x: width/2,
                    y: section_x-width/2
                };
                image.rotation = 90;
            }else
            if(section===1){
                position = {
                    x: width/2-section_x,
                    y: width/-2
                };
                image.rotation = 180;
            }else
            if(section===2){
                position = {
                    x: width/2/-2,
                    y: width-section_x
                };
                image.rotation = 270;
            }else
            if(section===3){
                position = {
                    x: section_x-width/2,
                    y: width/2
                };
                image.rotation = 0;
            }else{
                throw new Error('images overflow');
            }

            section_x += image.width + distance_between_images;
            if(section_x>width){
                section_x = 0;
                section++;
            }

            image.position = position;
            new_objects.push(image);


        });*/
        return(new_objects);


        //r(width);




    }


}