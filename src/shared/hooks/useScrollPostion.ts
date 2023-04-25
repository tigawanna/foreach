import { useState, useEffect } from "react";

function useWindowPosition() {
  const [position, setPosition] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  useEffect(() => {
    function handleScroll() {
      setPosition({ x: window.scrollX, y: window.scrollY });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return position;
}

export default useWindowPosition;
