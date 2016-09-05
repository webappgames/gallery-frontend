/**
 * Created by Pavel on 14.07.2016.
 */


var gallery = false;
var password = false;

var config;
$.get('../../config.json').done(function (response) {

    config = response;
    r('loaded config');

    $.get(config.GALLERY_API_URL +'galleries').done(function (response) {


        var $ul = $('#select-gallery').find('ul');
        $ul.html('');


        response.forEach(function (item) {
            $ul.append('<li>'+item+'</li>');
        });

        $ul.find('li').click(function () {
            $('#select-gallery').find('input[name="gallery"]').val($(this).html());
        });



        processFirstLogin();



    });


});




var objects:GALLERY.Objects.Array;


function loginOrCreate(testing_gallery,testing_password){


    $.get({
        url:config.GALLERY_API_URL +'galleries/'+ testing_gallery,
        headers: { 'x-auth': testing_password }
    }).done(function (response) {


        gallery = testing_gallery;
        password = testing_password;

        window.localStorage.setItem('gallery',gallery);
        window.localStorage.setItem('password',password);



        objects = new GALLERY.Objects.Array(...response);




        $('#show-gallery').attr('href','../viewer?gallery='+gallery);
        createMap();

        $('#select-gallery').hide();


    }).fail(function (response) {

        if(response.status==403){

            alert('Špatné heslo!');

        }else
        if(response.status==404){

            if(confirm('Galerie s názvem '+testing_gallery+' neexistuje, chcete vytvořit novou prázdnou se zadaným heslem?')){



                $.post({
                    url: config.GALLERY_API_URL +'galleries/'+ testing_gallery,
                    contentType: "application/json",
                    data: JSON.stringify([]),
                    headers: { 'x-auth': testing_password }

                }).done(function (response) {


                    console.log('done', response);

                    Message.success('Byla vytvořena nová galerie!');

                    gallery = testing_gallery;
                    password = testing_password;

                    window.localStorage.setItem('gallery',gallery);
                    window.localStorage.setItem('password',password);


                    objects = new GALLERY.Objects.Array();
                    $('#show-gallery').attr('href','../viewer?gallery='+gallery);
                    createMap();

                    $('#select-gallery').hide();


                }).fail(function () {
                });



            }

        }


    });
}



function logout() {

    if(confirm('Opravdu se chcete odhlásit?')){


        gallery = undefined;
        password = undefined;
        window.localStorage.removeItem('gallery');
        window.localStorage.removeItem('password');
        $('#select-gallery').show();



    }

}




function processFirstLogin(){


    var testing_gallery  = window.localStorage.getItem('gallery');
    var testing_password = window.localStorage.getItem('password');
    if(testing_gallery && testing_password){
        loginOrCreate(testing_gallery,testing_password);
    }





    $('#select-gallery').submit(function (e) {

        e.preventDefault();


        var testing_gallery  = $(this).find('input[name="gallery"]').val();
        var testing_password = $(this).find('input[name="password"]').val();


        loginOrCreate(testing_gallery,testing_password);



    });






        /*$.get(config.GALLERY_API_URL +'galleries/'+ gallery).done(function (response) {


            console.log('done', response);

            05-objects = response;
            createMap()


        }).fail(function () {


            $.post({
                url: config.GALLERY_API_URL +'galleries/'+ gallery,
                contentType: "application/json",
                data: JSON.stringify([])

            }).done(function (response) {


                console.log('done', response);

                Message.success('Byla vytvořena nová galerie!');

                05-objects = [];
                createMap()


            }).fail(function () {
            });


        });*/





    /*$('#select-gallery').find('input[name="gallery"]').val('test-local2');
    $('#select-gallery').find('input[name="password"]').val('xxx');
    $('#select-gallery').trigger('submit');
    /**/
    
};



