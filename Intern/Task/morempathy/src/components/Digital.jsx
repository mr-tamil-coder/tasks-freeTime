import React from "react";

export default function DigitalEdge() {
  const features = [
    {
      title: "Empathy–First, AI–Enhanced UX Design",
      description:
        "Blend human insights with AI to craft solutions that connect instantly.",
    },
    {
      title: "Seamless Transition from Discovery to Delivery",
      description:
        "Ensure design vision and strategy stay consistent from concept to launch.",
    },
    {
      title: "AI–Enhanced Design Thinking Framework",
      description:
        "Achieve faster results with data–driven insights and adaptive iterations.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20 px-8">
      <div className="max-w-7xl mx-auto">
    
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          The morempathy digital Edge
        </h2>

 
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

           <div className=" inset-0 flex items-center justify-center z-10">
                  <img  
                    src="./digital.png"
                    alt="AI Robot Hand"
                    className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
                  />
                </div>
      
          </div>
      </div>
    </div>
  );
}
