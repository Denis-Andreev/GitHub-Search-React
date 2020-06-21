import React from "react";

export const ScrollToTop = (props) => {
    const [scroll, setScroll] = React.useState(false);

    const scrollToTop = (e) => {
        window.scrollTo(0,0);
    }
    const scrollHandler = (e) => {
        debugger;
        if(window.innerHeight <  window.pageYOffset) {
            setScroll(true);
        } else {
            setScroll(false)
        }
    }
    window.addEventListener('scroll', scrollHandler);
    return (
        scroll ?
            <div className={'scrollButton'} onClick={scrollToTop}>
                <div>&#x25B2;</div>
            </div>
            :  null
    )
}