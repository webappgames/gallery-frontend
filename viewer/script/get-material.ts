

namespace GALLERY.Viewer {


    export function getTextureUrl(key) {

        let url: string;
        if (BLOCK_MATERIALS.indexOf(key) !== -1) {
            url = "/media/images/textures/" + key + ".jpg";
            r('Creating native texture ' + key + '.');

        } else {

            let image = textures.findBy('name', key);
            r('finded', image);
            if (image) {

                url = image.getTexture();
                r('Creating texture ' + key + ' from ' + url + '.');

            } else {

                console.warn('There is no texture image with name ' + key + '!');
            }
        }
        return (url);

    }




    let materials = {};//todo maybe DI
    export function getMaterial(key: string, opacity: number) {

        if (typeof materials[key] === 'undefined') {


            let material = new BABYLON.StandardMaterial("Mat", scene);


            if (key.substr(0, 1) == '#') {
                material.diffuseColor = BABYLON.Color3.FromHexString(key);

            } else {
                material.diffuseTexture = new BABYLON.Texture(getTextureUrl(key), scene);

                material.diffuseTexture.uScale = 10;//Vertical offset of 10%
                material.diffuseTexture.vScale = 10;//Horizontal offset of 40%
            }


            material.alpha = opacity;
            material.freeze();

            materials[key] = material;
            /**/

        }

        return (materials[key]);

    }





}