import React from 'react';
import { Heart } from 'lucide-react';

const RetainerServices = () => {
  return (
    <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Premium Retainer <br/> Services</h2>
                <p className="text-gray-600 text-base mb-10 max-w-md leading-relaxed">
                   Long-term design partnerships to execute, iterate, and scale impactful experiences across the product lifecycle.
                </p>

                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-sm font-medium text-gray-800">Wireframing, Prototyping & A/B Testing</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-sm font-medium text-gray-800">AI-Powered UX Audit & Redesign</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-sm font-medium text-gray-800">Design Systems & UI Kits</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-sm font-medium text-gray-800">Continuous User Research</span>
                    </div>
                </div>

                 <button className="flex items-center gap-2 border border-primary px-6 py-2 rounded-full font-medium text-xs hover:bg-primary/10 transition-colors cursor-pointer">
                    View Pricing
                    <Heart className="w-3 h-3 fill-primary text-primary" />
                </button>
            </div>

            <div className="w-full md:w-1/2 relative">
               <img src="./design.png" alt="" />
            </div>
        </div>
    </section>
  );
};

export default RetainerServices;
