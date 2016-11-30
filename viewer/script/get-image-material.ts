

namespace GALLERY.Viewer {

    let imagesMaterials = {};//todo DI
    export function getImageMaterial(src: string, isEmitting: boolean, hasAlpha: boolean, backFace: boolean) {

        let key = src + isEmitting + hasAlpha + backFace;//todo better - maybe hash

        if (typeof imagesMaterials[key] === 'undefined') {





            var src = src;
            var src_uri = URI(src)//todo Di
                .removeSearch("width");
            var src_normal = src_uri.addSearch({width: 512}).toString();


            let image_texture = new BABYLON.Texture(src_normal, scene);
            image_texture.hasAlpha = hasAlpha;
            //image_texture.delayLoadState = BABYLON.Engine.DELAYLOADSTATE_NOTLOADED;







            let material = new BABYLON.StandardMaterial("texture4", scene);

            if (isEmitting) {


                material.emissiveTexture = image_texture;


                material.backFaceCulling = !(backFace);
                material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
                material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color
                material.specularPower = 32;
                //box.material.ambientColor = new BABYLON.Color3(1, 1, 1);
                material.ambientColor = new BABYLON.Color3(0, 0, 0); // No ambient color
                material.diffuseColor = new BABYLON.Color3(0, 0, 0);


            } else {

                material.diffuseTexture = image_texture;

            }

            material.freeze();
            imagesMaterials[key] = material;

        }


        return (imagesMaterials[key]);


    }

}