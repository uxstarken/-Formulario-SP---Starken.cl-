import React, { useState } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';

export default function Proposal1DropdownView() {
  // 'benefits' | 'api'
  const [selectedOption, setSelectedOption] = useState('benefits');

  return (
    <div className="w-full max-w-[1040px] mx-auto font-nunito">
      {/* 1. BREADCRUMB ARRIBA DEL BANNER */}
      <div className="px-1 mb-1">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '#' },
            { label: 'Registro Somos Partner', active: true }
          ]}
        />
      </div>

      {/* 2. PESTAÑAS ESTILO CARPETA SOBRE EL BANNER (UBICADAS AL LADO SUPERIOR DERECHO) */}
      <div className="flex items-end justify-end gap-1.5 sm:gap-2 px-2 sm:px-6 relative z-20 -mb-[1px]">
        {/* Pestaña 1: Registrarme */}
        <button
          type="button"
          onClick={() => setSelectedOption('benefits')}
          className={`relative overflow-hidden px-5 sm:px-7 py-2 sm:py-2.5 rounded-t-xl sm:rounded-t-2xl font-nunito text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer flex items-center select-none ${
            selectedOption === 'benefits'
              ? 'bg-gradient-to-r from-[#2D0B39] via-[#48185A] to-[#5C1E73] text-white font-bold shadow-md z-20 pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 border-t-2 border-x-2 border-[#48185A]'
              : 'bg-[#FAF5FC] hover:bg-[#F3E8F7] text-[#48185A] font-bold border-t-2 border-x-2 border-[#48185A]/30 z-10'
          }`}
        >
          <span className="relative z-10">Registrarme</span>
        </button>

        {/* Pestaña 2: Registrarme + Integraciones */}
        <button
          type="button"
          onClick={() => setSelectedOption('api')}
          className={`relative overflow-hidden px-5 sm:px-7 py-2 sm:py-2.5 rounded-t-xl sm:rounded-t-2xl font-nunito text-[14px] sm:text-[15px] transition-all duration-200 cursor-pointer flex items-center select-none ${
            selectedOption === 'api'
              ? 'bg-gradient-to-r from-[#2D0B39] via-[#48185A] to-[#5C1E73] text-white font-bold shadow-md z-20 pt-2.5 sm:pt-3 pb-2 sm:pb-2.5 border-t-2 border-x-2 border-[#48185A]'
              : 'bg-[#FAF5FC] hover:bg-[#F3E8F7] text-[#48185A] font-bold border-t-2 border-x-2 border-[#48185A]/30 z-10'
          }`}
        >
          <span className="relative z-10">Registrarme + Integraciones</span>
        </button>
      </div>

      {/* 3. CARD UNIFICADO: BANNER SUPERIOR + FORMULARIO DE REGISTRO EN UN SOLO CONTORNO */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/90 overflow-hidden mb-10">
        {/* Cabecera: Banner con degradado morado #48185A y contenido dinámico */}
        <div className="relative overflow-hidden">
          {/* Fotografía de fondo dinámica */}
          <img
            src={selectedOption === 'benefits' ? '/delivery-box.jpg' : '/ecommerce-sales.jpg'}
            alt={selectedOption === 'benefits' ? 'Entrega de paquete Starken' : 'Ventas por internet ecommerce'}
            key={selectedOption}
            className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 filter saturate-110"
          />
          {/* Degradado morado #48185A sobre la imagen */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D0B39]/94 via-[#48185A]/90 to-[#5C1E73]/85 z-1" />

          {/* Contenido del Banner: Estructurado en cuadrícula fija para evitar saltos y dar espacio a la lista */}
          <div className="relative z-10 px-6 py-6 sm:px-9 sm:py-7 text-white grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[195px]">
            {/* Lado Izquierdo del Banner: Título + Subtítulo + Chips (en 2 filas para opción integraciones) */}
            <div className="md:col-span-7 space-y-3">
              <h1 className="font-din text-[24px] sm:text-[28px] font-bold text-white tracking-normal leading-tight drop-shadow-sm">
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

        {/* Cuerpo: Formulario oficial en 2 columnas con CTA naranjo #F97316 */}
        <div className="p-6 sm:p-10">
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
    </div>
  );
}
