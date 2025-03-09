import React, { useState } from "react";
import "./carousel.css";
interface CarouselProps {
  images: string[];
}
const Carousel:React.FC<CarouselProps> = ({ images }) => {
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
    <div className="carousel">
      <div className="carousel-images">
        <img src={images[currentIndex]} />
      </div>
      {images.length > 1 ? (
        <div className="carousel-buttons">
          <button onClick={goToPrevious}>❮</button>
          <button onClick={goToNext}>❯</button>
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
