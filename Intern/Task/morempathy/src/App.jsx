import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DiscoveryServices from './components/DiscoveryServices';
import RetainerServices from './components/RetainerServices';
import Deliverables from './components/Deliverables';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';
// import Digital from './components/DigitalEdge';
import Innovation from './components/Innovation';
import DigitalEdge from './components/Digital';
import SuccessInAction from './components/SuccessInAction';
import Vinoth from './components/Vinoth';
function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary selection:text-black font-sans">
      {/* <Navbar />
      <Hero />
      <Innovation />
      <DigitalEdge />
      <DiscoveryServices />
      <RetainerServices />
       <Deliverables />
       <SuccessInAction /> */}
       <Vinoth /> 
      {/* <DigitalEdge /> */}
      {/* 
      <Deliverables />
      <SuccessStories /> */}
      {/* <Contact /> */}
    </div>
  );
}

export default App;
