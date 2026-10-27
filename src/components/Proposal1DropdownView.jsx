import React, { useState } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';
import { ChevronDown, Zap, Code2 } from 'lucide-react';

export default function Proposal1DropdownView() {
  // 'benefits' | 'api'
  const [selectedOption, setSelectedOption] = useState('benefits');

  return (
    <div className="w-full max-w-[1040px] mx-auto font-nunito">
      {/* 1. BANNER SUPERIOR JUSTO DEBAJO DEL HEADER */}
      <div className="relative rounded-3xl overflow-hidden mb-5 shadow-lg border border-emerald-950/15">
        {/* Fotografía de entrega de caja con logo Starken debajo del degradado (más visible) */}
        <img
          src="/delivery-box.jpg"
          alt="Entrega de paquete Starken"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-55 filter saturate-125"
        />
        {/* Degradado verde Starken calibrado para mantener legibilidad y mostrar la fotografía */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003316]/90 via-[#005c2a]/84 to-[#009239]/78 z-1" />

        {/* Contenido del Banner: Logo circular con fondo naranja + Título DIN 30px + Bajada Nunito 16px */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-9 text-white flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Logo Soy Starken con fondo naranja */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src="/soy-starken-badge.png"
              alt="Logo Soy Starken"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl"
            />
          </div>

          {/* Textos del Banner Dinámicos */}
          <div className="flex-1 text-center md:text-left space-y-2.5">
            <h1 className="font-din text-[24px] sm:text-[30px] font-bold text-white tracking-normal leading-tight drop-shadow-sm">
              {selectedOption === 'benefits'
                ? '¡Únete hoy y lleva tu empresa más lejos!'
                : 'Conecta tu página web con Starken y agiliza tus procesos'}
            </h1>
            <p className="font-nunito text-[14px] sm:text-[16px] text-white/95 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
              Accede a un servicio rápido, confiable y con las mejores soluciones logísticas, todo mientras cumples con tus obligaciones.
            </p>

            {/* Botón Saber más secundario (contorno sin relleno, mismo tamaño px-8 py-3.5) */}
            {selectedOption === 'api' && (
              <div className="pt-2 animate-fade-in flex justify-center md:justify-start">
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#005c2a] active:bg-white/90 transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Saber más
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. BREADCRUMB BAJO EL BANNER */}
      <div className="px-1 mb-2">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '#' },
            { label: 'Registro Soy Starken', active: true }
          ]}
        />
      </div>

      {/* 3. SECCIÓN: SELECTOR DE OPCIÓN (30%) + CARD DE INFORMACIÓN (70%) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/90 shadow-sm mb-7">
        <div className="flex flex-col md:flex-row gap-5 items-stretch">
          {/* Lado 1: Selector de opción ocupando 30% */}
          <div className="w-full md:w-[32%] lg:w-[30%] flex flex-col justify-center flex-shrink-0">
            <label className="block font-nunito text-[16px] font-bold text-[#333333] mb-2 text-left">
              ¿Qué tipo de incorporación deseas?
            </label>
            <div className="relative">
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-3.5 py-3 bg-[#fcfcfc] border-2 border-[#009239] rounded-xl font-nunito text-[14px] font-bold text-[#1a1a1a] appearance-none pr-10 cursor-pointer outline-none focus:ring-3 focus:ring-[#009239]/20 transition-all shadow-xs"
              >
                <option value="benefits" className="font-nunito text-[14px]">Soy Starken solamente</option>
                <option value="api" className="font-nunito text-[14px]">Soy Starken más integraciones</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#009239]">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Lado 2: Card de información ocupando 70% */}
          <div
            className={`w-full md:w-[68%] lg:w-[70%] p-4 sm:p-5 rounded-xl border flex items-start gap-4 transition-all duration-200 ${
              selectedOption === 'benefits'
                ? 'bg-[#eafaf1] border-[#c2edd6] text-[#0f5132]'
                : 'bg-[#fff7ed] border-[#fed7aa] text-[#9a3412]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                selectedOption === 'benefits'
                  ? 'bg-[#009239] text-white shadow-xs'
                  : 'bg-[#F97316] text-white shadow-xs'
              }`}
            >
              {selectedOption === 'benefits' ? (
                <Zap className="w-5 h-5" />
              ) : (
                <Code2 className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 leading-relaxed">
              {selectedOption === 'benefits' ? (
                <>
                  <strong className="block font-din font-bold text-[#0f5132] mb-1 text-[16px]">
                    Modo Afiliación Directa (Soy Starken)
                  </strong>
                  <span className="font-nunito text-[#2b2e2c]/90 text-[16px] leading-relaxed">
                    Formulario simplificado. No requiere sitio web; activa descuentos inmediatos en toda la red de sucursales Starken y envíos online.
                  </span>
                </>
              ) : (
                <>
                  <strong className="block font-din font-bold text-[#9a3412] mb-1 text-[16px]">
                    Modo Integración API + Beneficios
                  </strong>
                  <span className="font-nunito text-[#2b2e2c]/90 text-[16px] leading-relaxed">
                    Para tiendas online con sitio web. Cotización automática y etiquetas en checkout. <strong>Requiere ingresar sitio web obligatorio</strong>.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FORMULARIO OFICIAL EN 2 COLUMNAS CON CTA NARANJO #F97316 */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="font-din text-[24px] font-bold text-[#009D4E] leading-snug">
            Formulario de registro soy starken
          </h2>
          <p className="font-nunito text-[16px] text-gray-500 mt-1 font-normal">
            Completa la información requerida para dar de alta tu negocio en Starken.
          </p>
        </div>
        <SoyStarkenForm optionType={selectedOption} />
      </div>
    </div>
  );
}
