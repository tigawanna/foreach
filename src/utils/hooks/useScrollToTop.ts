import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTopOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }, [pathname]);
}

export default useScrollToTopOnRouteChange;
