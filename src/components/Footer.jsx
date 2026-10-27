import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Footer({ onOpenForm }) {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#2b2e2c] text-white pt-16 pb-14 font-['Nunito',sans-serif] border-t border-[#3a3d3b]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10">
          {/* Columna 1: Marca y Reconocimientos */}
          <div className="lg:col-span-1 space-y-4">
            <img
              src="/Logo-blanco.png"
              alt="Starken"
              className="h-9 w-auto object-contain mb-3"
            />
            <p className="text-[13px] font-semibold text-white/95 leading-snug">
              En Starken tenemos capacidad de adaptación y un enfoque constante en la innovación.
            </p>
            <p className="text-[12px] text-[#cccccc] leading-relaxed">
              Somos un operador logístico integral, capaz de brindar soluciones tecnológicas y transversales a personas, emprendedores y empresas a lo largo de todo Chile.
            </p>
            <p className="text-[13px] font-bold text-white pt-1">
              ¡Envía con nosotros!
            </p>

            {/* Badges de Premios */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/premio-uno.png"
                alt="Premio Uno"
                className="h-10 w-auto object-contain"
              />
              <img
                src="/premio-uno-ranking.png"
                alt="Premio Uno Ranking"
                className="h-10 w-auto object-contain"
              />
              <img
                src="/premio-procalidad.png"
                alt="Premio Procalidad"
                className="h-7 w-auto object-contain"
              />
            </div>
          </div>

          {/* Columna 2: Información */}
          <div>
            <h4
              onClick={() => toggleSection('info')}
              className="text-[14px] font-bold text-white mb-4 flex justify-between items-center cursor-pointer md:cursor-default"
            >
              <span>Información</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${openSection === 'info' ? 'rotate-180' : ''}`} />
            </h4>
            <ul className={`space-y-2.5 text-[13px] text-[#8c9690] ${openSection === 'info' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-white transition-colors">Conoce la empresa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Condiciones de servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Código de conducta</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad de datos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prevención de delitos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Canal de denuncia</a></li>
            </ul>
          </div>

          {/* Columna 3: Accesos rápidos */}
          <div>
            <h4
              onClick={() => toggleSection('accesos')}
              className="text-[14px] font-bold text-white mb-4 flex justify-between items-center cursor-pointer md:cursor-default"
            >
              <span>Accesos rápidos</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${openSection === 'accesos' ? 'rotate-180' : ''}`} />
            </h4>
            <ul className={`space-y-2.5 text-[13px] text-[#8c9690] ${openSection === 'accesos' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-white transition-colors">Ser cliente Empresa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ser Somos Partner</a></li>
              {/* ENLACE SER SOY STARKEN */}
              <li>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="text-left font-medium text-[#8c9690] hover:text-[#1ED760] transition-colors cursor-pointer"
                >
                  Ser Soy Starken
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">StarkenPro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Turcargo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integraciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarifa simple</a></li>
            </ul>
          </div>

          {/* Columna 4: Servicio al cliente */}
          <div>
            <h4
              onClick={() => toggleSection('servicio')}
              className="text-[14px] font-bold text-white mb-4 flex justify-between items-center cursor-pointer md:cursor-default"
            >
              <span>Servicio al cliente</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${openSection === 'servicio' ? 'rotate-180' : ''}`} />
            </h4>
            <ul className={`space-y-2.5 text-[13px] text-[#8c9690] ${openSection === 'servicio' ? 'block' : 'hidden md:block'}`}>
              <li><a href="#" className="hover:text-white transition-colors">Recomendaciones de embalaje</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carga prohibida</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carga Sobredimensionada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Asistente WhatsApp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingresar un reclamo</a></li>
            </ul>
          </div>

          {/* Columna 5: Redes Sociales y Trabaja con nosotros */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-white mb-4">
              SÍGUENOS EN NUESTRAS REDES SOCIALES
            </h4>
            
            {/* Íconos de redes sociales */}
            <div className="flex items-center gap-4 text-white mb-6">
              {/* Facebook */}
              <a href="#" className="hover:text-[#1ED760] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-[#1ED760] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="hover:text-[#1ED760] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-[#1ED760] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:text-[#1ED760] transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>

            {/* Botón Trabaja con nosotros */}
            <button
              type="button"
              className="w-full bg-[#009D4E] hover:bg-[#008743] active:bg-[#007439] text-white py-3 px-6 rounded-lg font-bold text-sm transition-all duration-150 cursor-pointer shadow-sm text-center"
            >
              Trabaja con nosotros
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-xs text-[#8c9690] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Starken. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Términos y condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Políticas de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
