import React, { useState } from "react";
import "./carousel.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface CarouselProps {
  images: string[];
}
const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mt-2 relative w-full h-72 lg:h-96 overflow-hidden flex items-center justify-center">
      <div className="flex justify-center items-center bg-black w-full h-full">
        <img src={images[currentIndex]} className="h-96 object-scale-down" />
      </div>
      {images.length > 1 ? (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer bg-gray-700 py-3 px-3 rounded-full"
            onClick={goToPrevious}
          >
            <ArrowBackIosNewIcon className="text-white" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer bg-gray-700 py-3 px-3 rounded-full"
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
