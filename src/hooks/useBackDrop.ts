import { useState, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export function useBackDrop() {
  const [open, setOpen] = useState(false);

  const { is_mobile } = useWindowSize();

  useEffect(() => {
    if (!is_mobile) {
      setOpen(true);
    }
  }, [is_mobile]);

  // create me a function to setOpen(false) after 100ms

  const slowlyCloseBackdrop = () => {
    if (is_mobile) {
      setTimeout(() => {
        setOpen(false);
      }, 150);
    }
  };

  {
    return {
      open,
      setOpen,
      is_mobile,
      slowlyCloseBackdrop,
    };
  }
}
