import React from 'react';
import { Heart } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="bg-white pt-24 pb-0 relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-20">
                
                {/* Left Text */}
                <div className="w-full md:w-1/3 pt-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">Questions? Ideas?</h2>
                    <h3 className="text-xl text-gray-600 mb-8 font-medium">Let's Connect!</h3>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                        If you're looking to collaborate or need more details, drop us a message and we'll connect with you.
                    </p>
                    <p className="text-xs text-black font-semibold">
                        Reach out, and let's build a plan that delivers measurable impact.
                    </p>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-2/3">
                     <form className="flex flex-col gap-6">
                        <div className="relative border-b border-gray-200">
                             <input type="text" placeholder="First Name *" className="w-full py-3 outline-none text-sm placeholder-gray-800" />
                        </div>
                        <div className="relative border-b border-gray-200">
                             <input type="text" placeholder="Last Name *" className="w-full py-3 outline-none text-sm placeholder-gray-800" />
                        </div>
                        <div className="relative border-b border-gray-200">
                             <input type="email" placeholder="Email *" className="w-full py-3 outline-none text-sm placeholder-gray-800" />
                        </div>
                         <div className="relative border-b border-gray-200">
                             <input type="tel" placeholder="Phone Number *" className="w-full py-3 outline-none text-sm placeholder-gray-800" />
                        </div>
                        <div className="relative border-b border-gray-200">
                             <textarea placeholder="Write Your Message Here *" className="w-full py-3 outline-none text-sm placeholder-gray-800 resize-none h-24"></textarea>
                        </div>
                        
                        <div className="flex justify-end gap-4 mt-4">
                            <button type="button" className="px-8 py-2 border border-gray-300 rounded-full text-xs font-semibold hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="button" className="px-8 py-2 bg-transparent border border-primary text-black rounded-full text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-2 shadow-[4px_4px_0px_#FACC15]">
                                Submit Now
                                <Heart className="w-3 h-3 fill-black text-black" />
                            </button>
                        </div>
                     </form>
                </div>
             </div>

             {/* Mega Footer Background Text */}
             <div className="w-full bg-[#1A1A1A] mt-20 pt-16 pb-8 relative overflow-hidden">
                 {/* Huge Ghost Text */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none">
                     <span className="text-[15vw] font-bold text-white tracking-widest leading-none whitespace-nowrap">
                         morempathy
                     </span>
                 </div>
                 
                 {/* Footer Links (Overriding previous simple footer) */}
                 <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
                      <div className="text-primary font-bold text-2xl mb-8">morempathy.</div>
                      <div className="flex gap-8 text-xs text-gray-400 mb-8 uppercase tracking-widest">
                          <a href="#" className="hover:text-primary transition-colors">About Us</a>
                          <a href="#" className="hover:text-primary transition-colors">Our Services</a>
                      </div>
                      <div className="flex gap-4 mb-16">
                          {['X', 'in', 'IG'].map((icon, i) => (
                              <div key={i} className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                                  <span className="text-[10px]">{icon}</span>
                              </div>
                          ))}
                      </div>
                      
                      <div className="w-full flex justify-between text-[10px] text-gray-600 border-t border-gray-800 pt-6">
                          <span>© 2024 MoreEmpathy. All rights reserved.</span>
                          <span>Privacy Policy | Terms of Service</span>
                      </div>
                 </div>
             </div>
        </section>
    );
};

export default Contact;
