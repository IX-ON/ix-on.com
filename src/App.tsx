import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NorthStarSection } from './components/NorthStarSection';
import { ProcessMappingSection } from './components/ProcessMappingSection';
import { DataLineageSection } from './components/DataLineageSection';
import { AutomatedDocPipelines } from './components/AutomatedDocPipelines';
import { ExecutionFramework } from './components/ExecutionFramework';
import { WhyIxOn } from './components/WhyIxOn';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState<string>('North Star: Mortgage Case Management');

  const handleSelectSolutionForContact = (solutionName: string) => {
    setSelectedInterest(solutionName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#14171F] selection:bg-[#D8CABA] selection:text-[#14171F]">
      <Navbar />
      <main>
        <Hero />
        <NorthStarSection onSelectSolutionForContact={handleSelectSolutionForContact} />
        <ProcessMappingSection />
        <DataLineageSection />
        <AutomatedDocPipelines />
        <ExecutionFramework />
        <WhyIxOn />
        <ContactSection initialInterest={selectedInterest} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
