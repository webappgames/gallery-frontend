

module GALLERY.Viewer {

    export function PopupArrow(props) {

        //r(props);


        const POPUP_WIDTH = 200;
        const WINDOW_WIDTH = $(window).width();//todo no pure
        const POPUP_TOP = 20;
        const POPUP_MARGIN = 10;
        const ARROW_LEFT = 60;


        const offset = $(props.anchor).offset();


        let left = offset.left + $(props.anchor).outerWidth() / 2 - (ARROW_LEFT);
        const leftNoBorders = left;


        if (left < POPUP_MARGIN)left = POPUP_MARGIN;
        if (left > WINDOW_WIDTH - POPUP_WIDTH - POPUP_MARGIN)left = WINDOW_WIDTH - POPUP_WIDTH - POPUP_MARGIN;


        const style = {
            display: props.opened?'block':'none',
            position: 'absolute',
            //todo Measure width: POPUP_WIDTH,
            top: offset.top - (-$(props.anchor).outerHeight()) + POPUP_TOP,
            left: left,
        };

        return (


            <section id="newsletter-window" style={style}>

                <div className="arrow" style={{left: ARROW_LEFT + leftNoBorders - left}}></div>
                {props.hasClose?<i className="close fa fa-times" aria-hidden="true" onClick={props.close}></i>:null}

                <div className="content">
                    {props.children}
                </div>

            </section>



        )
    }

}