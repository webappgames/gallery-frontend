/// <reference path="../reference.ts" />




module GALLERY.Viewer{

    export function showStats() {


        if(!analyticsObject)return;
        if(analyticsObject.analyticsType=='gallery') {


            $.get(STATSERVER_URL + '/' + analyticsObject.domain).done(function (sessions) {
                sessions.forEach(function (session) {


                    if (session.states.length < 2)return;


                    var positions = session.states.map(function (state) {


                        var position = new BABYLON.Vector3(
                            state.x * -BLOCK_SIZE,
                            state.z * BLOCK_SIZE,//todo no use BLOCKS_1NP_LEVEL
                            state.y * BLOCK_SIZE
                        );


                        return (position);


                    });


                    r(positions);

                    var tube = BABYLON.Mesh.CreateTube("tube", positions, 0.5, 3, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);


                    //var lines = BABYLON.Mesh.CreateTube("lines",positions,2,3, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);


                })


            });


        }


    }


}


