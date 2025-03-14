import { useState, useEffect } from "react";

const Carousel = ({ slides = [], autoPlay = true, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || slides.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [autoPlay, interval, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Return nothing if slides array is empty
  if (!slides || slides.length === 0) {
    return <div className="text-center py-8">No slides available.</div>;
  }

  return (
    <div className="relative w-full h-[400px]">
      {/* Slides Container */}
      <div className="relative overflow-hidden w-full h-full rounded-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full h-full flex-shrink-0 flex justify-center items-center p-40 ${slide.bg}`}
              style={{
                flex: "0 0 100%",
                height: "100%",
                background: slide.bgColor || "transparent",
              }}
            >
              {/* Centering the content inside each slide */}
              <div className="text-center h-screen">
                <span className="text-4xl text-gray-800">{slide.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute inset-y-0 left-0 flex items-center justify-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-l-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 size-5"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute inset-y-0 right-0 flex items-center justify-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-r-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 size-5"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span className="sr-only">Next</span>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 border border-gray-400 rounded-full ${
              activeIndex === index
                ? "bg-blue-700 border-blue-700"
                : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
