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
import { NorthStarCloudGatewayModal } from './components/NorthStarCloudGatewayModal';

export const App: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState<string>('North Star: Mortgage Case Management');
  const [cloudGatewayOpen, setCloudGatewayOpen] = useState(false);
  const [cloudGatewayTab, setCloudGatewayTab] = useState<'signin' | 'subscribe'>('signin');

  const handleSelectSolutionForContact = (solutionName: string) => {
    setSelectedInterest(solutionName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCloudGateway = (tab: 'signin' | 'subscribe' = 'signin') => {
    setCloudGatewayTab(tab);
    setCloudGatewayOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#14171F] selection:bg-[#D8CABA] selection:text-[#14171F]">
      <Navbar onOpenCloudGateway={handleOpenCloudGateway} />
      <main>
        <Hero onOpenCloudGateway={handleOpenCloudGateway} />
        <NorthStarSection 
          onSelectSolutionForContact={handleSelectSolutionForContact}
          onOpenCloudGateway={handleOpenCloudGateway}
        />
        <ProcessMappingSection />
        <DataLineageSection />
        <AutomatedDocPipelines />
        <ExecutionFramework />
        <WhyIxOn />
        <ContactSection initialInterest={selectedInterest} />
      </main>
      <Footer />

      {/* Restricted North Star Clouds Paid Gateway Modal */}
      <NorthStarCloudGatewayModal
        isOpen={cloudGatewayOpen}
        onClose={() => setCloudGatewayOpen(false)}
        initialTab={cloudGatewayTab}
      />
    </div>
  );
};

export default App;

