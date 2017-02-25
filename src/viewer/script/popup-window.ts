/// <reference path="./reference.ts" />

var Window={};
let window_opened = false;
const IMMEDIATELY_MS = 50;




Window._listenToKeys = function (e) {

    if(e.keyCode == 13){
        e.preventDefault();

        Window.close(true);

    }else
    if(e.keyCode == 27){
        e.preventDefault();

        Window.close(false);

    }

};



/**
 * Changes title of opened popup window
 * @param title
 */
Window.setTitle = function(title){


    $('.popup-window .header').html(title);//todo refactor html class header to title

};


/**
 * Changes content of opened popup window
 * @param content
 */
Window.setContent = function(content) {

    $('.popup-window .content').html(content);

    setTimeout(
        function () {
            $('.popup-window .content').find("[autofocus]").focus();
        }, IMMEDIATELY_MS
    );

    //todo uiScript();

};


/**
 * Changes format of opened popup window
 * @param format NORMAL, SMALL, VERTICAL, COMMAND
 */
Window.setFormat = function(format) {

    $('.popup-window').removeClass('popup-window-small');
    $('.popup-window').removeClass('popup-window-vertical');
    $('.popup-window').removeClass('popup-window-command');


    if (format == "SMALL") {

        $('.popup-window').addClass('popup-window-small');

    }else
    if (format == "VERTICAL") {

        $('.popup-window').addClass('popup-window-vertical');

    }else
    if (format == "COMMAND") {


        $('.popup-window').addClass('popup-window-command');

    }

};


/**
 * Open popup window
 * @param title
 * @param content
 * @param close_callback
 */
Window.open = function(title, content, close_callback, format) {



    if (window_opened) {
        Window.close(false);
    }


    if (close_callback) {
        Window.closeCallback = close_callback;
    }


    Window.setFormat(format);

    Window.setTitle(title);
    Window.setContent(content);


    /*r(T.URI.writed);
    if(T.URI.writed>1){

        $('.js-popup-window-back').show();

    }*/


    $('.overlay').show();
    $('.popup-window').show();


    $('.overlay').unbind('click').click(function (e) {
        Window.close(false);
    });


    $('.js-popup-window-close').unbind('click').click(function (e) {
        Window.close(false);
    });

    $('.js-popup-window-confirm').unbind('click').click(function (e) {
        Window.close(true);
    });


    /*$('.popup-window .content').unbind('mousedown').mousedown(function () {

        $('body').enableSelection();
    });
    $('body').enableSelection();*/


    //document.exitPointerLock();



    window_opened = true;

    window.addEventListener('keydown', Window._listenToKeys, false);


};


/**
 * Close popup window and run close callback
 * @param {boolean} dont_run_close_callback
 */
Window.close = function(close_status=true,dont_run_close_callback=false) {


    r('Closing window status='+close_status);


    //-------------------------------------------Play sound
    //todo sounds ion.sound.play("door_bump");
    //-------------------------------------------

    //-------------------------------------------Hide popup window
    //todo document.title = T.Locale.get('page','title');

    $('.overlay').hide();
    $('.popup-window').hide();

    //$('body').disableSelection();

    window_opened = false;
    //-------------------------------------------


    //-------------------------------------------Run close callback
    if (Window.closeCallback) {

        if (dont_run_close_callback === false) {
            Window.closeCallback(close_status);
        }

        delete Window.closeCallback;
    }
    //-------------------------------------------

    window.removeEventListener('keydown', Window._listenToKeys, false);
    document.getElementById('scene').focus();

};







function fbDiscuss(url){

    Window.open('Diskuse', '<iframe src="?comments"></iframe>', function () {

    }, 'VERTICAL');
}