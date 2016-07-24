/**
 * Created by Pavel on 14.07.2016.
 */



$(function(){



    $.get('api/map.php?gallery='+gallery).fail(function (response) {

        console.log('fail',response);

    }).done(function (response) {
        

        console.log('done', response);

        objects = response;
        createMap()
        


    });
    
    
});