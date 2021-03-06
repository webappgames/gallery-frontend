/// <reference path="../../reference" />

module GALLERY.Objects{

    export abstract class Object{


        public id: string;
        public type: string;
        public world: string;
        public hidden: boolean;
        public virtual: boolean;
        private virtualObjects: Objects.Array;
        public position: {
          x: number,
          y: number
        };

        private _babylonMesh:BABYLON.Mesh;


        //todo storey
        //todo get parameters for editing

        constructor(object){


            if(typeof object !=='object'){
                throw new Error('In GALLERY.Objects.Object constructor should be Object!');
            }
            if(!object){
                throw new Error('In GALLERY.Objects.Object constructor should not be null!');
            }


            object.world = object.world || 'main';
            object.storey = object.storey || '1NP';
            object.hidden = object.hidden || false;
            object.virtual = object.virtual || false;



            for (var key in object) {

                var this_key = key;

                if (this_key == '_id')this_key = 'id';//todo maybe better solution

                this[this_key] = object[key];
            }


            if(typeof this.id == 'string')
            if(this.id.split('-',2)[0] !== this.type){
                this.id = this.type+'-'+this.id;
            }




            if("uri" in this){
                if(this.uri=='/:'+this.id){
                    this.uri = 'none';
                }
            }




            this.virtualObjects = null;

        }



        createVirtualObjects(): Objects.Array {
            return new Objects.Array();
        }
        getVirtualObjects(): Objects.Array {
            if(!this.virtualObjects){
                this.virtualObjects = this.createVirtualObjects();
            }

            return(this.virtualObjects);
        }





        toString():string{
            return(this.id);
        }



        toJSON(){
            let pureObject = {};
            for (var key in this) {

                if (!_.isFunction(this[key])) {
                    if (!_.isObject(this[key]) || ['position','size'].indexOf(key)!==-1) {
                        if (key.substr(0, 1) !== '_') {


                            pureObject[key] = this[key];

                        }
                    }
                }
            }

            return(pureObject);
        }




        private _app: Viewer.GalleryApp;
        registerApp(app: Viewer.GalleryApp){
            if(this._app){
                throw new Error('App was already registred on this Array.');
            }
            this._app = app;

            return this;
        }


        getApp():Viewer.GalleryApp{
            if(this._app){
                return this._app;
            }else{
                return null;
            }
        }




        getEditorInputHtml(key:strEing):string{

            switch(key) {
                case 'world': return('<input type="text">');
                case 'hidden': return('<input type="checkbox">');
                default:  return('');
            }

        }

        getBabylonMesh(scene:BABYLON.Scene,getMaterial:Function,environment:Environment):BABYLON.Mesh {

            if ("_babylonMesh" in this) {
            } else {

                this._babylonMesh = this.createBabylonMesh(scene,getMaterial,environment);
                if(this.hidden)this.hide();

            }

            return this._babylonMesh;

        }

        getCreatedBabylonMesh():BABYLON.Mesh {

            if ("_babylonMesh" in this) {
                return this._babylonMesh;
            } else {
                return null;
            }

        }

        createBabylonMesh(scene:BABYLON.Scene,getMaterial,environment):BABYLON.Mesh{
            return(null);
        }

        createVirtualObjects():Objects.Array{
            return(null);
        }



        //todo this should be in some abstract meshObject
        handlePointerPress(event, pickResult){
        }

        handlePointerRelease(pressed:boolean, event, pickResult){
        }

        handlePointerEnter(event, pickResult){}

        handlePointerLeave(event, pickResult){}




        static init(object) {

            if(object instanceof Object){
                return (object);
            }

            //----------------------------------
            if (object.type == 'environment') {

                object = new Environment(object);

            } else if (object.type == 'block') {

                object = new Block(object);

            } else if (object.type == 'multiblock') {

                object = new MultiBlock(object);

            } else if (object.type == 'light') {

                object = new Light(object);

            } else if (object.type == 'label') {

                object = new Label(object);

            } else if (object.type == 'image') {

                object = new Image(object);
            } else if (object.type == 'poster') {

                object = new Poster(object);

            } else if (object.type == 'button') {

                object = new Button(object);


            } else if (object.type == 'tree') {

                 object = new Tree(object);

            } else if (object.type == 'stairs') {

            object = new Stairs(object);

            }else if (object.type == 'link') {

                object = new Link(object);

            }else if (object.type == 'gate') {

                object = new Gate(object);

            }else if (object.type == 'zone') {

                object = new Zone(object);

            }else if (object.type == 'groundhole') {

                object = new GroundHole(object);

            }else if (object.type == 'deploy') {

                object = new Deploy(object);

            }else if (object.type == 'analytics') {

                object = new Analytics(object);

            }else if (object.type == 'board') {

                object = new Board(object);
            }else if (object.type == 'boardamorph') {

                object = new BoardAmorph(object);

            }
            else {

                console.warn(`Unknown object type "${object.type}" - creating universal object.`);
                object = new Object(object);

            }
            //----------------------------------

            return (object);

        }






        show(){
            if(this.getCreatedBabylonMesh()){//todo maybe use Promise
                this.getCreatedBabylonMesh().visibility = 1;
            }

        }

        hide(){
            if(this.getCreatedBabylonMesh()) {
                this.getCreatedBabylonMesh().visibility = 0;
            }
        }






        clone():Object{
            return(Object.init(JSON.parse(JSON.stringify(this))));
        }



        /*create$Element(){
            return this._create$Element();
        }*/



        getUri(){

            let uri:string;

            if("uri" in this){
                if(this.uri!='none'){
                    uri = this.uri;
                }
            }

            if(typeof uri === 'undefined'){
                uri = '/:'+this.id;
            }

            return(uri);
        }


        _create$Element(){

            let object = this;

            var element = '<div></div>';

            var $element = $(element);


            if(typeof object.position!=='undefined') {

                $element.css('position', 'absolute');

                //if (object.type !== 'image') {

                $element.css('top', object.position.y * zoom_selected + window_center.y);
                $element.css('left', object.position.x * zoom_selected + window_center.x);

                /*} else {

                 $element.css('top', ( object.position.y - 0.5 ) * zoom_selected + window_center.y);
                 $element.css('left', ( object.position.x - 0.5 ) * zoom_selected + window_center.x);

                 }*/

            }


            //$element.addClass('object');
            $element.addClass(object.type);

            $element.attr('id',object.id);



            $element.css('width', zoom_selected);
            $element.css('height',zoom_selected);

            return($element);

        }



        getLevelNumber(){
            return(BLOCKS_STOREYS_LEVELS[this.storey || '1NP']);
        }


        getBabylonPosition(){


            let position = new BABYLON.Vector3(
                this.position.x * -BLOCK_SIZE,
                (this.getLevelNumber() + BLOCKS_1NP_LEVEL) * BLOCK_SIZE,//(0.5 - 0.9) * BLOCK_SIZE,
                this.position.y * BLOCK_SIZE
            );

            return(position);


        }




    }

}