import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Deliverables = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "System Requirements & Process Flows Documentation",
      desc: "Clear, structured documentation for smooth collaboration and team alignment.",
      imgBg: "bg-blue-50",
    },
    {
      title: "Project Plan with MVP Roadmap & Phased Launch",
      desc: "A comprehensive roadmap to prioritize features and ensure a smooth product launch.",
      imgBg: "bg-orange-50",
    },
    {
      title: "Strategic Clarity & Actionable Insights",
      desc: "Key insights and strategies to guide your development with confidence and focus.",
      imgBg: "bg-purple-50",
    },
    {
      title: "Technical Architecture & Scalability Blueprint",
      desc: "Robust technical foundation designed for growth and long-term success.",
      imgBg: "bg-green-50",
    },
    {
      title: "User Experience & Design System",
      desc: "Intuitive interfaces and consistent design patterns for exceptional user engagement.",
      imgBg: "bg-pink-50",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % cards.length;
      visible.push(cards[index]);
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-3">
          What You Get from Us?
        </h2>
        <p className="text-center text-gray-600 text-base mb-12 max-w-3xl mx-auto">
          We deliver the essential assets to take your project from concept to
          execution, ensuring seamless development and growth.
        </p>

        {/* Desktop View - 3 cards grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {visibleCards.map((card, i) => (
            <div
              key={`${currentIndex}-${i}`}
              className="border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
            >
              <h3 className="font-bold text-lg mb-3 min-h-[56px] leading-tight">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 min-h-[48px] leading-relaxed">
                {card.desc}
              </p>

              <div
                className={`w-full aspect-[4/3] ${card.imgBg} rounded-2xl overflow-hidden relative shadow-sm`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                  Visual Representation
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - 1 card */}
        <div className="md:hidden mb-8">
          <div className="border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 bg-white">
            <h3 className="font-bold text-lg mb-3 leading-tight">
              {visibleCards[0].title}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {visibleCards[0].desc}
            </p>

            <div
              className={`w-full aspect-[4/3] ${visibleCards[0].imgBg} rounded-2xl overflow-hidden relative shadow-sm`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                Visual Representation
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-end gap-3">
          <span className="text-sm text-gray-500 mr-2">
            {currentIndex + 1} / {cards.length}
          </span>
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-gray-800"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
