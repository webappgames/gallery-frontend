/**
 * Created by Pavel on 14.07.2016.
 */


var search =  new URI(window.location).search(true);
var gallery = search.gallery;
var config;

$(function(){


    $.get('../../config.json').done(function (response) {

        config = response;


        $.get(config.GALLERY_API_URL +'galleries/'+ gallery).done(function (response) {


            console.log('done', response);

            objects = response;
            createMap()


        }).fail(function () {


            $.post({
                url: config.GALLERY_API_URL +'galleries/'+ gallery,
                contentType: "application/json",
                data: JSON.stringify([])

            }).done(function (response) {


                console.log('done', response);

                Message.success('Byla vytvořena nová galerie!');

                objects = [];
                createMap()


            }).fail(function () {
            });


        });


    });
    
    
});