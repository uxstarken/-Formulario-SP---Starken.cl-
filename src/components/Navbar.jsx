import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenForm, activeSegment = 'Emprendedores', onSelectSegment }) {
  const [currentSegment, setCurrentSegment] = useState(activeSegment);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const segments = ['Personas', 'Emprendedores', 'Empresas', 'Internacional'];

  const handleSegmentClick = (seg) => {
    setCurrentSegment(seg);
    if (onSelectSegment) onSelectSegment(seg);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs font-['Nunito',sans-serif]">
      {/* 1. TOP BAR CORPORATIVA (#303030) */}
      <div className="bg-[#303030] text-white px-4 lg:px-12 h-10 flex items-center justify-between text-[13px] font-medium select-none">
        {/* Segmentos de clientes */}
        <div className="flex items-center space-x-1 sm:space-x-3 h-full overflow-x-auto no-scrollbar">
          {segments.map((seg) => {
            const isActive = currentSegment === seg;
            return (
              <button
                key={seg}
                onClick={() => handleSegmentClick(seg)}
                className={`h-full px-3 sm:px-4 flex items-center relative transition-colors duration-150 cursor-pointer text-xs sm:text-[13px] ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white opacity-80 hover:opacity-100'
                }`}
              >
                {seg}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#029E47] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Centro de Ayuda */}
        <div className="flex items-center">
          <a
            href="https://starken.cl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-gray-300 hover:text-[#1ED760] transition-colors text-xs font-semibold"
          >
            <span>Centro de ayuda</span>
            <HelpCircle className="w-4 h-4 text-gray-300" />
          </a>
        </div>
      </div>

      {/* 2. MAIN NAV BAR (#ffffff, altura 80px) */}
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Starken */}
        <div className="flex items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); if (onOpenForm) onOpenForm(); }} className="flex items-center">
            <img
              src="/logo.png"
              alt="Starken"
              className="h-12 w-auto object-contain"
            />
          </a>
        </div>

        {/* Links de navegación centrales */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-[#444444] font-medium">
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#029E47] transition-colors">
            <span>Envíos</span>
            <ChevronDown className="w-4 h-4 text-[#029E47]" />
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#029E47] transition-colors">
            Puntos red Starken
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#029E47] transition-colors">
            Servicios
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#029E47] transition-colors">
            Tarifas
          </a>
        </nav>

        {/* Botón Ingresar */}
        <div className="hidden sm:flex items-center">
          <button
            type="button"
            className="bg-[#009D4E] hover:bg-[#008743] active:bg-[#007439] text-white px-8 py-2.5 rounded-xl font-bold text-[14px] shadow-sm transition-all duration-150 cursor-pointer min-w-[130px] text-center"
          >
            Ingresar
          </button>
        </div>

        {/* Hamburger Mobile */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#009D4E] focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile Desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          <a href="#" className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#009D4E]">Envíos</a>
          <a href="#" className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#009D4E]">Puntos red Starken</a>
          <a href="#" className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#009D4E]">Servicios</a>
          <a href="#" className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#009D4E]">Tarifas</a>
          <div className="pt-2">
            <button className="w-full bg-[#009D4E] text-white py-2.5 rounded-xl font-bold text-sm">
              Ingresar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
