/// <reference path="./reference.ts" />

module GALLERY.Viewer {




    /*
    let image_texture = new BABYLON.Texture('/media/images/sprite.jpg', scene);
    image_texture.hasAlpha = false;




    export function getImageMaterial(src: string, isEmitting: boolean, hasAlpha: boolean, backFace: boolean) {


        let material = new BABYLON.StandardMaterial("texture4", scene);
        material.diffuseTexture = image_texture;
        return(material);


    }*/

    const enginePlayReasonLoadingTextures = new EnginePlayReason('loading textures');
    playEngine(enginePlayReasonLoadingTextures);

    let texturesCount = 0;
    let texturesLoaded = 0;
    let onTextureLoad = function () {
        texturesLoaded++;
        //r('Loaded texture '+texturesLoaded+' / '+texturesCount);
        if(texturesLoaded == texturesCount){

            pauseEngine(enginePlayReasonLoadingTextures);
            //renderTick();

        }

    };



    let imagesMaterials = {};//todo DI
    export function getImageMaterial(src: string, width: number, isEmitting: boolean, hasAlpha: boolean, backFace: boolean) {

        let key = src + width + isEmitting + hasAlpha + backFace;//todo better - maybe hash

        if (typeof imagesMaterials[key] === 'undefined') {





            var src = src;
            var src_uri = new Uri(src)//todo Di
                .deleteQueryParam("width");
            var src_normal = src_uri.addQueryParam({width: width}).toString();


            let onLoad = function () {
                r('Loaded texture!');
                renderTick();
            };


            texturesCount++;
            let image_texture = new BABYLON.Texture(src_normal, scene, false, true, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, onTextureLoad);
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