/// <reference path="./reference.ts" />


/*
module GALLERY.Viewer{



    export function runStats() {


        var cookie = window.localStorage.getItem('cookie');
        if (!cookie) {
            cookie = createGuid();
            window.localStorage.setItem('cookie', cookie);
        }

        var session = createGuid();


        $.post({
            url: STATSERVER_URL+'/sessions',

            contentType: 'application/json',
            data: JSON.stringify({
                session: session,
                cookie: cookie,
                gallery: window.location.hostname,
                //ip: String,
                //user_agent: String
            })

        }).done(function (response) {
            r('Stats initialized!');
        });


        var xl, yl, zl;


        setInterval(function () {


            let x = camera.position.x / -BLOCK_SIZE;
            let y = camera.position.z / BLOCK_SIZE;
            let z = camera.position.y / BLOCK_SIZE; //- BLOCKS_1NP_LEVEL;

            x = Math.round(x * 100) / 100;
            y = Math.round(y * 100) / 100;
            z = Math.round(z * 100) / 100;


            if (x != xl || y != yl || z != zl) {

                xl = x;
                yl = y;
                zl = z;


                $.post({
                    url: STATSERVER_URL+'/states',

                    contentType: 'application/json',
                    data: JSON.stringify({
                        session: session,
                        world: world_selected,
                        time: new Date() / 1000,
                        x: x,
                        y: y,
                        z: z
                    })

                }).done(function (response) {
                    r('Stats position send!');
                });

            }


        }, 300);


    }

}*/