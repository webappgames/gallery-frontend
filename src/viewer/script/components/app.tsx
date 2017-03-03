/// <reference path="./develop-menu" />

d('app');

module GALLERY.Viewer.Components {

    export function App(props: {app: GalleryApp}) {

        let {app} = props;


        return (
            <div>

                {/*todo is thare a better was to declare canvas? When using only <canvas id="" ></canvas>, react render it as <viewer-canvas id="" ></viewer-canvas>*/}
                <div dangerouslySetInnerHTML={{ __html: `<canvas id="scene" ></canvas>` }}></div>


                <div className="fps" style={{display: 'none'}} />
                <div className="overlay" style={{display: 'none'}} />
                <div className="popup-window" style={{display: 'none'}}>
                    <div className="header" />
                    <div className="content" />
                    <div className="confirm js-popup-window-confirm"><i className="fa fa-paper-plane-o" aria-hidden="true" /></div>
                    <div className="close js-popup-window-close"><i className="fa fa-times" aria-hidden="true" /></div>
                </div>
                <section id="newsletter-window" style={{display: 'none'}}>
                    <div className="arrow" />
                    <i className="close fa fa-times" aria-hidden="true" />
                    <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </section>
                <section id="zones" />
                <section id="boards" />
                <section id="posters" />
                <section id="popups" />


                {app.develop?<DevelopMenu app={app}/>:null}


            </div>
        )
    }

}
