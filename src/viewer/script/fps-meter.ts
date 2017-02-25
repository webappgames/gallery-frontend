/// <reference path="./reference.ts" />


module GALLERY.Viewer {


    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 70) {


            let $fps = $('.fps');
            setInterval(function () {

                if(!rendered)return;


                let fps = engine.getFps();

                let html = '';

                if(engineRunning){
                    html+='<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
                }else{
                    html+='<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
                }

                html += '&nbsp;';
                html += fps.toFixed(1);


                //html += '<br>'+engine.drawCalls;

                $fps.html(html);

            },50);



            $fps.show();
        }
    }, false);



}

