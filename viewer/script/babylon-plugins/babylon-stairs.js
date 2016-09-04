function createStairsMesh(name, stairs_count, scene) {
    var stairs_meshes = [];
    for (var i = 0; i < stairs_count; i++) {
        var stair = BABYLON.Mesh.CreateBox("box", 1, scene);
        stair.scaling.x = 1 / stairs_count;
        stair.scaling.y = 1 / stairs_count * 2;
        stair.position.x = (-i / stairs_count) + 0.5 - (1 / stairs_count);
        stair.position.y = i / stairs_count - (1.666 / stairs_count);
        //r(stair.scaling,stair.position);
        stairs_meshes.push(stair);
    }
    //r(stairs_meshes);
    var stairs_mesh = BABYLON.Mesh.MergeMeshes(stairs_meshes);
    //r(stairs_mesh);
    return stairs_mesh;
}
//# sourceMappingURL=babylon-stairs.js.map