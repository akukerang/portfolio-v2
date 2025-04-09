import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface CarouselProps {
  items: { type: "image" | "video"; src: string }[];
}
const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mt-2 relative w-full h-72 lg:h-96 overflow-hidden flex items-center justify-center">
      <div className="flex justify-center items-center bg-black w-full h-full">
        {items[currentIndex].type === "image" ? (
          <img src={items[currentIndex].src} className="h-96 object-scale-down" />
        ) :
          (
            <iframe
              src={items[currentIndex].src}
              className="w-full h-full"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )
        }
      </div>
      {items.length > 1 ? (
        <>
          <button
            className="z-50 absolute left-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer bg-gray-700 py-3 px-3 rounded-full"
            onClick={goToPrevious}
          >
            <ArrowBackIosNewIcon className="text-white" />
          </button>

          <button
            className="z-50 absolute right-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer bg-gray-700 py-3 px-3 rounded-full"
            onClick={goToNext}
          >
            <ArrowForwardIosIcon className="text-white" />
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Carousel;

