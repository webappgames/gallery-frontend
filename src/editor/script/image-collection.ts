




module GALLERY{

    export class ImagesCollection{


        /**
         *
         * @param {object} files
         * @param {string} url Prefix of image urls
         * @constructor
         */
        constructor() {

            this.images = {};
            this.colors = {};

            this.images_loaded = 0;
            this.images_count = 0;



        }



        addImageAsDOM(key,image){

            this.images[key]=image;
            this.images_loaded ++;
            this.images_count ++;

        }



        addImage(key,src){


            let image = document.createElement("img");
            image.src = src;

            this.addImageAsDOM(key,image);

        }



        getOrAdd(key,src){

            if (typeof this.images[key] === 'undefined'){
                this.addImage(key,src);
            }

            return(this.get(key));

        }



        loaded() {

            var percent = this.images_loaded / this.images_count;
            if (percent > 1)percent = 1;

            return (percent);

        }


        get(key) {

            if (typeof this.images[key] === 'undefined'){
                console.log(this.images);
                throw new Error('In this collection is not image with key ' + key+ '. There are only these keys.');
            }
            return (this.images[key]);

        }


        getColor(key) {

            if(this.loaded()!==1){
                throw new Error('Not yet loaded!');
            }

            //r(this.colors);

            if (typeof this.colors[key] === 'undefined'){

                var image = this.get(key);
                this.colors[key] = getAverageRGB(image);

            }

            return(this.colors[key]);

        }



        //todo jsdoc
        getAll(key) {

            return (this.images);

        }


        //todo jsdoc
        getInput(NameOfRadios, AdditionalClass = '') {

            var html = '';

            //r(this.files);

            for (var key in this.files) {

                html += `
            <input type="radio" name="` + NameOfRadios + `" id="` + NameOfRadios + `-` + key + `" value="` + key + `" class="` + AdditionalClass + `" />
            <label for="` + NameOfRadios + `-` + key + `">
                <img src="` + this.url + this.files[key] + `">
            </label>
            `;

            }


            html = '<div class="textures-input">' + html + '</div>';

            //r(html);

            //alert(html);//todo purge Towns from commented alert, r, console.log, ect..
            return (html);

        }

    }
}