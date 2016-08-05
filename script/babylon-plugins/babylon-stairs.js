


function createStairsMesh(name, stairs_count, scene){



    var stairs_meshes = [];

    for(var i=0;i<stairs_count;i++){



        var stair = BABYLON.Mesh.CreateBox("box", 1, scene);


        stair.scaling.x=1/stairs_count;
        stair.scaling.y=1/stairs_count;


        stair.position.x=stair/stairs_count;
        stair.position.y=stair/stairs_count;



        stairs_meshes.push(stair);

    }


    var stairs_mesh = BABYLON.Mesh.MergeMeshes(stairs_meshes);



    return stairs_mesh;
}