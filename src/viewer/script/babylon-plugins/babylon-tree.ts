/// <reference path="../reference.ts" />



function createTreeMesh(name, size, length, psi, bow, kink, detail, sections, branches, spirals, scale, start,scene) {
    var angle = 2*Math.PI/spirals;
    var tree_base = createBranch("branch",  size, length, 0, bow, kink, detail, sections, branches, 0, 0, start, scale, scene); //trunk
    var tree = tree_base.branch;  //mesh for tree
    var tree_points = tree_base.points; //array of points for starting positions
    var tree_scales = tree_base.scales; // array of scales to scale branch width by position
    psi = -psi;

    var n = 1;
    var b = 0;

    while(size*Math.pow(scale, n)>0.1 && b<branches) { //only create new tree if scale not too small
        var new_tree = drawTree(name, tree, tree_scales[b], length*tree_scales[b], psi, bow, kink, detail, sections, branches, b, 1, scale, tree_points[b],scene);
        n++;
        b++;
        tree = BABYLON.Mesh.MergeMeshes([tree, new_tree]);  //merge for final rotation
    }
    tree.scaling = new BABYLON.Vector3(size, size, size);
    tree.rotation.x = -Math.PI/2; //stand tree up (result of extrusion along z)

    return tree;

    //Note many parameters randomized by +/- 5 percent

    function createBranch(name,  size, length, psi, bow, kink, detail, sections, branches, turn, direction, start, scale, scene) {
        psi += Math.random()* psi/10 - psi/20;

        //cross section to extrude
        var cross_section =  [];
        var cross_section_radius = size;
        for(let theta = 0; theta<2*Math.PI; theta+=Math.PI/10) {
            cross_section.push(new BABYLON.Vector3(cross_section_radius*Math.cos(theta), cross_section_radius*Math.sin(theta), 0));
        }
        cross_section.push(cross_section[0]);

        length -= Math.random()*length/10;
        var height = length * (1 - Math.pow(scale, (sections+1)))/(1 - scale);	//full height of tree
        var gap = (height - length)/branches; //gap between branches
        var twist = (height - length)/sections;	//used for bow occurances

        let branch_direction = [];	//path for extrusion
        var ring_size = height/(detail*sections);
        var Bdirection;
        for(var d=0; d<length; d+=ring_size) {
            Bdirection = new BABYLON.Vector3(0, bow * Math.sin(Math.PI*d/twist), d);
            Bdirection.x +=Math.random()*(Bdirection.x/10) - Bdirection.x/20;
            Bdirection.y +=Math.random()*(Bdirection.y/10) - Bdirection.y/20;
            Bdirection.z +=Math.random()*(Bdirection.z/10) - Bdirection.z/20;
            branch_direction.push(Bdirection);
        }
        for(var s = 0; s<sections-1; s++) {
            for(let d:number=length + s * gap*Math.pow(scale,s); d<length + (s+1) * gap*Math.pow(scale,s+1); d+=ring_size) {
                Bdirection = new BABYLON.Vector3(((s+1)*kink*Math.pow(scale,s+1)*d/height + s * kink*Math.pow(scale,s)),bow*Math.pow(scale,s)* Math.sin(Math.PI*d/twist) + (s+1)*kink*Math.pow(scale,s+1)*d/height + s * kink*Math.pow(scale,s),d);
                Bdirection.x +=Math.random()*(Bdirection.x/10) - Bdirection.x/20;
                Bdirection.y +=Math.random()*(Bdirection.y/10) - Bdirection.y/20;
                Bdirection.z +=Math.random()*(Bdirection.z/10) - Bdirection.z/20;
                branch_direction.push(Bdirection);
            }
        }

        var branch_scales =[];
        var branch_heights = new BABYLON.Path3D(branch_direction).getDistances();
        var max_height = 0;
        var branch_height;
        while(branch_heights.length>0) {
            branch_height = branch_heights.pop();
            branch_scales.push(branch_height*0.975/max_height);
            max_height = Math.max(max_height, branch_height);
        }

        var branch_points = [];
        var branch_point_scales =[];
        var blen = branch_direction.length;
        for(var b=0; b<branches; b++) {
            branch_points[b] = branch_direction[Math.floor((length + b*gap)*blen/height)];
            branch_point_scales[b] = branch_scales[Math.floor((length*0.8 + b*gap)*blen/height)];
        }

        var branch_scale = function(i, distance) {
            var scale = 1 - distance*0.975/max_height;
            return scale;
        }
        var branch = BABYLON.MeshBuilder.ExtrudeShapeCustom(name, {shape: cross_section, path: branch_direction, scaleFunction: branch_scale}, scene);
        branch.scaling.y = size;
        branch_points = branch_points.map(function(vec3) {
            return new BABYLON.Vector3(vec3.x, vec3.y*size, vec3.z);
        });
        branch.position = start;

        var Aturn=angle*turn;
        Aturn += Math.random()*Aturn/10 - Aturn/20;

        if(direction>0) {
            branch.rotate(BABYLON.Axis.X, psi, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function(vec3) {
                return new BABYLON.Vector3(vec3.x, vec3.y*Math.cos(psi)-vec3.z*Math.sin(psi), vec3.y*Math.sin(psi)+vec3.z*Math.cos(psi));
            });
            branch.rotate(BABYLON.Axis.Z, Aturn, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function(vec3) {
                return new BABYLON.Vector3(vec3.x*Math.cos(Aturn) - vec3.y*Math.sin(Aturn), vec3.x*Math.sin(Aturn)+vec3.y*Math.cos(Aturn), vec3.z);
            });

        }
        else {
            branch.rotate(BABYLON.Axis.Y, Aturn, BABYLON.Space.WORLD);
            branch_points = branch_points.map(function(vec3) {
                return new BABYLON.Vector3(vec3.x*Math.cos(Aturn) + vec3.z*Math.sin(Aturn), vec3.y, -vec3.x*Math.sin(Aturn) + vec3.z*Math.cos(Aturn));
            });
        }

        branch_points = branch_points.map(function(vec3) {
            return vec3.addInPlace(start);
        });

        return {branch:branch, points:branch_points, scales:branch_point_scales};
    }

    //recursive function to draw tree
    function drawTree(name, tree, size, length, psi, bow, kink, detail, sections, branches, turn, direction, scale, start,scene) {

        var branch_base = createBranch("branch",  size, length, psi, bow, kink, detail, sections, branches, turn, direction, start, scale, scene);
        var branch_mesh = branch_base.branch;
        var branch_points = branch_base.points;
        var branch_scales = branch_base.scales;

        var n = 1;
        var b = 0;
        tree = BABYLON.Mesh.MergeMeshes([tree, branch_mesh]);
        while(size*Math.pow(scale, n)>0.1 && b<branches) {
            var spur = branch_points[b];
            var new_tree = drawTree("branch", tree, size*branch_scales[b], length*branch_scales[b], psi, bow, kink, detail, sections, branches, b, (direction+1)%2, scale, spur, scene);
            n++;
            b++;
            tree = BABYLON.Mesh.MergeMeshes([tree, new_tree]);
        }

        return tree;
    }


}