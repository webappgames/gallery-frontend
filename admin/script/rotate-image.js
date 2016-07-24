

function rotateImage(img_element,degree){


    var img = document.createElement('img');


    img.onload = function() {

        img.onload = null;


        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var cw = img.width, ch = img.height, cx = 0, cy = 0;

        switch (degree) {
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


        img_element.src = canvas.toDataURL();

    };

    img.src = img_element.src;


};