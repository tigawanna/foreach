import { useEffect } from "react";
import { useLocation } from "rakkasjs";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export function RouterTransition() {
  const location = useLocation();
  useEffect(() => {
    if (location.pending) {
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [location]);

  return <NavigationProgress autoReset={true} />;
}
