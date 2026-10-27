import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Proposal1DropdownView from './components/Proposal1DropdownView';
import Proposal2CardsView from './components/Proposal2CardsView';
import ProposalSwitcher from './components/ProposalSwitcher';

export default function App() {
  // 1 = Dropdown proposal, 2 = Cards proposal
  const [activeProposal, setActiveProposal] = useState(1);

  const handleScrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-['Nunito',sans-serif] text-[#2b2e2c] relative">
      {/* Botón Flotante Discreto para cambiar entre Propuesta 1 y Propuesta 2 */}
      <ProposalSwitcher
        activeProposal={activeProposal}
        onSelectProposal={setActiveProposal}
      />

      {/* Navbar Oficial Starken */}
      <Navbar
        onOpenForm={handleScrollToForm}
        activeView="form"
        onGoHome={handleScrollToForm}
      />

      {/* Main Content: Renderiza directamente la propuesta activa */}
      <main className={`flex-1 ${activeProposal === 1 ? 'pt-3 sm:pt-4 pb-10 sm:pb-14' : 'pt-3 sm:pt-3.5 pb-16 sm:pb-24 lg:pb-28'} bg-gradient-to-b from-gray-50/50 to-white`}>
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          {activeProposal === 1 ? (
            <Proposal1DropdownView />
          ) : (
            <Proposal2CardsView />
          )}
        </div>
      </main>

      {/* Footer Oficial Starken con hipervínculo "Ser Soy Starken" */}
      <Footer onOpenForm={handleScrollToForm} />
    </div>
  );
}
