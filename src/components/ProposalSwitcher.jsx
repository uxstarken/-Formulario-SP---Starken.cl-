import React from 'react';
import { Sliders, Check } from 'lucide-react';

export default function ProposalSwitcher({ activeProposal, onSelectProposal }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 font-['Nunito',sans-serif]">
      <div className="bg-[#1f2937]/90 hover:bg-[#111827] backdrop-blur-md text-white px-2 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-1.5 transition-all">
        <span className="text-[11px] font-semibold text-gray-400 pl-2 pr-1 hidden sm:inline flex items-center gap-1">
          <Sliders className="w-3 h-3 text-[#1ED760]" />
          <span>Vista:</span>
        </span>

        {/* Botón Propuesta 1 (Dropdown) */}
        <button
          onClick={() => onSelectProposal(1)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeProposal === 1
              ? 'bg-[#009239] text-white shadow-xs'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          title="Propuesta 1: Selector con Dropdown + Recuadro Informativo"
        >
          {activeProposal === 1 && <Check className="w-3 h-3" />}
          <span>P1 · Dropdown</span>
        </button>

        {/* Botón Propuesta 2 (Cards) */}
        <button
          onClick={() => onSelectProposal(2)}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeProposal === 2
              ? 'bg-[#009239] text-white shadow-xs'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          title="Propuesta 2: Selector con Cards Horizontales + Recuadro Informativo"
        >
          {activeProposal === 2 && <Check className="w-3 h-3" />}
          <span>P2 · Cards Horizontales</span>
        </button>
      </div>
    </div>
  );
}
