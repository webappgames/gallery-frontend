





GALLERY.installPlugin(new GALLERY.Generator(






));







function createRoom(images){


    const min_size = 10;
    const distance_between_images = 1;



    let width = 4*distance_between_images;

    images.forEach(function () {

        width += images.width;
        width += distance_between_images;
    });










}