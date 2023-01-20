import { useLayoutEffect } from "react";

export const useScrollToTop = () => {
    useLayoutEffect(() => {
        console.log("document .location ",document.location.href)
        if (document.location.pathname !== "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            console.log("scrolled to top");
        }
    }, [document.location.href]);
};
