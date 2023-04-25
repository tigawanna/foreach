import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr/index.js";
import { TheIcon } from "./TheIcon";
import LandScape from "../../../assets/landscapp.svg";

interface GoodImageCarouselProps {
  height?: string | number;
  width?: string | number;
  imgs: string[];
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  autoScroll?: boolean;
  autoSrollLoop?: boolean;
}

export const GoodImageCarousel = ({
  height = 100,
  width = 100,
  imgs,
  autoScroll = false,
  autoSrollLoop = false,
  ...props
}: GoodImageCarouselProps) => {
  const [image, setImage] = useState({
    img: (imgs && imgs[0]) ?? (LandScape as string),
    idx: 0,
  });
  // console.log("images =======>   ",image.idx)
  // console.log("imags length =======>   ",image)
  const [imgSrc, setImgSrc] = useState(image.img as string);
  // const [loading,setLoading] = useState(true)
  const [isLoading, setLoading] = useState(true);

  const nextImage = () => {
    setImage((prev) => {
      if (prev.idx < imgs.length - 1) {
        setLoading(true);
        return { img: imgs[prev.idx + 1] as string, idx: prev.idx + 1 };
      }
      return prev;
    });
  };

  const prevImage = () => {
    setImage((prev) => {
      if (prev.idx > 0) {
        setLoading(true);
        return { img: imgs[prev.idx - 1] as string, idx: prev.idx - 1 };
      }
      return prev;
    });
  };

  // auto skip to next image after 500 ms
  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        if (image.idx < imgs.length - 1) {
          nextImage();
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (autoSrollLoop) {
      const interval = setInterval(() => {
        if (image.idx === imgs.length - 1) {
          setImage({ img: imgs[0] as string, idx: 0 });
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [image.idx]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const img = new Image();
    img.src = image.img as string;

    img.onload = () => {
      if (isMounted) {
        timeoutId = setTimeout(() => {
          setImgSrc(image.img as string);
          setLoading(false);
        }, 500);
      }
    };
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [image.img, image.idx]);

  return (
    <div className=" w-full lg:w-[50%] h-[50%] flex items-center justify-center gap-2 ">
      {image.idx !== 0 ? (
        <TheIcon
          Icon={GrPrevious}
          iconAction={() => {
            prevImage();
          }}
        />
      ) : null}

      <div className=" w-[80%]  h-[50%] flex items-center justify-center gap-2 ">
        <img
          style={{ filter: isLoading ? "blur(10px)" : "none" }}
          {...{
            src: imgSrc,
            alt: props.props.alt,
            height,
            width,
            loading: "lazy",
            className:
              "h-full w-full  aspect-video animate-in fade-in duration-500 rounded-lg",
            ...props,
          }}
        />
      </div>

      {image.idx !== imgs.length - 1 ? (
        <TheIcon
          Icon={GrNext}
          iconAction={() => {
            nextImage();
          }}
        />
      ) : null}
    </div>
  );
};
