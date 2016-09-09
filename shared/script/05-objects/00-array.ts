/// <reference path="../reference.ts" />


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


        push(object:GALLERY.Objects.Object): void {
            this.objects.push(GALLERY.Objects.Object.init(object));
        }



        filterTypes(...types: string[]): Array {


            var filtered_objects = new Array();

            this.forEach(function (object) {

                if ((types as [any]).indexOf(object.type) == -1)return;//todo better

                filtered_objects.getAll().push(object);

            });

            return (filtered_objects);
        }





        getObjectById(id){
            for(var i=0,l=this.objects.length;i<l;i++){
                if(this.objects[i].id==id)return(this.objects[i]);
            }
            throw new Error('Unknown id '+id);
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



        removeBlockOnPosition(position,storey){
            //r(position);

            for (var i in this.objects) {

                if (this.objects[i].type == 'block'){
                    //r(05-objects[i]);
                    if(this.objects[i].position.x==position.x && this.objects[i].position.y==position.y && this.objects[i].storey==storey){
                        this.objects.splice(i, 1);
                        return true;
                    }
                }
            }
            return false;
        }





    }


}