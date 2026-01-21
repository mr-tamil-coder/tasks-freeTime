import React from 'react';
import { Heart } from 'lucide-react';

const RetainerServices = () => {
  return (
    <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse gap-16 items-center">
            {/* Right Text (inverted layout) */}
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
                    {/* Add more as needed to match height */}
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

            {/* Left Image Card */}
            <div className="w-full md:w-1/2 relative">
                 <div className="w-full aspect-[4/5] bg-primary rounded-[3rem] relative overflow-visible">
                     {/* Image overlaps the yellow card */}
                     <div className="absolute top-10 right-10 bottom-[-20px] left-[-20px] bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
                         <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            [Sketching/Planning Image]
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    </section>
  );
};

export default RetainerServices;
