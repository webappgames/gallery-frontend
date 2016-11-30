
namespace GALLERY.Viewer {

    export var gates, keys;


    export function unlockGatesAndActivateKeys(key: string) {


        let opening = 0, closing = 0;

        gates.forEach(function (gate) {

            if (gate.object.key == key) {
                gate.mesh.checkCollisions = false;
                gate.mesh.material.alpha = 0.1;

                opening++;

            } else {
                gate.mesh.checkCollisions = true;
                gate.mesh.material.alpha = 0.95;

                closing++;
            }

        });


        let activating = 0, inactivating = 0;

        links.forEach(function (link) {

            //r(link.object.href.substr(0,1));

            if (link.object.href.substr(0, 1) === '#') {
                if (link.object.href == key) {
                    link.mesh.checkCollisions = false;
                    link.mesh.material.alpha = 0.1;

                    inactivating++;
                } else {

                    link.mesh.checkCollisions = true;
                    link.mesh.material.alpha = 0.95;

                    activating++;
                }
            }

        });


        r('Opening ' + opening + ' gates, closing ' + closing + ' gates. Activating ' + activating + ' keys, inactivating ' + inactivating + ' keys.');


    }


}