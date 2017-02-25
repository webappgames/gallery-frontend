


//todo to other place
function isBlockOn(boxes,x,y,z){
    for(var i=0,l = boxes.length;i<l;i++){
        if(boxes[i].x===x && boxes[i].y===y && boxes[i].z===z && boxes[i].processed===false){
            return(true);
        }
    }
    return(false);
}



function isBlockOnSearchAllMaterials(boxes_materials,x,y,z){

    for(let material in boxes_materials){
        if(isBlockOn(boxes_materials[material],x,y,z)){
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













module GALLERY.Objects {


    export class CompiledArray extends Array{


        static compile(objects: Array){

            var start = new Date().getTime();
            function time(){
                var end = new Date().getTime();
                return(Math.round((end - start)/1000*10)/10+'s');
            }
            r('Compilation started');




            var compiled_objects = new CompiledArray();




            let [blocks, non_blocks] =  objects.removeTypes('deploy').splitTypes('block');



            r('Working on '+non_blocks.getAll().length+' non block objects!');

            non_blocks.forEach(function (object) {
                compiled_objects.push(object);
            });


            var block_stat = {
                all: blocks.getAll().length,
                done: 0
            };
            r('Working on '+blocks.getAll().length+' non block objects!');




            let worlds = blocks.getAllWorlds();
            r('Compiling blocks of these worlds: '+worlds.join(', '));


            worlds.forEach(function (world) {


                r('Compiling world '+world+' at '+time());

                //=========================================================================BEGIN WORLD PROCESSING
                var boxes_materials = {};
                blocks.filterWorld(world).sort(function (blockA,blockB) {

                    return(BLOCKS_STOREYS_LEVELS[blockA.storey]-BLOCKS_STOREYS_LEVELS[blockB.storey]);

                }).forEach(function (object) {



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



                            //todo check if there is box on that position


                            let x = object.position.x,
                                y= object.position.y,
                                z= i + level;


                            if(isBlockOnSearchAllMaterials(boxes_materials,x,y,z)){


                            }else {


                                boxes_materials[object.material+'|'+object.opacity] = boxes_materials[object.material+'|'+object.opacity] || [];

                                boxes_materials[object.material+'|'+object.opacity].push({
                                    x: x,
                                    y: y,
                                    z: z,
                                    processed: false
                                });


                            }
                            //r(i,level);


                            //sunShadowGenerator.getShadowMap().renderList.push(block);

                        }

                        //position = position.add(position_vertical);


                    }


                    //blocks.removeObjectById(object.id);
                    block_stat.done++;

                    if(block_stat.done%500===500-1){
                        r((Math.round(block_stat.done/block_stat.all*100*100)/100)+'% Converting blocks to boxes ('+world+')');
                    }



                });


                r('In world '+world+' are all blocks converted to boxes.');










                for(var material in boxes_materials){

                    var boxes = boxes_materials[material];


                    //---------------------------------------
                    r(world + '[' + material + ']: ' +' Sorting boxes.');

                    boxes.sort(function (boxA,boxB) {
                        return(boxB.z - boxA.z)
                    });


                    r(world + '[' + material + ']: ' +' Boxes sorted');
                    //---------------------------------------



                    var last_boxes_length = boxes.length;


                    while(boxes.length!==0){
                    //boxes.forEach(function (box, box_i) {


                        //if (box_i % 1000 === 1000 - 1) {
                        //    r(world + '[' + material + ']: ' + (Math.round(box_i / boxes.length * 100 * 100) / 100) + '% Making  multiblocks from ' + boxes.length + ' boxes.');
                        //}

                        if (boxes.length+1000 < last_boxes_length) {
                            last_boxes_length = boxes.length;
                            r(world + '[' + material + ']: ' +' Making  multiblocks from remaining ' + boxes.length + ' boxes.');
                        }



                        //if (box.processed === false) {

                            //r(1);


                            var box = boxes[0];

                            var range = {
                                x: {start: box.x, end: box.x},
                                y: {start: box.y, end: box.y},
                                z: {start: box.z, end: box.z}
                            };


                            //r(range);

                            //ee();


                            [1, 2, 3, 4, 5, 6].forEach(function (operation) {


                                var limit = 1000;
                                while (isAllRangeOn(boxes, range) && limit > 0) {
                                    limit--;

                                    //r(operation);

                                    if (operation === 0) {
                                    }
                                    else if (operation === 1) {
                                        range.x.end++;
                                    }
                                    else if (operation === 2) {
                                        range.x.start--;
                                    }

                                    else if (operation === 3) {
                                        range.y.end++;
                                    }
                                    else if (operation === 4) {
                                        range.y.start--;
                                    }

                                    else if (operation === 5) {
                                        range.z.end++;
                                    }
                                    else if (operation === 6) {
                                        range.z.start--;
                                    }


                                }

                                if (limit == 1000) {
                                    //r(range);
                                    throw new Error('wtf');
                                }


                                if (operation === 0) {
                                }
                                else if (operation === 1) {
                                    range.x.end--;
                                }
                                else if (operation === 2) {
                                    range.x.start++;
                                }

                                else if (operation === 3) {
                                    range.y.end--;
                                }
                                else if (operation === 4) {
                                    range.y.start++;
                                }

                                else if (operation === 5) {
                                    range.z.end--;
                                }
                                else if (operation === 6) {
                                    range.z.start++;
                                }


                            });

                            //r(range);
                            processAllRange(boxes, range);
                            boxes = boxes.filter(function(box){

                                return(!box.processed);

                            });

                            let extMaterial = material.split('|');

                            compiled_objects.push({

                                type: 'multiblock',
                                world: world,
                                material: extMaterial[0],
                                opacity: parseFloat(extMaterial[1]),
                                position: {
                                    x: (range.x.start + range.x.end) / 2,
                                    y: (range.y.start + range.y.end) / 2,
                                    z: (range.z.start + range.z.end) / 2
                                },
                                size: {
                                    x: Math.abs(range.x.end - range.x.start) + 1,
                                    y: Math.abs(range.y.end - range.y.start) + 1,
                                    z: Math.abs(range.z.end - range.z.start) + 1,
                                }

                            });


                        //}

                    };
                    //});



                }
                //=========================================================================END OF WORLD PROCESSING

                r('World '+world+' compiled at '+time());


            });



            r('Final sorting at '+time());
            compiled_objects.getAll().sort(function(objectA,objectB){

                let indexA = 0, indexB = 0;

                if(objectA.type == 'link')indexA=-1;
                if(objectB.type == 'link')indexB=-1;


                if(objectA.type == 'environment')indexA=1;
                if(objectB.type == 'environment')indexB=1;



                return(indexB-indexA);
            });




            r('Created '+compiled_objects.getAll().length+' compiled objects from '+objects.getAll().length+' objects in time of '+time()+'!');


            return(compiled_objects);



        }

    }


}