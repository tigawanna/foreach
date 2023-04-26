import { UseLocationResult, useLocation } from "rakkasjs";

export function useIsNavigating() {
    const location = useLocation();
        if (location.pending) {
            return true;
        }
        return false;
    
}
