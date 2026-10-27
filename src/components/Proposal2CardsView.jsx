import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import SoyStarkenForm from './SoyStarkenForm';

export default function Proposal2CardsView() {
  // 'benefits' | 'api'
  const [selectedOption, setSelectedOption] = useState('benefits');
  const isApi = selectedOption === 'api';

  return (
    <div className="w-full max-w-[1100px] mx-auto font-nunito">
      {/* Breadcrumb Oficial */}
      <Breadcrumb
        items={[
          { label: 'Inicio', href: '#' },
          { label: 'Registro Soy Starken', active: true }
        ]}
      />

      {/* SECCIÓN SUPERIOR: TÍTULO Y BAJADA */}
      <div className="mb-8">
        <h1 className="font-din text-[30px] font-bold text-[#1a1a1a] tracking-tight leading-tight text-left">
          Regístrate y sé parte de Soy Starken
        </h1>
        <p className="font-nunito text-[16px] text-[#595959] text-left mt-1.5 font-normal leading-relaxed">
          Elige la opción que mejor se adapte a tu modelo de negocio y comienza a disfrutar de tarifas preferenciales.
        </p>
      </div>

      {/* CONTENEDOR SPLIT: 46% PANEL IZQUIERDO CON DEGRADADO MORADO #48185A / 54% FORMULARIO */}
      <div className="bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px] mb-6 sm:mb-10">
        {/* PANEL IZQUIERDO: IMAGEN DIFUMINADA CON DEGRADADO MORADO #48185A + SELECTOR + CONTENIDO DINÁMICO */}
        <div className="w-full lg:w-[46%] flex-shrink-0 relative p-6 sm:p-8 lg:p-9 text-white flex flex-col justify-between overflow-hidden min-h-[500px] lg:min-h-[640px]">
          {/* Imagen de fondo difuminada dinámica según la opción seleccionada */}
          <img
            src={!isApi ? '/delivery-box.jpg' : '/ecommerce-sales.jpg'}
            alt={!isApi ? 'Persona recibiendo paquete Starken' : 'Persona realizando ventas por internet'}
            key={selectedOption}
            className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40 filter saturate-110"
          />

          {/* Degradado Morado #48185A */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D0B39]/94 via-[#48185A]/90 to-[#5C1E73]/85 z-1" />

          {/* Contenido en primer plano sobre el degradado morado */}
          <div className="relative z-10 flex flex-col justify-start h-full space-y-6">
            {/* 1. SELECTOR DE OPCIÓN DE REGISTRO EN EL LADO IZQUIERDO */}
            <div>
              <label className="block text-xs sm:text-[13px] font-bold text-white/90 mb-2.5 text-left">
                Selecciona opción de registro
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Opción 1: Solo Beneficios Soy Starken */}
                <button
                  type="button"
                  onClick={() => setSelectedOption('benefits')}
                  className={`py-3 px-3.5 rounded-xl font-bold text-xs sm:text-[13px] transition-all duration-200 border-2 cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                    !isApi
                      ? 'border-[#F97316] bg-white text-[#48185A] shadow-md ring-2 ring-[#F97316]/30'
                      : 'border-white/30 bg-white/10 hover:bg-white/20 text-white hover:border-white/50 backdrop-blur-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        !isApi ? 'bg-[#F97316]' : 'bg-white/40'
                      }`}
                    />
                    <span className="font-bold text-left leading-tight">
                      Solo Beneficios Soy Starken
                    </span>
                  </div>
                  {!isApi && (
                    <span className="w-4 h-4 rounded-full bg-[#F97316] text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>

                {/* Opción 2: Beneficios + Integración API */}
                <button
                  type="button"
                  onClick={() => setSelectedOption('api')}
                  className={`py-3 px-3.5 rounded-xl font-bold text-xs sm:text-[13px] transition-all duration-200 border-2 cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                    isApi
                      ? 'border-[#F97316] bg-white text-[#48185A] shadow-md ring-2 ring-[#F97316]/30'
                      : 'border-white/30 bg-white/10 hover:bg-white/20 text-white hover:border-white/50 backdrop-blur-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isApi ? 'bg-[#F97316]' : 'bg-white/40'
                      }`}
                    />
                    <span className="font-bold text-left leading-tight">
                      Beneficios + Integración API
                    </span>
                  </div>
                  {isApi && (
                    <span className="w-4 h-4 rounded-full bg-[#F97316] text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* 2. INFORMACIÓN CORRIDA HACIA ABAJO BAJO EL SELECTOR */}
            <div className="pt-1 flex flex-col space-y-4">
              {/* Título dinámico */}
              <h2 className="font-din text-[23px] sm:text-[26px] font-bold text-white tracking-normal leading-tight drop-shadow-sm">
                {!isApi ? 'Obten hasta un 20% de descuento' : 'Precios especiales por volumen'}
              </h2>

              {/* Subtítulo */}
              <p className="font-nunito text-[14px] text-white/80 font-medium">
                {!isApi ? 'Categorias' : 'Plataformas disponibles:'}
              </p>

              {/* Tags / Pills de Categorías o Plataformas */}
              {!isApi ? (
                <div className="flex flex-wrap items-center gap-2">
                  {['Shopify', 'Montaña', 'Cordillera'].map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-1.5 rounded-full border border-white/35 bg-white/15 backdrop-blur-xs text-white font-nunito text-[13.5px] font-semibold shadow-xs"
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
                    <span className="px-3.5 py-1 rounded-full border-2 border-[#F97316] bg-[#F97316] text-white font-nunito text-[13px] font-bold shadow-xs">
                      API
                    </span>
                  </div>
                </div>
              )}

              {/* Viñetas / Bullets */}
              <div className="pt-2">
                <ul className="space-y-3">
                  {!isApi ? (
                    <>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Plan de difusión</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Descuentos</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Atencion preferencial en canales digitales</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Retiro a domicilio a $3.490</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Alianzas y beneficios</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Integración vía API</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Atención personalizada</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Retiros en tu tienda</span>
                      </li>
                      <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-white/95 font-medium leading-relaxed drop-shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                        <span>Personaliza tu check out</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: FORMULARIO SOMOS PARTNER */}
        <div className="w-full lg:w-[54%] flex-grow p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white relative min-h-[460px] lg:min-h-[640px]">
          <div>
            {/* TÍTULO Y BAJADA DEL FORMULARIO SOMOS PARTNER */}
            <div className="border-b border-gray-100 pb-3 mb-4">
              <h3 className="font-din text-[24px] font-bold text-[#009D4E] leading-snug">
                Formulario de registro Somos Partner
              </h3>
              <p className="font-nunito text-[16px] text-gray-500 mt-1 min-h-[24px]">
                {!isApi
                  ? 'Ingresa tus datos y los de tu negocio para activar tus beneficios.'
                  : 'Completa los datos de tu empresa e integración de ecommerce.'}
              </p>
            </div>

            {/* Formulario Dinámico según la Opción Seleccionada */}
            <SoyStarkenForm optionType={selectedOption} />
          </div>
        </div>
      </div>
    </div>
  );
}
