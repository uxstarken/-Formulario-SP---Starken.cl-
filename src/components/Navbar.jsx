import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenForm, activeSegment = 'Emprendedores', onSelectSegment }) {
  const [currentSegment, setCurrentSegment] = useState(activeSegment);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const segments = ['Personas', 'Emprendedores', 'Empresas', 'Internacional'];

  const handleSegmentClick = (seg) => {
    setCurrentSegment(seg);
    if (onSelectSegment) onSelectSegment(seg);
  };

  // Bloquear scroll de la página de fondo cuando el menú móvil esté abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs font-['Nunito',sans-serif]">
      {/* 1. TOP BAR CORPORATIVA (#303030) */}
      <div className="bg-[#303030] text-white px-3 sm:px-4 lg:px-12 h-10 flex items-center justify-between text-[13px] font-medium select-none">
        {/* Segmentos de clientes: distribuidos en mobile, alineados a la izquierda en desktop */}
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto space-x-1 sm:space-x-3 h-full overflow-x-auto no-scrollbar">
          {segments.map((seg) => {
            const isActive = currentSegment === seg;
            return (
              <button
                key={seg}
                onClick={() => handleSegmentClick(seg)}
                className={`h-full px-2 sm:px-4 flex items-center relative transition-colors duration-150 cursor-pointer text-xs sm:text-[13px] whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white opacity-85 hover:opacity-100'
                }`}
              >
                {seg}
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 sm:left-2 sm:right-2 h-[3px] bg-[#009D4E] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* Centro de Ayuda: SOLO visible en Desktop/Tablet, en Mobile pasa dentro del menú hamburguesa */}
        <div className="hidden md:flex items-center">
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
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>
        </div>

        {/* Links de navegación centrales (Desktop) */}
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

        {/* Botón Ingresar (Desktop) */}
        <div className="hidden md:flex items-center">
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
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#2b2e2c] hover:text-[#009D4E] focus:outline-none cursor-pointer"
            aria-label="Abrir menú"
          >
            <Menu className="w-7 h-7 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 3. MENÚ MOBILE LATERAL OFF-CANVAS CON EFECTO SLIDE-IN DESDE EL COSTADO */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop oscuro translúcido con desenfoque suave (hacer clic aquí cierra el menú) */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px] animate-fade-in-overlay transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Panel Lateral que aparece suavemente desde el costado derecho */}
          <div
            className="fixed inset-y-0 right-0 w-[84vw] max-w-[340px] bg-white shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in-right z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Header con Logo y botón de cerrar X */}
            <div className="flex items-center justify-between mb-8">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}>
                <img
                  src="/logo.png"
                  alt="Starken"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 -mr-1.5 text-[#2b2e2c] hover:text-[#009D4E] transition-colors cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6 stroke-[2.2]" />
              </button>
            </div>

            {/* Tarjetas de navegación */}
            <div className="space-y-3">
              {['Envíos', 'Puntos red Starken', 'Servicios', 'Tarifas'].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-5 py-4 bg-white hover:bg-[#FAFAFA] border border-gray-200/90 rounded-2xl text-[#2b2e2c] font-medium text-[15px] shadow-2xs transition-colors"
                >
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 stroke-[2.2]" />
                </a>
              ))}
            </div>

            {/* Separador fino */}
            <div className="border-t border-gray-200/80 my-7" />

            {/* Centro de Ayuda (icono circular verde con signo de interrogación) */}
            <div className="mb-6">
              <a
                href="https://starken.cl"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3.5 text-[#2b2e2c] hover:text-[#009D4E] transition-colors font-medium text-[15.5px]"
              >
                <HelpCircle className="w-6 h-6 text-[#009D4E] stroke-[2.2] flex-shrink-0" />
                <span>Centro de ayuda</span>
              </a>
            </div>

            {/* Botón Ingresar grande con bordes redondeados completos (rounded-full) */}
            <div className="mt-auto pt-4">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#009D4E] hover:bg-[#008743] active:bg-[#007439] text-white py-3.5 rounded-full font-bold text-[16px] shadow-md transition-all text-center cursor-pointer"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

