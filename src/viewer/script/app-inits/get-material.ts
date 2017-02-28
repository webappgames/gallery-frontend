/// <reference path="../app" />

/// <reference path="../reference" />

d('get-material');



module GALLERY.Viewer {


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





    let texturesCache = {};//todo maybe DI
    export function getTexture(key: string, noCache=false):BABYLON.Texture {//todo DI scene

        if (typeof texturesCache[key] === 'undefined' || noCache) {

            let texture = new BABYLON.Texture(getTextureUrl(key), scene);

            if(noCache){
                return(texture);
            }else{
                texturesCache[key] = texture;
            }
            /**/

        }

        return (texturesCache[key]);

    }







    let materialsCache = {};//todo maybe DI
    export function getMaterial(key: string, opacity: number, noCache=false, uScale=10, vScale=10) {//todo DI scene

        let cacheKey = [key,opacity,uScale,vScale].join('|');

        if (typeof materialsCache[cacheKey] === 'undefined' || noCache) {


            let material = new BABYLON.StandardMaterial("Mat", scene);


            if (key.substr(0, 1) == '#') {
                material.diffuseColor = BABYLON.Color3.FromHexString(key);

            } else {
                material.diffuseTexture = getTexture(key,noCache);//new BABYLON.Texture(getTextureUrl(key), scene);

                material.diffuseTexture.uScale = uScale;
                material.diffuseTexture.vScale = vScale;
            }


            material.alpha = opacity;
            material.freeze();

            if(noCache){
                return(material);
            }else{
                materialsCache[cacheKey] = material;
            }
            /**/

        }

        return (materialsCache[cacheKey]);

    }





}
