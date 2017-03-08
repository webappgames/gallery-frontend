/// <reference path="05-object" />

module GALLERY.Objects{

    //import analyticsObject = GALLERY.Viewer.analyticsObject;
    //import appState = GALLERY.Viewer.appState;

    export const BOARD_STRUCTURE = `
{{#name}}
<h1>{{name}}</h1>
{{/name}}
<div class="text">{{{html}}}</div>
{{#buttons}}
<div class="buttons">{{{buttons}}}</div>
{{/buttons}}
`;


    export class ProtoBoard extends Object{

        public storey: string;


        public design: string;
        public name: string;
        public html: string;
        public structure: string;
        public buttons: string;

        private _board:HTMLElement;



        constructor(object){

            super(object);

            this.design = this.design || 'board';
            this.name = this.name || '';
            this.html = this.html || '';//todo deprecated
            this.structure = this.structure || BOARD_STRUCTURE;
            this.buttons = this.buttons || '';//todo deprecated

        }

        toString():string{

            if(this.name || false){
                return(this.name+' ('+this.type+')')
            }else{
                return(this.id);
            }


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
                case 'structure':
                    return('<textarea></textarea>');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }

        //todo use React
        /*createBoard(container:HTMLElement):HTMLElement{
            export class Hello extends React.Component<HelloProps, undefined> {
                render() {
                    return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
                }
            }

        }*/




        //todo use this
        createReactComponent(props){


            let isNext = false;
            let label = objects.filterTypes('label').findBy('uri', this.uri);
            if (label) {
                if (label.next !== 'none') {
                    isNext = true;
                }

            }



            //let html = this.html;

            //todo this.html should be immutable
            this.html = Mustache.render(this.html, {gallery: function () {return function (val, render) {

                let images = objects.filterTypes('image');
                let conds = JSON.parse(val);
                for(let key in conds){
                    images = images.filterBy(key,conds[key]);
                }

                let html = '';
                images.forEach(function (image) {
                    html += '<img src="'+image.getSrc(90,1)+'" onclick="GALLERY.Viewer.appState(\'/:'+image.id+'\', false, false);" />'
                });
                html = '<div class="gallery">'+html+'</div>';


                return html;
            }}});

            r(this.html);


            let innerHTML = Mustache.render(this.structure, this);




            innerHTML += (isNext ? '<div class="next" onclick="GALLERY.Viewer.appStateNext();"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');


            const fullUrl = 'http://'+window.location.hostname+'/'+this.getUri();//+analyticsObject.domain;

            //todo react component
            if(this.design=='board' && !isNext) {

                innerHTML += `<button onclick="GALLERY.Viewer.appStateParent();"><i class="fa fa-arrow-left" aria-hidden="true"></i> Zpět</button>`;
                innerHTML += `<button onclick="GALLERY.Viewer.appStateTurnBack();"><i class="fa fa-repeat" aria-hidden="true"></i> Otočit se</button>`;
                innerHTML += `<button class="discuss" onclick="fbDiscuss('`+fullUrl+`');"><i class="fa fa-pencil" aria-hidden="true"></i> Přidat komentář</button>`;

                $.ajax({
                    url: 'http://graph.facebook.com/v2.1/'+encodeURIComponent(fullUrl),
                    dataType: 'jsonp',
                    success: function(data) {

                        data.share = data.share || {};
                        let count = data.share.comment_count || 0;
                        r(data,count);
                        let text = '<i class="fa fa-pencil" aria-hidden="true"></i> ';

                        if(count==0){
                            text += 'Přidat komentář';
                        }else
                        if(count==1){
                            text += '1 komentář';
                        }else
                        if(count<5){
                            text += count+' komentáře';
                        }else
                        if(count>=5){
                            text += count+' komentářů';
                        }

                        //todo element.getElementsByClassName('discuss')[0].innerHTML = text;
                    }
                });

            }



            /*todo links
            $(element).find('a').click(function (e) {
                e.preventDefault();
                Viewer.appState($(this).attr('href'),false,false);
            });*/


            //todo popups Viewer.processPopups(element);


            return(
                <div id={'zone-'+this.id/*todo remore zone*/} className={'zone-'+this.design/*todo remore zone add different name*/} dangerouslySetInnerHTML={{__html: innerHTML}}>
                </div>
            );
        }




        createBoard(container:HTMLElement):HTMLElement{
            //if (object.name || object.html) {

            let isNext = false;
            let label = objects.filterTypes('label').findBy('uri', this.uri);
            if (label) {
                if (label.next !== 'none') {
                    isNext = true;
                }

            }


            let element = document.createElement('div');
            element.id = 'zone-' + this.id;
            element.classList.add('zone-'+this.design);



            //todo this.html should be immutable
            this.html = Mustache.render(this.html, {gallery: function () {return function (val, render) {

                let images = objects.filterTypes('image');
                let conds = JSON.parse(val);
                for(let key in conds){
                    images = images.filterBy(key,conds[key]);
                }

                let html = '';
                images.forEach(function (image) {
                    html += '<img src="'+image.getSrc(90,1)+'" onclick="GALLERY.Viewer.appState(\'/:'+image.id+'\', false, false);" />'
                });
                html = '<div class="gallery">'+html+'</div>';


                return html;
            }}});




            element.innerHTML = Mustache.render(this.structure, this);




            element.innerHTML += ''
                //+'<div class="previous"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>'
                //+ (this.name ? '<h1>' + this.name + '</h1>' : '')
                //+ '<div class="text">' + html + '</div>'
                //+ (this.buttons?'<div class="buttons">' + this.buttons + '</div>':'')
                + (isNext ? '<div class="next" onclick="GALLERY.Viewer.appStateNext();"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>' : '');





            let fullUrl = 'http://'+window.location.hostname+'/'+this.getUri();//+analyticsObject.domain;
            //let fullUrl = 'http://'+analyticsObject.domain+this.getUri();
            r(fullUrl);



            if(this.design=='board' && !isNext) {

                //element.innerHTML += `<button class="fb-share-button" data-href="http://www.your-domain.com/your-page.html"></button>`;

                element.innerHTML += `<button onclick="GALLERY.Viewer.appStateParent();"><i class="fa fa-arrow-left" aria-hidden="true"></i> Zpět</button>`;
                element.innerHTML += `<button onclick="GALLERY.Viewer.appStateTurnBack();"><i class="fa fa-repeat" aria-hidden="true"></i> Otočit se</button>`;
                element.innerHTML += `<button class="discuss" onclick="fbDiscuss('`+fullUrl+`');"><i class="fa fa-pencil" aria-hidden="true"></i> Přidat komentář</button>`;

                $.ajax({
                    url: 'http://graph.facebook.com/v2.1/'+encodeURIComponent(fullUrl),
                    dataType: 'jsonp',
                    success: function(data) {

                        data.share = data.share || {};
                        let count = data.share.comment_count || 0;
                        r(data,count);
                        let text = '<i class="fa fa-pencil" aria-hidden="true"></i> ';

                        if(count==0){
                            text += 'Přidat komentář';
                        }else
                        if(count==1){
                            text += '1 komentář';
                        }else
                        if(count<5){
                            text += count+' komentáře';
                        }else
                        if(count>=5){
                            text += count+' komentářů';
                        }

                        element.getElementsByClassName('discuss')[0].innerHTML = text;
                        //alert("comments: " + data.comments);
                    }
                });





                //element.innerHTML += `<div class="fb-comments-count" data-href="`+fullUri+`">0</div>`;
                //element.innerHTML += `com<div class="fb-comments" data-href="`+fullUri+`" data-mobile="1" data-numposts="5"></div>`;
            }






            container.appendChild(element);




            $(element).find('a').click(function (e) {
                e.preventDefault();
                Viewer.appState($(this).attr('href'),false,false);
            });


            Viewer.processPopups(element);


            return(element);

            //}
        }





        getBoard(container=null):HTMLElement{

            if("_board" in this){
            }else{
                if(!container){
                    container = document.getElementById('zones');
                }
                this._board = this.createBoard(container);
                this._board.style.display = 'none';

                if(this.hidden)this.hide();

            }

            return this._board;

        }



        getCreatedBoard():HTMLElement{

            if("_board" in this){
                return this._board;
            }else{
                return null;
            }



        }




        showBoard(){
            //this.getBoard().style.display = 'block';
            $(this.getBoard()).stop().slideDown();
        }


        hideBoard(){
            //this.getBoard().style.display = 'none';
            $(this.getBoard()).stop().slideUp();
        }




    }

}