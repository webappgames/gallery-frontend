/// <reference path="10-board" />



module GALLERY.Objects{

    export class Button extends Poster{

        public offsetFrontalPressed: number;
        public onClick: string|Function;


        constructor(object){


            this.posterBackgroundColor = this.posterBackgroundColor || '#0098ff';
            this.posterTextColor = this.posterTextColor || '#ffffff';

            this.posterDesign = this.posterDesign || 'button';
            if(typeof this.offsetFrontal == 'undefined'){this.offsetFrontal=1/5;}
            if(typeof this.isSolid == 'undefined'){this.isSolid=true;}


            if(typeof this.offsetFrontalPressed == 'undefined'){this.offsetFrontalPressed=1/20;}

            this.onClick = this.onClick || 'console.log("Button pressed!");';


            super(object);


        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'offsetFrontalPressed': return('<input type="number" />');
                case 'onClick': return('<textarea></textarea>');
                default:  return(super.getEditorInputHtml(key));
            }

        }


        createPosterElement(container){
            let element = super.createPosterElement(container);

            element.style.backgroundColor = this.posterBackgroundColor;
            element.style.color = this.posterTextColor;

            return element;
        }



        createVirtualObjects():Objects.Array{
            return(null);
        }



        handlePointerPress(event, pickResult){
            //todo DI Viewer.scene to object

            this.redrawPosterTexture();

            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
            mesh.position.addInPlace(vector);
            //Viewer.appEngine.renderTick();
        }



        handlePointerRelease(pressed:boolean, event, pickResult){
            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
            mesh.position.subtractInPlace(vector);
            //Viewer.appEngine.renderTick();

            if(pressed) {
                r(this);

                if (typeof this.onClick == 'string') {
                    eval((this.onClick as string));
                } else if (typeof this.onClick == 'function') {
                    this.onClick();
                }
            }


        }



    }

}