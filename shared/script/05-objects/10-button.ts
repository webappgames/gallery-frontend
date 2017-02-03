/// <reference path="10-board" />



namespace GALLERY.Objects{

    export class Button extends Poster{

        public buttonBackgroundColor: string;
        public buttonTextColor: string;

        public offsetFrontalPressed: number;
        public onClick: string|Function;


        constructor(object){


            this.buttonBackgroundColor = this.buttonBackgroundColor || '#0098ff';
            this.buttonTextColor = this.buttonTextColor || '#ffffff';

            this.posterDesign = this.posterDesign || 'button';
            if(typeof this.offsetFrontal == 'undefined'){this.offsetFrontal=1/5;}
            if(typeof this.isSolid == 'undefined'){this.isSolid=true;}


            if(typeof this.offsetFrontalPressed == 'undefined'){this.offsetFrontalPressed=1/20;}

            this.onClick = this.onClick || 'console.log("Button pressed!");';


            super(object);


        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'buttonBackgroundColor': return('<input type="color" />');
                case 'buttonTextColor': return('<input type="color" />');
                case 'offsetFrontalPressed': return('<input type="number" />');
                case 'onClick': return('<textarea></textarea>');
                default:  return(super.getEditorInputHtml(key));
            }

        }


        createPosterElement(container){
            let element = super.createPosterElement(container);

            element.style.backgroundColor = this.buttonBackgroundColor;
            element.style.color = this.buttonTextColor;

            return element;
        }


        createVirtualObjects():Objects.Array{
            return(null);
        }



        handlePointerPress(event, pickResult){
            //todo DI Viewer.scene to object

            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
            mesh.position.addInPlace(vector);
            //Viewer.renderTick();
        }



        handlePointerRelease(pressed:boolean, event, pickResult){
            let mesh = this.getBabylonMesh(Viewer.scene);
            let vector = this._vectorFrontal.scale(this.offsetFrontalPressed - this.offsetFrontal);
            mesh.position.subtractInPlace(vector);
            //Viewer.renderTick();

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