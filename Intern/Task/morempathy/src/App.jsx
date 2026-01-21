import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DigitalEdge from './components/DigitalEdge';
import DiscoveryServices from './components/DiscoveryServices';
import RetainerServices from './components/RetainerServices';
import Deliverables from './components/Deliverables';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';
import Vinoth from './components/Vinoth.tsx';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary selection:text-black font-sans">
      <Navbar />
      <Vinoth />
      <Hero />
      <DigitalEdge />
      <DiscoveryServices />
      <RetainerServices />
      <Deliverables />
      <SuccessStories />
      <Contact />
    </div>
  );
}

export default App;
