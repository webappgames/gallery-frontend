/// <reference path="../../../shared/script/reference" />



d('develop-menu');

//import Draggable from 'react-draggable';



module GALLERY.Viewer {


    export function DevelopMenu(props: {app: GalleryApp}) {

        let {app} = props;

        r(app.options);

        return (
            <ReactDraggable>
                <div className="develop-menu">
                    <h2>Actions</h2>
                    <ul>
                        {app.options.deployObjects.map(function (deploy, i) {
                            return (
                                <li key={i}>
                                    <a onClick={GALLERY.Viewer.deployToFTP.bind(GALLERY.Viewer,deploy)}>{deploy.toString()}</a>
                                </li>
                            );
                        })}
                        <li><a onClick={GALLERY.Viewer.downloadZip}>Download as ZIP</a></li>
                        {/*<a onClick={GALLERY.Viewer.showStats}>Show stats</a>*/}
                    </ul>
                    <h2>Labels</h2>
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
