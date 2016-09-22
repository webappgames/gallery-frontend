/// <reference path="../reference.ts" />


function createStairsMesh(name, stairs_count, scene){



    let pathTopA = [];
    let pathTopB = [];

    let pathBottomA = [];
    let pathBottomB = [];



    let a = new BABYLON.Vector3(0, 0,  0.5);
    let b = new BABYLON.Vector3(0, 0, -0.5);

    let i1: number,i2: number;


    for(let i=0;i<stairs_count;i++){


        i1 = (Math.floor((i-1)/2)*2+1);
        i2 = (Math.floor(i/2)*2);

        let top = new BABYLON.Vector3(
            1-(i1/stairs_count)-0.5,
            i2/stairs_count,
            0);

        let bottom = new BABYLON.Vector3(
            1-(i/stairs_count)-0.5,
            i/stairs_count-(2/stairs_count),
            0);


        pathTopA   .push(top   .add(a));
        pathTopB   .push(top   .add(b));
        pathBottomA.push(bottom.add(a));
        pathBottomB.push(bottom.add(b));



    }


    let ribbonTop    = BABYLON.Mesh.CreateRibbon("ribbon", [pathTopB, pathTopA, ], false, false, 0, scene);
    let ribbonBottom = BABYLON.Mesh.CreateRibbon("ribbon", [pathBottomA, pathBottomB], false, false, 0, scene);


    let ribbonA = BABYLON.Mesh.CreateRibbon("ribbon", [pathTopA, pathBottomA], false, false, 0, scene);
    let ribbonB = BABYLON.Mesh.CreateRibbon("ribbon", [pathBottomB, pathTopB], false, false, 0, scene);



    let stairs_mesh = BABYLON.Mesh.MergeMeshes([ribbonTop,ribbonBottom,ribbonA,ribbonB]);
    stairs_mesh.id = name;//todo better
    stairs_mesh.name = name;



    /*
    var stairs_meshes = [];

    for(var i=0;i<stairs_count;i++){



        var stair = BABYLON.Mesh.CreateBox("box", 1, scene);


        stair.scaling.x=1/stairs_count;
        stair.scaling.y=1/(stairs_count+3.33)*2;


        stair.position.x=(-i/stairs_count)+0.5-(1/stairs_count);
        stair.position.y=i/stairs_count-(1.666/stairs_count);



        //r(stair.scaling,stair.position);

        stairs_meshes.push(stair);

    }


    //r(stairs_meshes);
    var stairs_mesh = BABYLON.Mesh.MergeMeshes(stairs_meshes);
    stairs_mesh.id = 'stairs';//todo better
    stairs_mesh.name = 'stairs';
    //r(stairs_mesh);

     */

    return stairs_mesh;




}