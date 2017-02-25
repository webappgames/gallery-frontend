/// <reference path="./components/popup-arrow" />



namespace GALLERY.Viewer {


    //import * as React from "react";
    //import * as ReactDOM from "react-dom";
    //import * as ReactDOMServer from "react-dom/server";

    //import {PopupArrow} from './components/popup-arrow'
    r('PopupArrow',PopupArrow);




    export function processPopups(element: HTMLElement) {

        $(element).find('*[popup-content]').each(function () {


            //this.appendChild(document.createElement("div").innerHTML='xxxx');
            /*r(
             ReactDOMServer.renderToStaticMarkup(
             <PopupArrow html="ahoj" offset={$(this).offset()}/>
             ),
             this
             );*/
            const $this = $(this);
            let event = $this.attr('popup-event') || 'hover';




            const container = document.createElement("div");
            document.getElementById('popups').appendChild(container);



            const popup_object = objects.findBy('id',$this.attr('popup-content'));
            if(!(popup_object instanceof Objects.ProtoBoard){
                r(popup_object);
                throw new Error('popup-content attribute should refer to ProtoBoard object.');
            }

            //(popup_object as Objects.ProtoBoard).createBoard();
            const reactBoard = (popup_object as Objects.ProtoBoard).createReactComponent({});




            const anchor = this;
            function render(opened){
                //r('rendering',opened);
                ReactDOM.render(
                    <PopupArrow anchor={anchor} close={render.bind(anchor,false)} hasClose={event=='click'} opened={opened}>{reactBoard}</PopupArrow>
                    ,container
                );
            }


            //r('popup-opened',$this,$this.is('[popup-opened]'));
            render($this.is('[popup-opened]'));





            if (event === 'hover') {
                $this.mouseenter(render.bind(this,true));
                $this.mouseleave(render.bind(this,false));
            } else if (event === 'click') {
                $this.click(function(){
                    render.call(this,true);//todo toggle
                });
            } else {
                throw new Error(`Unknown event type ${event} in popup-event attribute!`);
            }



    });






    /*
     const $newsletter_window = $('#newsletter-window');
     const $newsletter_window_arrow = $newsletter_window.find('.arrow');
     const $newsletter_window_close = $newsletter_window.find('.close');


     $newsletter_window_close.click(function () {
     popupArrowHide();
     });


     let popupArrowShow = function (event) {

     event.preventDefault();

     const POPUP_WIDTH = $newsletter_window.outerWidth();
     const WINDOW_WIDTH = $(window).width();
     const POPUP_TOP = 20;
     const POPUP_MARGIN = 10;
     const ARROW_LEFT = 60;


     const $this = $(this);
     const offset = $this.offset();

     $newsletter_window.css('position', 'absolute');
     $newsletter_window.css('top', offset.top - (-$this.outerHeight()) + POPUP_TOP);

     let left = offset.left + $this.outerWidth() / 2 - (ARROW_LEFT);
     const leftNoBorders = left;


     if (left < POPUP_MARGIN)left = POPUP_MARGIN;
     if (left > WINDOW_WIDTH - POPUP_WIDTH - POPUP_MARGIN)left = WINDOW_WIDTH - POPUP_WIDTH - POPUP_MARGIN;


     $newsletter_window.css('left', left);


     $newsletter_window_arrow.css('left', ARROW_LEFT + leftNoBorders - left);



     const popup_object = objects.findBy('id',$this.attr('popup-content'));
     if(!(popup_object instanceof Objects.ProtoBoard){
     r(popup_object);
     throw new Error('popup-content attribute should refer to ProtoBoard object.');
     }

     (popup_object as Objects.ProtoBoard).createBoard($newsletter_window.find('.content').text('')[0]);




     let event = $this.attr('popup-event') || 'hover';
     if (event == 'hover') {
     $newsletter_window_close.hide();
     } else {
     $newsletter_window_close.show();
     }


     $newsletter_window.show();


     return false;

     };


     let popupArrowHide = function () {
     $newsletter_window.hide();
     };
     let popupArrowToggle = function (event) {
     if ($newsletter_window.css('display') == 'none') {
     popupArrowShow.call(this, event);
     } else {
     popupArrowHide.call(this);
     }
     };



     export function processPopups(element: HTMLElement) {

     $(element).find('*[popup-content]').each(function () {

     let $this = $(this);

     let event = $this.attr('popup-event') || 'hover';

     if (event === 'hover') {
     $this.mouseenter(popupArrowShow);
     $this.mouseleave(popupArrowHide);
     } else if (event === 'click') {
     $this.click(popupArrowToggle);
     } else {
     throw new Error(`Unknown event type ${event} in popup-event attribute!`);
     }


     });
     }*/






    }

}
