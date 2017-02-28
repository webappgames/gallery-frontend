/// <reference path="../app" />
/// <reference path="../app-engine" />

/// <reference path="../reference" />

d('get-image-material');


module GALLERY.Viewer {


    /*const enginePlayReasonLoadingTextures = new AppEnginePlayReason('loading textures');
    appEngine.play(enginePlayReasonLoadingTextures);


    let texturesCount = 0;
    let texturesLoaded = 0;
    let onTextureLoad = function () {
        texturesLoaded++;
        //r('Loaded texture '+texturesLoaded+' / '+texturesCount);
        if(texturesLoaded == texturesCount){

            appEngine.pause(enginePlayReasonLoadingTextures);
            //appEngine.renderTick();

        }

    };*/



    export function getImageMaterial(src: string, width: number, isEmitting: boolean, hasAlpha: boolean, backFace: boolean) {

        this.imagesMaterials = this.imagesMaterials||{};


        let key = src + width + isEmitting + hasAlpha + backFace;//todo better - maybe hash

        if (typeof this.imagesMaterials[key] === 'undefined') {





            var src = src;
            var src_uri = new Uri(src)//todo Di
                .deleteQueryParam("width");
            var src_normal = src_uri.addQueryParam({width: width}).toString();


            let onLoad = function () {
                r('Loaded texture!');
                appEngine.renderTick();
            };


            let enginePlayReasonLoadingTexture =  new AppEnginePlayReason('loading textures');

            appEngine.play(enginePlayReasonLoadingTexture);
            let image_texture = new BABYLON.Texture(src_normal, scene, false, true, BABYLON.Texture.TRILINEAR_SAMPLINGMODE, function () {

                appEngine.pause(enginePlayReasonLoadingTexture);

            });
            image_texture.hasAlpha = hasAlpha;


            //image_texture.delayLoadState = BABYLON.AppEngine.DELAYLOADSTATE_NOTLOADED;







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
            this.imagesMaterials[key] = material;

        }


        return (this.imagesMaterials[key]);


    }

}
