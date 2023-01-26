import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTopOnRouteChange() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
}

export default useScrollToTopOnRouteChange;
