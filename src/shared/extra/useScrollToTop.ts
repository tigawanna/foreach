import { useLayoutEffect } from "react";

export const useScrollToTop = () => {
    useLayoutEffect(() => {
        //no-console("document .location ",document.location.href)
        if (document.location.pathname !== "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            //no-console("scrolled to top");
        }
    }, [document.location.href]);
};
