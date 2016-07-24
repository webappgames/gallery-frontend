

function rotateImage(img,degree){


    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var cw = img.width, ch = img.height, cx = 0, cy = 0;

    switch(degree){
        case 90:
            cw = img.height;
            ch = img.width;
            cy = img.height * (-1);
            break;
        case 180:
            cx = img.width * (-1);
            cy = img.height * (-1);
            break;
        case 270:
            cw = img.height;
            ch = img.width;
            cx = img.width * (-1);
            break;
    }



    //  Rotate image
    canvas.setAttribute('width', cw);
    canvas.setAttribute('height', ch);
    ctx.rotate(degree * Math.PI / 180);
    ctx.drawImage(img, cx, cy);


    img.src = canvas.toDataURL();
};