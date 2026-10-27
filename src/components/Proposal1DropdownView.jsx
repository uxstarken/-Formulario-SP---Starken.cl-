import React, { useState } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';

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

      {/* 2. PESTAÑAS ESTILO CARPETA SOBRE EL BANNER (UBICADAS AL LADO SUPERIOR DERECHO) */}
      <div className="flex flex-wrap items-end justify-end gap-2.5 sm:gap-4 px-2 sm:px-6 relative z-20 -mb-[1px]">
        {/* Texto al lado izquierdo de las etiquetas */}
        <span className="font-nunito text-[14px] sm:text-[15px] font-bold text-[#48185A] self-center sm:self-end pb-2 sm:pb-2.5 mr-1 sm:mr-2">
          Selecciona tu tipo de registro
        </span>

        {/* Pestañas estilo carpeta */}
        <div className="flex items-end gap-1.5 sm:gap-2">
          {/* Pestaña 1: Registrarme */}
          <button
            type="button"
            onClick={() => setSelectedOption('benefits')}
            className={`relative overflow-hidden px-5 sm:px-7 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl font-nunito text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
              selectedOption === 'benefits'
                ? 'text-white font-bold shadow-md z-20 pt-3 sm:pt-3.5 pb-2.5 sm:pb-3 border-t-2 border-x-2 border-[#48185A]'
                : 'bg-[#FAF5FC] hover:bg-[#F3E8F7] text-[#48185A] font-bold border-t-2 border-x-2 border-[#48185A]/30 z-10'
            }`}
          >
            {/* Si está seleccionada: mismo fondo (imagen dinámica + degradado morado) que el banner */}
            {selectedOption === 'benefits' && (
              <>
                <img
                  src="/delivery-box.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2D0B39]/95 via-[#48185A]/92 to-[#5C1E73]/88 pointer-events-none" />
              </>
            )}
            <span className="relative z-10">Registrarme</span>
          </button>

          {/* Pestaña 2: Registrarme + Integraciones */}
          <button
            type="button"
            onClick={() => setSelectedOption('api')}
            className={`relative overflow-hidden px-5 sm:px-7 py-2.5 sm:py-3 rounded-t-xl sm:rounded-t-2xl font-nunito text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
              selectedOption === 'api'
                ? 'text-white font-bold shadow-md z-20 pt-3 sm:pt-3.5 pb-2.5 sm:pb-3 border-t-2 border-x-2 border-[#48185A]'
                : 'bg-[#FAF5FC] hover:bg-[#F3E8F7] text-[#48185A] font-bold border-t-2 border-x-2 border-[#48185A]/30 z-10'
            }`}
          >
            {/* Si está seleccionada: mismo fondo (imagen dinámica + degradado morado) que el banner */}
            {selectedOption === 'api' && (
              <>
                <img
                  src="/ecommerce-sales.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter saturate-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2D0B39]/95 via-[#48185A]/92 to-[#5C1E73]/88 pointer-events-none" />
              </>
            )}
            <span className="relative z-10">Registrarme + Integraciones</span>
          </button>
        </div>
      </div>

      {/* 3. BANNER SUPERIOR CON DEGRADADO MORADO #48185A Y CONTENIDO ACTUALIZADO */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 shadow-lg border border-purple-950/20">
        {/* Fotografía de fondo dinámica */}
        <img
          src={selectedOption === 'benefits' ? '/delivery-box.jpg' : '/ecommerce-sales.jpg'}
          alt={selectedOption === 'benefits' ? 'Entrega de paquete Starken' : 'Ventas por internet ecommerce'}
          key={selectedOption}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 filter saturate-110"
        />
        {/* Degradado morado #48185A sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D0B39]/94 via-[#48185A]/90 to-[#5C1E73]/85 z-1" />

        {/* Contenido del Banner: Información actualizada como en Propuesta 2 */}
        <div className="relative z-10 px-6 py-7 sm:px-9 sm:py-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          {/* Lado Izquierdo del Banner: Título + Subtítulo + Chips */}
          <div className="flex-1 space-y-3">
            <h1 className="font-din text-[24px] sm:text-[28px] font-bold text-white tracking-normal leading-tight drop-shadow-sm">
              {selectedOption === 'benefits'
                ? 'Obten hasta un 20% de descuento'
                : 'Precios especiales por volumen'}
            </h1>

            <p className="font-nunito text-[14px] text-white/80 font-medium">
              {selectedOption === 'benefits' ? 'Categorias:' : 'Plataformas disponibles:'}
            </p>

            {/* Chips de Categorías o Plataformas */}
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
              <div className="flex flex-wrap items-center gap-2">
                {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX', 'Magento', 'PrestaShop', 'Jumpseller*'].map((p) => (
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
            )}
          </div>

          {/* Lado Derecho del Banner: Viñetas / Bullets con viñetas naranja #F97316 */}
          <div className="flex-shrink-0 md:border-l md:border-white/20 md:pl-8">
            <ul className="space-y-2.5 sm:space-y-3">
              {selectedOption === 'benefits' ? (
                <>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Plan de difusión</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Descuentos</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Atencion preferencial en canales digitales</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Retiro a domicilio a $3.490</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Alianzas y beneficios</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Integración vía API</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Atención personalizada</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Retiros en tu tienda</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-nunito text-[14px] sm:text-[15px] text-white/95 font-medium drop-shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    <span>Personaliza tu check out</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. FORMULARIO OFICIAL EN 2 COLUMNAS CON CTA NARANJO #F97316 */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h2 className="font-din text-[24px] font-bold text-[#48185A] leading-snug">
            Formulario de registro Somos Partner
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
