import React from 'react';
import { Rocket, Building2, Users } from 'lucide-react';

const Innovation = () => {
    const cards = [
        {
            id: 1,
            icon: Rocket,
            title: 'Startups',
            description: 'Launch market-ready solutions with agile design and rapid prototyping.'
        },
        {
            id: 2,
            icon: Building2,
            title: 'Enterprises',
            description: 'Launch market-ready solutions with agile design and rapid prototyping.'
        },
        {
            id: 3,
            icon: Users,
            title: 'Mid-Sized Firms',
            description: 'Launch market-ready solutions with agile design and rapid prototyping.'
        }
    ];

    return (
        <section id="services" className="py-24 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
                    Innovation for Every Ambition
                </h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Cards */}
                    <div className="flex flex-col gap-6">
                        {cards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="group bg-white hover:bg-yellow-400 transition-all duration-300 p-6 rounded-2xl cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-yellow-400 group-hover:bg-black rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-black group-hover:text-yellow-400 transition-colors duration-300" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-black mb-2">
                                        {card.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 group-hover:text-black transition-colors duration-300">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Image */}
                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="./innovation.png"
                                alt="Creative Design Workspace"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Innovation;
