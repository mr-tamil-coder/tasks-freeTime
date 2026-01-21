import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <span className="text-2xl font-bold">morempathy<span className="text-primary">.</span></span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="mt-4 md:mt-0 text-gray-500 text-sm">
                © {new Date().getFullYear()} MoreEmpathy. All rights reserved.
            </div>
        </div>
    </footer>
  );
};

export default Footer;
