import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Deliverables = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "System Requirements & Process Flows Documentation",
      desc: "Clear, structured documentation for smooth collaboration and team alignment.",
      imgBg: "./deliverables/1.png",
    },
    {
      title: "Project Plan with MVP Roadmap & Phased Launch",
      desc: "A comprehensive roadmap to prioritize features and ensure a smooth product launch.",
      imgBg: "./deliverables/2.png",
    },
    {
      title: "Strategic Clarity & Actionable Insights",
      desc: "Key insights and strategies to guide your development with confidence and focus.",
      imgBg: "./deliverables/3.png",
    },
    {
      title: "Technical Architecture & Scalability Blueprint",
      desc: "Robust technical foundation designed for growth and long-term success.",
      imgBg: "./deliverables/1.png",
    },
    {
      title: "User Experience & Design System",
      desc: "Intuitive interfaces and consistent design patterns for exceptional user engagement.",
      imgBg: "./deliverables/2.png",
    },
  ];

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (currentIndex === cards.length - 1) return;
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

              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-sm">
                <img
                  src={card.imgBg}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden mb-8">
          <div className="border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 bg-white">
            <h3 className="font-bold text-lg mb-3 leading-tight">
              {visibleCards[0].title}
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {visibleCards[0].desc}
            </p>

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-sm">
              <img
                src={visibleCards[0].imgBg}
                alt={visibleCards[0].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className={`w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95 ${
              currentIndex === cards.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
