import { useState, useEffect } from "react";

export function useWindowSize() {
  const on_client = typeof window !== "undefined";
  const window_dims = on_client
    ? { width: window.innerWidth, height: window.innerHeight }
    : { width: -1, height: -1 };
  const [windowSize, setWindowSize] = useState(window_dims);

  useEffect(() => {
    function handleResize() {
      if (on_client) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }
    if (on_client) {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const is_mobile = windowSize.width <= 768;
  return { windowSize, is_mobile };
}
