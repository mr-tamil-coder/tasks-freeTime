import React from 'react';
import { Heart, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="w-full flex flex-col items-center pt-20 pb-24 px-4 bg-gradient-to-b from-yellow-50/50 to-white">

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-center tracking-tight leading-tight">
        Empathy First. AI-Led.
      </h1>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center tracking-tight">
        Design Infused. Intelligence Overloaded.
      </h2>
      
      <p className="max-w-4xl text-center text-gray-600 text-base md:text-lg mb-12 leading-relaxed px-4">
        Transform ideas into user-friendly digital products with a blend of human-centered AI design and intuitive interfaces, delivered in just 4–8 weeks — tailored for ambitious startups, scaling businesses, and industry-leading enterprises.
      </p>

      <button className="flex items-center gap-2 bg-primary hover:bg-yellow-400 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg mb-20 cursor-pointer">
        Discover More
        <Heart className="w-4 h-4 fill-black text-black" />
      </button>


      <div className="mt-10 mb-10 shadow-xl rounded-2xl overflow-hidden" style={{ width: '800px' }}>
        <iframe 
          width="800" 
          height="400"
          className="w-full aspect-square object-cover"
          src="https://www.youtube.com/embed/ektwj_MGGtE?autoplay=1&mute=1&loop=1&playlist=ektwj_MGGtE&controls=0&showinfo=0" 
          title="YouTube video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </section>    
  );
};

export default Hero;
