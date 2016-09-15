


var gates;




function unlockGates(){


    gates.forEach(function (gate) {

        if(gate.object.key==location.hash){
            gate.mesh.checkCollisions = false;
            gate.mesh.material.alpha=0.1;
        }else{
            gate.mesh.checkCollisions = true;
            gate.mesh.material.alpha=0.95;
        }

    });


}