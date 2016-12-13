


namespace GALLERY.Viewer {


    export function developMenu(){


        let $developMenu = $(`
                <div class="develop-menu">
                    <a onclick="GALLERY.Viewer.deployToFTP();">Deploy to FTP</a>
                    <a onclick="GALLERY.Viewer.downloadZip();">Download as ZIP</a>
                    <a onclick="GALLERY.Viewer.showStats();">Show stats</a>
                </div>
            `);





        let $labelsMenu = $('<ul></ul>');


        console.log($labelsMenu);

        objects.filterTypes('label').forEach(function (label) {


            //todo href="'+label.uri+'"
            let $labelsItem  = $('<li><a onclick="GALLERY.Viewer.appState(\''+label.uri+'\'+window.location.hash);">'+label.name+' ('+label.uri+')</a></li>');


            $labelsMenu.append($labelsItem);



        });




        $($developMenu).append($labelsMenu);
        $('body').append($developMenu);






    }


};