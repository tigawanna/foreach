import React from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai/index.js";
import { IconContext } from "react-icons";

interface ReactModalWrapperProps {
  open: boolean;
  closeModal: () => void;
  closebutton?: boolean;
  styles?: {
    overlay_bg_color?: string;
    overlay_top?: string;
    overlay_left?: string;
    overlay_right?: string;
    overlay_bottom?: string;
    content_top?: string;
    content_left?: string;
    content_right?: string;
    content_bottom?: string;
    content_border?: string;
    content_border_radius?: string;
    content_bg_color?: string;
    content_box_shadow?: string;
  };
  delay?: number;
  child: React.ReactNode;
  deps?: any;
  responsive?: boolean;
}

const ReactModalWrapper = ({
  open,
  closeModal,
  closebutton = true,
  styles,
  child,
  deps,
  responsive = true,
}: ReactModalWrapperProps) => {
  const { isMobile } = useCheckInMobile();

  const adjustSize = (size: string, mobile_size: string) => {
    return isMobile && responsive ? mobile_size : size;
  };
  interface ModalStyles {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
  }
  const customStyles: ModalStyles = {
    overlay: {
      position: "fixed",
      zIndex: 9999999,
      top: adjustSize(styles?.overlay_top ?? "0%", "0%"),
      left: adjustSize(styles?.overlay_left ?? "15%", "0%"),
      right: adjustSize(styles?.overlay_right ?? "15%", "0%"),
      bottom: adjustSize(styles?.overlay_bottom ?? "5%", "0%"),
      backgroundColor: styles?.overlay_bg_color ?? "rgba(255, 255, 255, 0.75)",
      overflow: "hidden",
    },
    content: {
      position: "absolute",
      top: adjustSize(styles?.content_top ?? "0%", "0%"),
      left: adjustSize(styles?.content_left ?? "15%", "0%"),
      right: adjustSize(styles?.content_right ?? "15%", "0%"),
      bottom: adjustSize(styles?.content_bottom ?? "10%", "10%"),
      overflow: "hidden",
      WebkitOverflowScrolling: "touch",
      border: styles?.content_border ?? "",
      borderRadius: styles?.content_border_radius ?? "0%",
      outline: "none",
      backgroundColor: styles?.content_bg_color ?? "",
    },
  };

  return (
    <Modal
      isOpen={open}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById("root") as HTMLElement}
      style={customStyles}
      // closeTimeoutMS={delay*1000}
      contentLabel="Modal"
    >
      {closebutton ? (
        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="w-full flex justify-end"
        >
          <IconContext.Provider value={{ size: "25" }}>
            <AiOutlineCloseCircle onClick={closeModal} />
          </IconContext.Provider>
        </button>
      ) : null}

      <div
        onClick={(event) => event.stopPropagation()}
        className="h-full w-full"
      >
        {/* @ts-expect-error */}
        {React.isValidElement(child)
          ? React.cloneElement(child, { deps, open })
          : child}
      </div>
    </Modal>
  );
};

export default ReactModalWrapper;

const useCheckInMobile = () => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 700;
  return { width, isMobile };
};
