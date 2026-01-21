import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const DigitalEdge = () => {
    return (
        <section id="services" className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">The morempathy digital Edge</h2>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left Cards */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2">Empathy-First, AI-Enhanced UX Design</h3>
                            <p className="text-gray-500 text-sm">Blend human insights with AI to craft solutions that connect instantly.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2">Seamless Transition from Discovery to Delivery</h3>
                            <p className="text-gray-500 text-sm">Ensure design vision and strategy stay consistent from concept to launch.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2">AI-Enhanced Design Thinking Framework</h3>
                            <p className="text-gray-500 text-sm">Achieve faster results with data-driven insights and adaptive iterations.</p>
                        </div>
                    </div>

                    {/* Right Heart Graphic */}
                    <div className="w-full md:w-1/2 flex justify-center relative">
                        {/* Big Yellow Heart Shape */}
                        <div className="relative w-[400px] h-[350px]">
                            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                                <path d="M50 88 C 20 65 0 45 0 30 C 0 10 20 0 40 10 C 50 15 50 15 60 10 C 80 0 100 10 100 30 C 100 45 80 65 50 88" fill="#FACC15" />
                            </svg>
                            {/* Image Placeholder inside Heart */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="w-full h-full bg-black/10 rounded-full overflow-hidden flex items-center justify-center relative mask-image">
                                    {/* Abstract Robot Hand Rep */}
                                     {/* Since we don't have the image, we use an abstract representation or placeholder */}
                                    <div className="text-center text-xs opacity-50 font-mono rotate-[-10deg]">
                                        [Robot Hand <br/> Meeting Human Hand]
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalEdge;
