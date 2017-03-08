/// <reference path="07-protoboard" />


module GALLERY.Objects{

    //import analyticsObject = GALLERY.Viewer.analyticsObject;
    //import appState = GALLERY.Viewer.appState;


    export class Zone extends ProtoBoard{

        public width: number;
        public height: number;
        public uri:string;
        public uri_level:number;
        public isPickable:boolean;
        public isImportant:boolean;





        public limit: number;
        public limitRotation: number;
        public limitRotationTolerance: number;






        private _mesh;
        private _board:HTMLDivElement;




        constructor(object){

            super(object);

            this.width = this.width || 1;
            this.height = this.height || 1;
            this.uri = this.uri || '';
            this.uri_level = this.uri_level || 0;
            this.isPickable = this.isPickable || false;
            this.isImportant = this.isImportant || false;

            this.limit = this.limit || false;
            this.limitRotation = this.limitRotation || 0;
            this.limitRotationTolerance = this.limitRotationTolerance || 0;
            //this.selector = this.selector || '';

        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'design':
                    return('<input type="text">');
                case 'name':
                    return('<input type="text">');
                case 'html':
                    return('<textarea></textarea>');
                case 'buttons':
                    return('<textarea></textarea>');


                case 'width':
                    return('<input type="number">');
                case 'height':
                    return('<input type="number">');
                case 'uri_level':
                    return('<input type="number">');
                case 'isPickable':
                    return('<input type="checkbox">');
                case 'isImportant':
                    return('<input type="checkbox">');

                case 'limit':
                    return('<input type="checkbox">');
                case 'limitRotation':
                    return('<input type="number">');
                case 'limitRotationTolerance':
                    return('<input type="number">');


                default:
                    return(super.getEditorInputHtml(key));
            }

        }


        create$Element() {


            var $element = this._create$Element();
            let object = this;


            var $block = $('<div>').addClass('image');


            var width = object.width * zoom_selected;
            var height = object.height * zoom_selected;

            $block.css('width', width);
            $block.css('height', height);
            $block.css('background-color', 'rgba(0,0,0,0.5)');


            $block.css('position', 'relative');
            $block.css('top', -height / 2);
            $block.css('left', -width / 2);

            $block.css('transform', 'rotate(' + object.rotation + 'deg)');


            $element.append($block);
            //$element.css('transform','rotate('+object.rotation+'deg)');


            return $element;


        }


        createBabylonMesh(scene) {

            if (this.getApp().isDevelop()) {

                let mesh = BABYLON.Mesh.CreateBox(this.id, BLOCK_SIZE, scene);
                mesh.material = new BABYLON.StandardMaterial("texture1", scene);
                mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
                mesh.material.alpha = 0.2;

                mesh.position = this.getBabylonPosition();

                mesh.position.y += BLOCK_SIZE;//* BLOCKS_2D_3D_SHAPES.room.length / 2;
                mesh.scaling.y = 1;

                mesh.scaling.x = this.width;
                mesh.scaling.z = this.height;


                mesh.checkCollisions = false;
                mesh.isPickable = false;

                //meshes.push(mesh);
                return (mesh);

            } else {

                return null;

            }
        }



        isIn(position:BABYLON.Vector3,rotation:BABYLON.Vector3){


            let center = this.getBabylonPosition();
            //center.y += BLOCK_SIZE * BLOCKS_2D_3D_SHAPES.room.length / 2;


            let scaling = new BABYLON.Vector3(BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
            scaling.y = scaling.y * BLOCKS_2D_3D_SHAPES.room.length;
            scaling.x = Math.abs(scaling.x * this.width);
            scaling.z = Math.abs(scaling.z * this.height);


            //r((center.x-scaling.x)+' - '+position.x+' - '+(center.x+scaling.x));

            let isInPosition = (

                center.x-scaling.x/2 <= position.x &&
                center.x+scaling.x/2 >= position.x &&

                center.y-scaling.y/2 <= position.y &&
                center.y+scaling.y/2 >= position.y &&

                center.z-scaling.z/2 <= position.z &&
                center.z+scaling.z/2 >= position.z
            );




            if(!isInPosition){
                return false;
            }else
            if(!this.limit){
                return true;
            }else{

                let rotation_deg = (rotation.y / Math.PI ) *180;

                let delta = rotation_deg - this.limitRotation;
                delta = Math.abs(delta%360);
                //r(delta);

                if(delta<this.limitRotationTolerance/2){
                    return true;
                }else{
                    return false;
                }



            }







        }




    }

}