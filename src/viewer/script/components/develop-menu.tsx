/// <reference path="../../../shared/script/reference" />



d('develop-menu');

//import Draggable from 'react-draggable';



module GALLERY.Viewer {


    export function DevelopMenu(props: {app: GalleryApp}) {

        let {app} = props;

        return (
            <ReactDraggable>
                <div className="develop-menu">
                    <a onClick={GALLERY.Viewer.deployToFTP}>Deploy to FTP</a>
                    <a onClick={GALLERY.Viewer.downloadZip}>Download as ZIP</a>
                    <a onClick={GALLERY.Viewer.showStats}>Show stats</a>
                    <ul>
                        {app.objects.filterTypes('label').map(function (label, i) {
                            return (
                                <li key={i}>
                                    <a onClick={app.setState.bind(app,label.uri +window.location.hash,undefined,undefined)}>{label.name}
                                        ({label.uri})</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </ReactDraggable>
        );


    }


};
