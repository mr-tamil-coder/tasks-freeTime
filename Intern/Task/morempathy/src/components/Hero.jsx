import React from 'react';
import { Heart, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="w-full flex flex-col items-center pt-20 pb-24 px-4 bg-gradient-to-b from-yellow-50/50 to-white">
      {/* Headlines */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-center tracking-tight leading-tight">
        Empathy First. AI-Led.
      </h1>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center tracking-tight">
        Design Infused. Intelligence Overloaded.
      </h2>
      
      {/* Description */}
      <p className="max-w-4xl text-center text-gray-600 text-base md:text-lg mb-12 leading-relaxed px-4">
        Transform ideas into user-friendly digital products with a blend of human-centered AI design and intuitive interfaces, delivered in just 4–8 weeks — tailored for ambitious startups, scaling businesses, and industry-leading enterprises.
      </p>

      {/* CTA Button */}
      <button className="flex items-center gap-2 bg-primary hover:bg-yellow-400 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg mb-20 cursor-pointer">
        Discover More
        <Heart className="w-4 h-4 fill-black text-black" />
      </button>

      {/* "Confusion to Clarity" Graphic Card */}
      <div className="relative w-full max-w-5xl h-[350px] md:h-[450px] bg-black rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex shadow-2xl">
        {/* Grid Background overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full flex items-center">
          
          {/* Left Text */}
          <div className="w-1/2 md:w-5/12 pl-8 md:pl-16 lg:pl-20 flex flex-col justify-center">
            <h3 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[1.1] tracking-tight">
              Turn <br />
              <span className="text-primary">Confusion</span> <br />
              <span className="text-white">Into</span> <br />
              <span className="text-primary">Clarity</span>
            </h3>
            <div className="absolute top-1/2 left-[45%] md:left-[42%] -translate-y-1/2 z-20">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                 <Play className="w-4 h-4 md:w-5 md:h-5 fill-white text-white ml-0.5" />
               </div>
            </div>
          </div>

          {/* Right Yellow Graphic */}
          <div className="flex-1 h-full relative overflow-hidden">
             {/* Diagonal Divider visual trick */}
             <div className="absolute -left-10 top-0 bottom-0 w-24 bg-black transform -skew-x-12 z-10 border-r border-gray-800"></div>
             
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
