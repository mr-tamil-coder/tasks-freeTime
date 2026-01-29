import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

const DiscoveryServices = () => {
    const services = [
        "Research & Diagnostics",
        "Usability Testing",
        "Accessibility Audit",
        "Empathy & Affinity Mapping",
        "Journey & Flow Mapping",
        "AI-Driven Design Discovery Sprint",
        "Strategic Roadmapping",
        "Microcopy & Content Strategy",
        "Design Sprints & Innovation Workshops"
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
                {/* Left Text */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Design Discovery <br/> Services</h2>
                    <p className="text-gray-600 text-base mb-10 max-w-md leading-relaxed">
                        Short-to-mid-term sprints that uncover user needs, identify friction points, and lay the foundation for smart, scalable design.
                    </p>

                    <div className="grid grid-cols-1 gap-3 mb-8">
                        {services.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Heart className="w-3 h-3 fill-primary text-primary" />
                                <span className="text-sm font-medium text-gray-800">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 border border-primary px-6 py-2 rounded-full font-medium text-xs hover:bg-primary/10 transition-colors cursor-pointer">
                        Discover More
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                    </button>
                </div>

                {/* Right Image Card */}
                <div>
                   <img src="./design.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default DiscoveryServices;
