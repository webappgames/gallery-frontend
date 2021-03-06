/// <reference path="../../reference" />


module GALLERY.Objects{


    export class Array{


        public objects:Object[];
        public index:number;

        constructor(objects:Object[] = []) {


            this.objects=[];

            var self = this;

            objects.forEach(function (object) {
                self.push(object);
            });

            this.reset();

        }


        toJSON(){
            return(this.objects.map(function (object) {
                return object.toJSON();
            }));
        }




        get length(){
            return this.objects.length;
        }



        next():Object {

            if(this.objects.length <= this.index){
                return null;
            }

            return this.objects[this.index++];
        }


        reset(){
            this.index=0;
        }


        getAll():Object[] {
            return this.objects;
        }


        getObjectByIndex(index:number):Object {
            return this.objects[index];
        }


        forEach(callback: (item: Object)=>void): void {
            return this.objects.forEach(callback);
        }

        map(callback: (item: Object)=>any): any[] {
            return this.objects.map(callback);
        }


        sort(callback: (object1:Object,object2:Object)=>void): Array {
            this.objects.sort(callback);
            return this;
        }


        push(object:Object): void {
            this.objects.push(Object.init(object));
        }


        findBy(key:string, value:string | number | boolean):Object {

            r('findBy',key,value);

            let value_: any;

            for(let i=0,l=this.objects.length;i<l;i++){

                value_ = this.objects[i][key];
                if(typeof value_ !== 'undefined') {
                    if (value_ == value) {
                        return(this.objects[i]);
                    }
                }


            }

            return null;
        }



        filterBy(key:string, value:string | number | boolean):Object {

            var filtered_objects = new Array();

            let value_: any;

            for(let i=0,l=this.objects.length;i<l;i++){

                value_ = this.objects[i][key];
                if(typeof value_ !== 'undefined') {
                    if (value_ == value) {
                        filtered_objects.push(this.objects[i]);
                    }
                }


            }

            return (filtered_objects);
        }



        filter(callback: (object: Object) => boolean): Array {

            var filtered_objects = new Array();

            this.forEach(function (object) {
                if (callback(object)){
                    filtered_objects.push(object);
                }
            });

            return (filtered_objects);
        }


        getAllWorlds(): Array{

            var worlds = [];

            this.forEach(function (object) {

                if(worlds.indexOf(object.world) === -1){
                    worlds.push(object.world);
                }
            });

            return(worlds);
        }



        filterWorld(world: string): Array {

            var filtered_objects = new Array();

            this.forEach(function (object) {

                if (object.world !== world)return;

                filtered_objects.getAll().push(object);

            });

            return (filtered_objects);
        }


        filterStorey(storey: string): Array {

            var filtered_objects = new Array();

            this.forEach(function (object) {

                if (object.storey !== storey)return;

                filtered_objects.getAll().push(object);

            });

            return (filtered_objects);
        }



        filterTypes(...types: string[]): Array {


            var filtered_objects = new Array();

            this.forEach(function (object) {

                if ((types as [any]).indexOf(object.type) == -1)return;//todo better

                filtered_objects.getAll().push(object);

            });

            return (filtered_objects);
        }

        removeTypes(...types: string[]): Array {


            var filtered_objects = new Array();

            this.forEach(function (object) {

                if ((types as [any]).indexOf(object.type) == -1) {

                    filtered_objects.getAll().push(object);

                }

            });

            return (filtered_objects);
        }

        splitTypes(...types: string[]): Array {


            var filtered_objects_true = new Array();
            var filtered_objects_false = new Array();

            this.forEach(function (object) {

                if ((types as [string]).indexOf(object.type) !== -1){
                    filtered_objects_true.getAll().push(object);//r('yes');
                }else{
                    filtered_objects_false.getAll().push(object);//r('no');
                }

            });

            return ([filtered_objects_true,filtered_objects_false]);
        }





        filterSquare(x: number,y: number,width: number,height: number): Array{

            //todo better
            x -= .5;
            y -= .5;
            width  += 1;
            height += 1;


            var filtered_objects = new Array();

            this.forEach(function (object) {

                if (
                    object.position.x >= x &&
                    object.position.y >= y &&
                    object.position.x <= x+width &&
                    object.position.y <= y+height
                ) {

                    filtered_objects.getAll().push(object);
                }

            });

            return (filtered_objects);


        }







        getObjectById(id){
            for(var i=0,l=this.objects.length;i<l;i++){
                if(this.objects[i].id==id)return(this.objects[i]);
            }
            return null;
            //throw new Error('Unknown id '+id);
        }




        removeObjectById(id){
            for (var i in this.objects) {
                if (this.objects[i].id == id) {
                    this.objects.splice(i, 1);
                    return true;
                }
            }
            return false;
        }



        removeBlockOnPosition(position,storey,world){
            //r(position);

            for (var i in this.objects) {

                if (this.objects[i].type == 'block'){
                    //r(05-objects[i]);
                    if(this.objects[i].position.x==position.x && this.objects[i].position.y==position.y && this.objects[i].storey==storey && this.objects[i].world==world){
                        this.objects.splice(i, 1);
                        return true;
                    }
                }
            }
            return false;
        }



        getBlockOnPosition(position,storey,world){
            //r(position);

            for (var i in this.objects) {

                if (this.objects[i].type == 'block'){
                    //r(05-objects[i]);
                    if(this.objects[i].position.x==position.x && this.objects[i].position.y==position.y && this.objects[i].storey==storey && this.objects[i].world==world){

                        return this.objects[i];

                    }
                }
            }
            return null;
        }



        createWithVirtual():Objects.Array{

            var materialAndVirtualObjects = new Array();



            function processObject(object:Object,objectsCollection:Array){

                objectsCollection.push(object);

                let virtualObjects = object.getVirtualObjects();
                if(virtualObjects) {

                    virtualObjects.forEach((object)=>{
                        processObject(object,objectsCollection);
                    });
                }
            }



            this.forEach((object)=>{
                processObject(object,materialAndVirtualObjects);
            });


            return materialAndVirtualObjects;

        }



    }


}