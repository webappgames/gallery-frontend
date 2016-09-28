/// <reference path="../../reference.ts" />


namespace GALLERY.Objects{


    export class Array{


        public objects:GALLERY.Objects.Object[];


        constructor(objects:GALLERY.Objects.Object[] = []) {


            this.objects=[];

            var self = this;

            objects.forEach(function (object) {
                self.push(object);
            });

        }


        getAll():GALLERY.Objects.Object[] {
            return this.objects;
        }


        forEach(callback: (item: any)=>void): void {
            return this.objects.forEach(callback);
        }


        sort(callback: (object1:GALLERY.Objects.Object,object2:GALLERY.Objects.Object)=>void): Array {
            this.objects.sort(callback);
            return this;
        }


        push(object:Object): void {
            this.objects.push(GALLERY.Objects.Object.init(object));
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

        splitTypes(...types: string[]): Array {


            var filtered_objects_true = new Array();
            var filtered_objects_false = new Array();

            this.forEach(function (object) {

                if ((types as [string).indexOf(object.type) !== -1){
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





    }


}