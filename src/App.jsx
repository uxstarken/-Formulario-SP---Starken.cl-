import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Proposal3InteractiveCards from './components/Proposal3InteractiveCards';

export default function App() {
  const handleScrollToForm = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-['Nunito',sans-serif] text-[#2b2e2c] relative">
      {/* Navbar Oficial Starken */}
      <Navbar
        onOpenForm={handleScrollToForm}
        activeView="form"
        onGoHome={handleScrollToForm}
      />

      {/* Main Content: Renderiza directamente la Propuesta de Tarjetas Interactivas */}
      <main className="flex-1 pt-1.5 sm:pt-2 pb-16 sm:pb-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          <Proposal3InteractiveCards />
        </div>
      </main>

      {/* Footer Oficial Starken con hipervínculo "Ser Soy Starken" */}
      <Footer onOpenForm={handleScrollToForm} />
    </div>
  );
}

