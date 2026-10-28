import React from 'react';

export default function ProposalSwitcher({ activeProposal, onSelectProposal }) {
  const proposals = [
    { id: 1, label: 'P1', title: 'Propuesta 1: Banner + Pestañas destacadas' },
    { id: 2, label: 'P2', title: 'Propuesta 2: Cards Horizontales' },
    { id: 3, label: 'P3', title: 'Propuesta 3: Tarjetas comparativas interactivas' }
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50 font-nunito">
      <div className="bg-[#1f2937]/95 hover:bg-[#111827] backdrop-blur-md text-white p-1 rounded-full shadow-2xl border border-white/20 flex items-center gap-1 transition-all">
        {proposals.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProposal(p.id)}
            title={p.title}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
              activeProposal === p.id
                ? 'bg-[#48185A] text-white ring-2 ring-[#F97316] shadow-md scale-105'
                : 'text-gray-300 hover:text-white hover:bg-white/15'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

