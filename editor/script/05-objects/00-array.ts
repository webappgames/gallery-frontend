/// <reference path="../reference.ts" />


namespace GALLERY.Objects{


    export class Array{


        public objects:GALLERY.Objects.Object[];


        constructor(objects:GALLERY.Objects.Object[] = []) {


            for(let i in objects){

                objects[i] = GALLERY.Objects.Object.init(objects[i]);
            }


            this.objects = objects;

        }


        getAll():GALLERY.Objects.Object[] {
            return this.objects;
        }


        forEach(callback: (item: any)=>void): void {
            return this.objects.forEach(callback);
        }


        filter(callback: (item: any)=>boolean):GALLERY.Objects.Array {

            var filtered_objects = new GALLERY.Objects.Array();

            //r(filtered_objects.05-objects);

            filtered_objects.objects = this.objects.filter(callback);

            return (filtered_objects);

        }


    }


}