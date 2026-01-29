import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SuccessInAction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "https://morempathy.digital/assets/icons/mobile.svg",  
      desc: "Innovative, high-quality real estate spaces designed to inspire and elevate lifestyles.",
      imgBg: "https://morempathy.digital/assets/images/home/minigroup.svg",
      bgColor: "bg-blue-500",
    },
    {
      title: "https://morempathy.digital/assets/icons/mobile.svg",
      desc: "A modern, data-driven telco with agile infrastructure and deep customer insight.",
      imgBg: "https://morempathy.digital/assets/images/home/minigroup.svg",
      bgColor: "bg-orange-500",
    },
    {
      title: "https://morempathy.digital/assets/icons/mobile.svg",
      desc: "A wellness platform helping you stay fit, focused, and mentally balanced on the go.",
      imgBg: "https://morempathy.digital/assets/images/home/minigroup.svg",
      bgColor: "bg-purple-600",
    },
    {
      title: "https://morempathy.digital/assets/icons/mobile.svg",
      desc: "Innovative, high-quality real estate spaces designed to inspire and elevate lifestyles.",
      imgBg: "https://morempathy.digital/assets/images/home/minigroup.svg",
          bgColor: "bg-purple-600",
    },
    {
     title: "https://morempathy.digital/assets/icons/mobile.svg",
      desc: "A modern, data-driven telco with agile infrastructure and deep customer insight.",
      imgBg: "https://morempathy.digital/assets/images/home/minigroup.svg",
          bgColor: "bg-purple-600",
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
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Success in Action
        </h2>

        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {visibleCards.map((card, i) => (
            <div
              key={`${currentIndex}-${i}`}
              className={`${card.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg mb-6">
                <img
                  src={card.imgBg}
                  className="w-3xl h-2xl object-cover"
                />
              </div>

              <div className="text-center">
                <div className="inline-block bg-white rounded-lg px-4 py-2 mb-4">
                  <h3 className="font-bold text-xl text-gray-900">
                    <img src={card.title} alt="" />
                  </h3>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden mb-8">
          <div className={`${visibleCards[0].bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-300`}>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg mb-6">
              <img
                src={visibleCards[0].imgBg}
                alt={visibleCards[0].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              {/* <div className="inline-block bg-white rounded-lg px-4 py-2 mb-4">
                <h3 className="font-bold text-xl text-gray-900">
                  {visibleCards[0].title}
                </h3>
              </div> */}
              <p className="text-white text-sm leading-relaxed">
                {visibleCards[0].desc}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all duration-200 active:scale-95 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNext}
            className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-all duration-200 active:scale-95 ${
              currentIndex === cards.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessInAction;
