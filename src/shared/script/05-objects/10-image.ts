/// <reference path="../../reference" />

module GALLERY.Objects {

    export class Image extends Object {

        public storey: string;
        public design: string;
        public name: string;
        public html: string;

        public uri: string;
        public parent: string;
        public width: number;
        public height: number;
        public offsetVertical: number;
        public offsetHorizontal: number;
        public offsetFrontal: number;

        public _vectorVertical: BABYLON.Vector3;
        public _vectorHorizontal: BABYLON.Vector3;
        public _vectorFrontal: BABYLON.Vector3;


        public src: string;

        public rotation: number;
        public onGround: boolean;
        public hasAlpha: boolean;
        public isEmitting: boolean;
        public checkCollisions: boolean;
        public backFace: boolean;
        public isSolid: boolean;


        constructor(object) {

            super(object);

            this.design = this.design || 'board';
            this.name = this.name || '';
            this.html = this.html || '';


            this.uri = this.uri || 'none';
            this.parent = this.parent || 'none';


            this.rotation = this.rotation || 0;
            this.onGround = this.onGround || false;
            this.hasAlpha = this.hasAlpha || false;
            if (typeof this.isEmitting == 'undefined') {
                this.isEmitting = true;
            }
            this.checkCollisions = this.checkCollisions || false;
            this.backFace = this.backFace || false;
            this.isSolid = this.isSolid || false;

            this.offsetHorizontal = this.offsetHorizontal || 0;
            this.offsetVertical = this.offsetVertical || 0;
            if (typeof this.offsetFrontal == 'undefined') {
                this.offsetFrontal = 1 / 100;
            }


        }


        getEditorInputHtml(key: string): string {

            switch (key) {

                case 'width':
                    return ('<input type="number">');
                case 'height':
                    return ('<input type="number">');

                case 'offsetHorizontal':
                    return ('<input type="number">');
                case 'offsetVertical':
                    return ('<input type="number">');
                case 'offsetFrontal':
                    return ('<input type="number">');


                case 'uri':
                    return ('<input type="text">');
                case 'parent':
                    return ('<input type="text">');
                case 'rotation':
                    return ('<input type="number">');
                case 'onGround':
                    return ('<input type="checkbox">');
                case 'hasAlpha':
                    return ('<input type="checkbox">');
                case 'isEmitting':
                    return ('<input type="checkbox">');
                case 'checkCollisions':
                    return ('<input type="checkbox">');
                case 'backFace':
                    return ('<input type="checkbox">');
                case 'isSolid':
                    return ('<input type="checkbox">');


                case 'design':
                    return ('<input type="text">');
                case 'name':
                    return ('<input type="text">');
                case 'html':
                    return ('<textarea></textarea>');
                case 'buttons':
                    return ('<textarea></textarea>');
                default:
                    return (super.getEditorInputHtml(key));
            }

        }


        create$Element() {


            var $element = this._create$Element();
            //let object = this;


            /* var src = object.src;
             var src_uri = URI(src)
             .removeSearch("width");
             var src_normal = src_uri.addSearch({width: 100}).toString();*/


            if (this.onGround) {


                var $image = $('<img>').addClass('image');


                var width = this.width * zoom_selected;
                var height = this.height * zoom_selected;

                $image.css('width', width);
                $image.css('height', height);

                $image.attr('src', this.getSrc(100));

                $image.css('position', 'relative');
                $image.css('top', -height / 2);
                $image.css('left', -width / 2);


                //r(object.rotation);
                if (this.rotation) {
                    $image.css('transform', 'rotate(' + this.rotation + 'deg)');
                }


                $element.append($image);
                //$element.css('transform','rotate('+object.rotation+'deg)');


            } else {


                var $image_0 = $('<img>').addClass('image-0').hide();
                var $image_90 = $('<img>').addClass('image-90').hide();
                var $image_180 = $('<img>').addClass('image-180').hide();
                var $image_270 = $('<img>').addClass('image-270').hide();


                $image_0  .css('height', this.height * zoom_selected);
                $image_180.css('height', this.height * zoom_selected);
                $image_90 .css('width', this.height * zoom_selected);
                $image_270.css('width', this.height * zoom_selected);


                $image_0  .attr('src', this.getSrc(100, 0, 0));
                $image_90 .attr('src', this.getSrc(100, 0, 90));
                $image_180.attr('src', this.getSrc(100, 0, 180));
                $image_270.attr('src', this.getSrc(100, 0, 270));


                //rotateImage($image_90[0],90);
                //rotateImage($image_180[0],180);
                //rotateImage($image_270[0],270);


                if (this.rotation === 0) {
                    $image_0.show();
                } else if (this.rotation === 90) {
                    $image_90.show();
                } else if (this.rotation === 180) {
                    $image_180.show();
                } else if (this.rotation === 270) {
                    $image_270.show();
                } else {
                    $image_0.show();
                }


                $element.append($image_0);
                $element.append($image_90);
                $element.append($image_180);
                $element.append($image_270);

            }


            return $element;

        }


        getSrc(width = 0, ratio = 0, rotation = 0): string {//todo use this

            let uri = new Uri(this.src);

            if (width)uri.addQueryParam('width',width);
            if (ratio)uri.addQueryParam('ratio',ratio);
            if (rotation)uri.addQueryParam('rotation',rotation);

            return uri.toString();


        }


        getTexture() {
            return (this.src);
        }


        createImageMesh(scene: BABYLON.Scene): BABYLON.Mesh {
            let quality;

            if (window.innerWidth > 1024) {
                quality = 1024;
            } else if (window.innerWidth > 512) {
                quality = 512;
            } else {
                quality = 256;
            }

            let distance = 5;

            let image00 = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
            image00.material = Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);


            const lods = 5;
            let mesh;

            for (let lod = 0; lod < lods; lod++) {

                quality = quality / 2;
                distance = distance * 2;

                mesh = BABYLON.Mesh.CreatePlane(this.id, BLOCK_SIZE, scene);
                mesh.material = Viewer.getImageMaterial(this.src, quality, this.isEmitting, this.hasAlpha, this.backFace);
                image00.addLODLevel(distance, mesh);


            }


            return image00;

        }


        createBabylonMesh(scene: BABYLON.Scene): BABYLON.Mesh {

            let object = this;
            let position = this.getBabylonPosition();


            if (typeof this.rotation !== 'number') {
                this.rotation = 0;
            }//todo remove


            let rotation_rad = (object.rotation / 180) * Math.PI;

            let image = this.createImageMesh(scene);


            image.scaling.x = object.width;
            image.scaling.y = object.height;


            if (object.onGround) {


                image.position = position;
                image.position.y = (this.getLevelNumber() + BLOCKS_1NP_LEVEL + 0.5) * BLOCK_SIZE + 0.1;


                image.rotation.x = Math.PI / 2;
                image.rotation.y = Math.PI + rotation_rad;


            } else {


                this._vectorVertical = new BABYLON.Vector3(
                    0
                    , -BLOCK_SIZE
                    , 0
                );
                this._vectorHorizontal = new BABYLON.Vector3(
                    -Math.cos(rotation_rad) * BLOCK_SIZE
                    , 0
                    , -Math.sin(rotation_rad) * BLOCK_SIZE
                );
                this._vectorFrontal = new BABYLON.Vector3(
                    Math.sin(rotation_rad) * BLOCK_SIZE
                    , 0
                    , Math.cos(rotation_rad) * BLOCK_SIZE
                );


                position
                    .addInPlace(this._vectorVertical  .scale(this.offsetVertical))
                    .addInPlace(this._vectorHorizontal.scale(this.offsetHorizontal))
                    .addInPlace(this._vectorFrontal   .scale(this.offsetFrontal));


                /*position.y -= this.offsetVertical * BLOCK_SIZE;

                 position.x -= this.offsetHorizontal * Math.cos(rotation_rad) * BLOCK_SIZE ;
                 position.z -= this.offsetHorizontal * Math.sin(rotation_rad) * BLOCK_SIZE ;


                 position.x += Math.sin(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;
                 position.z += Math.cos(rotation_rad) * BLOCK_SIZE * this.offsetFrontal;*/


                image.position = position;


                //(level + BLOCKS_1NP_LEVEL) * BLOCK_SIZE
                //image.position.y = (/*level + BLOCKS_1NP_LEVEL +*/ EYE_VERTICAL) * BLOCK_SIZE ;

                image.rotation.y = Math.PI + rotation_rad;
                image.position.y += (EYE_VERTICAL - BLOCKS_1NP_LEVEL) * BLOCK_SIZE;


                if (object.isSolid) {
                    let boxMesh = new BABYLON.Mesh.CreateBox(this.id, BLOCK_SIZE, scene);


                    let textureA = image.material;

                    let textureB = new BABYLON.StandardMaterial("material1", scene);
                    textureB.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);


                    let multiTexture = new BABYLON.MultiMaterial("multimaterial", scene);
                    multiTexture.subMaterials.push(textureB);
                    multiTexture.subMaterials.push(textureA);
                    multiTexture.subMaterials.push(textureB);
                    multiTexture.subMaterials.push(textureB);
                    multiTexture.subMaterials.push(textureB);
                    multiTexture.subMaterials.push(textureB);


                    boxMesh.subMeshes = [];
                    let verticesCount = boxMesh.getTotalVertices();
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 0, 6, boxMesh));
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(1, 1, verticesCount, 6, 6, boxMesh));
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(2, 2, verticesCount, 12, 6, boxMesh));
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(3, 3, verticesCount, 18, 6, boxMesh));
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(4, 4, verticesCount, 24, 6, boxMesh));
                    boxMesh.subMeshes.push(new BABYLON.SubMesh(5, 5, verticesCount, 30, 6, boxMesh));
                    boxMesh.material = multiTexture;


                    boxMesh.rotation = image.rotation;
                    boxMesh.position = image.position.clone();
                    boxMesh.scaling = image.scaling.clone();
                    boxMesh.scaling.z = this.offsetFrontal;

                    boxMesh.position.x += Math.sin(rotation_rad) * BLOCK_SIZE * this.offsetFrontal * -0.5;
                    boxMesh.position.z += Math.cos(rotation_rad) * BLOCK_SIZE * this.offsetFrontal * -0.5;

                    image.dispose();
                    return (boxMesh);

                }

            }


            //image.scaling.z = 0.1;


            image.checkCollisions = object.checkCollisions;

            r('Created image mesh', image);
            return (image);

            //r(object);
            //r(image);


        }


        reshape() {

        }



        private virtualObjects: Objects.Array;//todo maybe in Object
        createVirtualObjects(): Objects.Array {

            this.virtualObjects = new Objects.Array();


            let object = this;
            let position = this.getBabylonPosition();


            if (typeof this.rotation !== 'number') {
                this.rotation = 0;
            }//todo remove
            let rotation_rad = (object.rotation / 180) * Math.PI;//todo method


            if (typeof object.rotation === 'number') {
                if (!object.onGround) {


                    r('Creating zone for ' + object.name);


                    let uri: string;
                    if (object.uri && object.uri != 'none') {
                        uri = object.uri;
                    } else if (object.name) {
                        uri = '/' + createUriFromName(object.name);
                        object.uri = uri;
                    } else {

                        //uri = '/' + (object.id.split('-')[0]);
                        uri = '/:' + object.id;
                        //object.uri = uri;
                    }


                    let size = Math.max(object.width, object.height);

                    let x = Math.sin(rotation_rad) * size / -2;
                    let y = Math.cos(rotation_rad) * size / 2;


                    let zone = new Objects.Zone({

                        id: createGuid(),
                        type: 'zone',
                        //virtual: true,

                        world: object.world,
                        storey: object.storey,
                        position: {
                            x: object.position.x + x,
                            y: object.position.y + y,
                        },


                        limit: true,
                        limitRotation: object.rotation + 180,
                        limitRotationTolerance: 90,


                        width: object.width * Math.cos(rotation_rad) + size * Math.sin(rotation_rad),
                        height: object.width * Math.sin(rotation_rad) + size * Math.cos(rotation_rad),

                        design: object.design,
                        name: object.name,
                        html: object.html,
                        uri: uri,
                        uri_level: 10000,//todo better low priority

                    }).registerApp(this.getApp());


                    this.virtualObjects.push(zone);


                    let label = new Objects.Label({

                        id: createGuid(),
                        type: 'label',

                        world: object.world,
                        storey: object.storey,
                        position: {
                            x: object.position.x + (x * 1.9),
                            y: object.position.y + (y * 1.9),
                        },

                        rotation: object.rotation,


                        name: object.name,
                        uri: uri,
                        parent: object.parent,

                    }).registerApp(this.getApp());

                    this.virtualObjects.push(label);
                    //processObject(label);//todo better
                    //objects.push(label);


                    //r(objects);


                }

                return (this.virtualObjects);


            }


        }


        getVirtualLabel(): Label{
            return this.virtualObjects.filterTypes('label').getObjectByIndex(0) as Label;
        }


        getUniqueUri(){
            if(this.uri && this.uri!=='none'){
                return(this.uri);
            }else{
                //r(this.virtualObjects);
                return('/:'+this.id);//virtualObjects.filterTypes('label').getObjectByIndex(0).id);
            }
        }



        handlePointerRelease(pressed:boolean, event, pickResult){

            //todo maybe with decorator
            /*if(!this.app){
                throw new Error('This method can be used only when app is registered.', this);
            }*/



            if(pressed) {


                if(this.getApp().getState()!==this.getUniqueUri()){
                    this.getApp().setState(this.getUniqueUri(),false,false);
                }else{
                    this.getApp().setState(this.parent,false,false);
                }




            }

        }



    }




}