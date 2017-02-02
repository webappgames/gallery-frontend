/// <reference path="10-board" />



namespace GALLERY.Objects{

    import renderTick = GALLERY.Viewer.renderTick;
    export class Button extends Poster{


        constructor(object){

            super(object);

        }


        createVirtualObjects():Objects.Array{
            return(null);
        }



        handlePointerPress(){
            //todo DI Viewer.scene to object

            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(-0.15);
            mesh.position.addInPlace(vector);
            //Viewer.renderTick();
        }



        handlePointerRelease(pressed:boolean){
            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(-0.15);
            mesh.position.subtractInPlace(vector);
            //Viewer.renderTick();

        }



    }

}