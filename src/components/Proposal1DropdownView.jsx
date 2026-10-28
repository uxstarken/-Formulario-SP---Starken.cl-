import React, { useState } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';
import { Check } from 'lucide-react';

export default function Proposal1DropdownView() {
  // 'benefits' | 'api'
  const [selectedOption, setSelectedOption] = useState('benefits');

  return (
    <div className="w-full max-w-[1040px] mx-auto font-nunito">
      {/* 1. BREADCRUMB ARRIBA DEL BANNER */}
      <div className="px-1 mb-2">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '#' },
            { label: 'Registro Somos Partner', active: true }
          ]}
        />
      </div>

      {/* 2. CARD UNIFICADO: BANNER SUPERIOR + FORMULARIO DE REGISTRO EN UN SOLO CONTORNO */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/90 overflow-hidden mb-10">
        {/* Cabecera: Banner con degradado morado #48185A y contenido dinámico */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#2D0B39] via-[#48185A] to-[#5C1E73]">

          {/* Contenido del Banner: Estructurado en cuadrícula fija para evitar saltos y dar espacio a la lista */}
          <div className="relative z-10 px-6 py-6 sm:px-9 sm:py-7 text-white grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[195px]">
            {/* Lado Izquierdo del Banner: Título + Subtítulo + Chips (en 2 filas para opción integraciones) */}
            <div className="md:col-span-7 space-y-3">
              <h1 className="font-din text-[24px] font-bold text-white tracking-normal leading-tight drop-shadow-sm">
                {selectedOption === 'benefits'
                  ? 'Obten hasta un 20% de descuento'
                  : 'Precios especiales por volumen'}
              </h1>

              <p className="font-nunito text-[14px] text-white/80 font-medium">
                {selectedOption === 'benefits' ? 'Categorias:' : 'Plataformas disponibles:'}
              </p>

              {/* Chips de Categorías o Plataformas (en 2 filas fijas para opción integraciones) */}
              {selectedOption === 'benefits' ? (
                <div className="flex flex-wrap items-center gap-2">
                  {['Shopify', 'Montaña', 'Cordillera'].map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-1.5 rounded-full border border-white/35 bg-white/15 backdrop-blur-xs text-white font-nunito text-[13px] font-semibold shadow-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {/* Fila 1 */}
                  <div className="flex flex-wrap items-center gap-2">
                    {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX'].map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-full border border-white/35 bg-white/15 backdrop-blur-xs text-white font-nunito text-[12.5px] font-semibold shadow-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  {/* Fila 2 */}
                  <div className="flex flex-wrap items-center gap-2">
                    {['Magento', 'PrestaShop', 'Jumpseller*'].map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-full border border-white/35 bg-white/15 backdrop-blur-xs text-white font-nunito text-[12.5px] font-semibold shadow-xs"
                      >
                        {p}
                      </span>
                    ))}
                    <span className="px-3.5 py-1 rounded-full border-2 border-[#F97316] bg-[#F97316] text-white font-nunito text-[12.5px] font-bold shadow-xs">
                      API
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Lado Derecho del Banner: Viñetas / Bullets movidas más a la izquierda con ancho estable */}
            <div className="md:col-span-5 md:border-l md:border-white/20 md:pl-8">
              <ul className="space-y-2.5 sm:space-y-3">
                {selectedOption === 'benefits' ? (
                  <>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Plan de difusión</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Descuentos</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Atencion preferencial en canales digitales</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Retiro a domicilio a $3.490</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Alianzas y beneficios</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Integración vía API</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Atención personalizada</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Retiros en tu tienda</span>
                    </li>
                    <li className="flex items-center gap-2.5 font-nunito text-[16px] text-white/95 font-medium drop-shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                      <span>Personaliza tu check out</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Cuerpo: Formulario oficial en 2 columnas con CTA naranjo #F97316 */}
        <div className="p-6 sm:p-10">
          {/* Header del formulario: Título a la izquierda y Selector de opciones destacado horizontalmente a la derecha */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
            {/* Título y bajada del Formulario */}
            <div>
              <h2 className="font-din text-[24px] font-bold text-[#48185A] leading-snug">
                Formulario de registro Somos Partner
              </h2>
              <p className="font-nunito text-[16px] text-gray-500 mt-0.5 font-normal">
                Completa la información requerida para dar de alta tu negocio en Starken.
              </p>
            </div>

            {/* Pestañas de Opciones destacadas horizontalmente a la altura del título */}
            <div className="flex-shrink-0 flex items-center gap-2 p-1.5 bg-[#FAF5FC] rounded-2xl border-2 border-[#48185A]/25 shadow-sm -translate-y-1.5 sm:-translate-y-2">
              {/* Opción 1: Registrarme */}
              <button
                type="button"
                onClick={() => setSelectedOption('benefits')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-nunito text-[13.5px] sm:text-[14.5px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 select-none ${
                  selectedOption === 'benefits'
                    ? 'bg-[#48185A] text-white shadow-md ring-2 ring-[#48185A]/20'
                    : 'bg-white hover:bg-white/90 text-[#48185A] border border-[#48185A]/20 hover:border-[#48185A]/40'
                }`}
              >
                {selectedOption === 'benefits' ? (
                  <span className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-[#48185A]/40 flex-shrink-0" />
                )}
                <span>Registrarme</span>
              </button>

              {/* Opción 2: Registrarme + Integraciones */}
              <button
                type="button"
                onClick={() => setSelectedOption('api')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-nunito text-[13.5px] sm:text-[14.5px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 select-none ${
                  selectedOption === 'api'
                    ? 'bg-[#48185A] text-white shadow-md ring-2 ring-[#48185A]/20'
                    : 'bg-white hover:bg-white/90 text-[#48185A] border border-[#48185A]/20 hover:border-[#48185A]/40'
                }`}
              >
                {selectedOption === 'api' ? (
                  <span className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-[#48185A]/40 flex-shrink-0" />
                )}
                <span>Registrarme + Integraciones</span>
              </button>
            </div>
          </div>
          <SoyStarkenForm optionType={selectedOption} />
        </div>
      </div>
    </div>
  );
}
