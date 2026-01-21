import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SuccessStories = () => {
    return (
        <section id="portfolio" className="py-24 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Success in Action</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     {/* Purple Card */}
                     <div className="bg-[#6000E0] rounded-[2rem] p-8 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="mb-6 w-full">
                           {/* Laptop Mockup Placeholder */}
                           <div className="bg-black/20 w-full aspect-video rounded-lg"></div>
                        </div>
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-4">
                            <span className="text-black font-bold text-xs">Gym</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">
                            A wellness platform helping you stay fit, focused, and mentally balanced on the go.
                        </p>
                     </div>

                     {/* Dark Blue Card */}
                     <div className="bg-[#1A1A50] rounded-[2rem] p-8 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="mb-6 w-full flex justify-center gap-2">
                           {/* Mobile Mockup Placeholder */}
                           <div className="bg-white/10 w-16 h-32 rounded-[1rem]"></div>
                           <div className="bg-white/10 w-16 h-32 rounded-[1rem] mt-4"></div>
                        </div>
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-4">
                             <span className="text-black font-bold text-xs">App</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">
                            A modern D2C fintech service enabling flexible and inclusive credit for all.
                        </p>
                     </div>

                     {/* Light Blue Card */}
                     <div className="bg-[#3B82F6] rounded-[2rem] p-8 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
                        <div className="mb-6 w-full relative h-[150px] bg-black/10 rounded-lg overflow-hidden">
                           {/* Dashboard/Abstract Placeholder */}
                        </div>
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-4">
                             <span className="text-black font-bold text-xs">Log</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">
                            A smart shipping and fleet platform built to streamline logistics for flippers and fleet owners.
                        </p>
                     </div>
                </div>

                 {/* White Carousel Controls */}
                <div className="flex justify-end gap-2">
                   <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                      <ArrowLeft className="w-4 h-4" />
                   </button>
                   <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                      <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
