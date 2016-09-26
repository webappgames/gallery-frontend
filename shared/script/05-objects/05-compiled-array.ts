


//todo to separate file
function isBlockOn(boxes,x,y,z){
    for(var i=0,l = boxes.length;i<l;i++){
        if(boxes[i].x===x && boxes[i].y===y && boxes[i].z===z && boxes[i].processed===false){
            return(true);
        }
    }
    return(false);
}



function getBlockOn(boxes,x,y,z){

    for(var i=0,l = boxes.length;i<l;i++){
        if(boxes[i].x===x && boxes[i].y===y && boxes[i].z===z && boxes[i].processed===false){
            return(boxes[i]);
        }
    }
    return(null);
}

function processAllBlocksOn(boxes,x,y,z){

    for(var i=0,l = boxes.length;i<l;i++){
        if(boxes[i].x===x && boxes[i].y===y && boxes[i].z===z && boxes[i].processed===false){
            boxes[i].processed = true;
        }
    }
}


function isAllRangeOn(boxes,range){

    //r('isAllRangeOn');
    for(var x = range.x.start ; x<= range.x.end; x++){
        for(var y = range.y.start ; y<= range.y.end; y++){
            for(var z = range.z.start ; z<= range.z.end; z++){

                //r(x,y,z);
                if(!isBlockOn(boxes,x,y,z)){
                    //r('Empty place',isBlockOn(boxes,x,y,z),boxes);
                    return false;
                }

            }
        }
    }

    return true;

}


function processAllRange(boxes,range){

    for(var x = range.x.start ; x<= range.x.end; x++){
        for(var y = range.y.start ; y<= range.y.end; y++){
            for(var z = range.z.start ; z<= range.z.end; z++){

                processAllBlocksOn(boxes,x,y,z);

            }
        }
    }
}













namespace GALLERY.Objects {


    export class CompiledArray extends Array{


        static compile(objects: Array){


            var compiled_objects = new CompiledArray();


            let [blocks, non_blocks] =  objects.splitTypes('block');


            non_blocks.forEach(function (object) {
                compiled_objects.push(object);
            });





            let worlds = blocks.getAllWorlds();
            r('Compiling blocks of these worlds: '+worlds.join(', '));


            worlds.forEach(function (world) {

                //=========================================================================BEGIN WORLD PROCESSING
                var boxes_materials = {};
                blocks.filterWorld(world).forEach(function (object) {



                    object.storey = object.storey || '1NP';
                    var level = BLOCKS_STOREYS_LEVELS[object.storey];

                    /*var position = new BABYLON.Vector3(
                     object.position.x * -BLOCK_SIZE,
                     (level+BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                     object.position.y * BLOCK_SIZE
                     );*/




                    object.material = object.material || 'stone-plain';




                    //var position_vertical = new BABYLON.Vector3(0, BLOCK_SIZE*1.00001, 0);
                    var vertical = BLOCKS_2D_3D_SHAPES[object.shape];

                    var box;


                    //position.x -=BLOCK_SIZE/2;
                    //position.z +=BLOCK_SIZE/2;


                    //r(level);
                    for(var i=0,l=vertical.length;i<l;i++){


                        if(vertical[i]) {

                            /*block =  box_prototypes[object.material].createInstance("room");
                             block.isPickable = true;
                             block.checkCollisions = true;
                             block.position = position;*/

                            boxes_materials[object.material] = boxes_materials[object.material] || [];

                            boxes_materials[object.material].push({
                                x: object.position.x,
                                y: object.position.y,
                                z: i + level,
                                processed: false
                            });

                            //r(i,level);


                            //sunShadowGenerator.getShadowMap().renderList.push(block);

                        }

                        //position = position.add(position_vertical);


                    }


                    blocks.removeObjectById(object.id);


                });



                for(var material in boxes_materials){

                    var boxes = boxes_materials[material];

                    //r(boxes);

                    boxes.forEach(function (box) {
                        if(box.processed===false){

                            //r(1);

                            var range = {
                                x: {start: box.x, end: box.x},
                                y: {start: box.y, end: box.y},
                                z: {start: box.z, end: box.z}
                            };


                            //r(range);

                            //ee();




                            [1,2,3,4,5,6].forEach(function (operation) {


                                var limit = 100;
                                while(isAllRangeOn(boxes,range) && limit>0){
                                    limit--;

                                    //r(operation);

                                    if(operation === 0){}
                                    else if(operation === 1){range.x.end++;}
                                    else if(operation === 2){range.x.start--;}

                                    else if(operation === 3){range.y.end++;}
                                    else if(operation === 4){range.y.start--;}

                                    else if(operation === 5){range.z.end++;}
                                    else if(operation === 6){range.z.start--;}


                                }

                                if(limit==100){
                                    //r(range);
                                    throw new Error('wtf');
                                }


                                if(operation === 0){}
                                else if(operation === 1){range.x.end--;}
                                else if(operation === 2){range.x.start++;}

                                else if(operation === 3){range.y.end--;}
                                else if(operation === 4){range.y.start++;}

                                else if(operation === 5){range.z.end--;}
                                else if(operation === 6){range.z.start++;}


                            });

                            //r(range);
                            processAllRange(boxes,range);



                            compiled_objects.push({

                                type: 'multiblock',
                                material: material,
                                position: {
                                    x: (range.x.start+range.x.end)/2,
                                    y: (range.y.start+range.y.end)/2,
                                    z: (range.z.start+range.z.end)/2
                                },
                                size: {
                                    x: Math.abs(range.x.end-range.x.start)+1,
                                    y: Math.abs(range.y.end-range.y.start)+1,
                                    z: Math.abs(range.z.end-range.z.start)+1,
                                }

                            });


                        }
                    });

                }
                //=========================================================================END OF WORLD PROCESSING
            });








            return(compiled_objects);



        }

    }


}