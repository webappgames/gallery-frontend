


var gates,keys;




function unlockGatesAndActivateKeys(){


    let opening=0,closing=0;

    gates.forEach(function (gate) {

        if(gate.object.key==location.hash){
            gate.mesh.checkCollisions = false;
            gate.mesh.material.alpha=0.1;

            opening++;

        }else{
            gate.mesh.checkCollisions = true;
            gate.mesh.material.alpha=0.95;

            closing++;
        }

    });


    r('Opening '+opening+' gates, Closing '+closing+' gates. ');


    links.forEach(function (link) {

        if(link.object.href==location.hash){
            link.mesh.checkCollisions = false;
            link.mesh.material.alpha=0.1;
        }else{

            link.mesh.checkCollisions = true;
            link.mesh.material.alpha=0.95;
        }

    });







}