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

      {/* CONTENEDOR DE CARDS: IZQUIERDA INFO DINÁMICA (42%) / DERECHA FORMULARIO (58%) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch mb-6 sm:mb-10 pt-5">
        {/* PANEL IZQUIERDO: INFORMACIÓN SEGÚN LA OPCIÓN SELECCIONADA */}
        <div className="w-full lg:w-[42%] bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-9 pt-10 sm:pt-11 relative flex flex-col justify-start">
          {/* Badge morado en el tope */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-[#3C1053] text-white px-7 sm:px-9 py-2.5 rounded-2xl font-din text-[17px] sm:text-[18px] font-bold shadow-md tracking-wide whitespace-nowrap">
              {!isApi ? 'Unirme al programa' : 'Conecta tu pagina web'}
            </div>
          </div>

          {/* Título de la opción */}
          <h2 className="font-din text-[23px] sm:text-[25px] lg:text-[27px] font-bold text-[#3C1053] text-center leading-tight mt-1 mb-2">
            {!isApi ? 'Obten hasta un 20% de descuento' : 'Precios especiales por volumen'}
          </h2>

          {/* Subtítulo */}
          <p className="font-nunito text-[14px] sm:text-[15px] text-[#666666] text-center mb-5 font-normal">
            {!isApi ? 'Categorias' : 'Plataformas disponibles:'}
          </p>

          {/* Tags / Pills de Categorías o Plataformas */}
          {!isApi ? (
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-7">
              {['Shopify', 'Montaña', 'Cordillera'].map((cat) => (
                <span
                  key={cat}
                  className="px-5 py-1.5 rounded-full border border-[#C9AEE2] text-[#3C1053] font-nunito text-[14px] font-semibold bg-white shadow-xs"
                >
                  {cat}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 mb-7">
              {/* Fila 1 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX'].map((p) => (
                  <span
                    key={p}
                    className="px-3.5 py-1 rounded-full border border-[#C9AEE2] text-[#3C1053] font-nunito text-[13px] sm:text-[13.5px] font-semibold bg-white shadow-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
              {/* Fila 2 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Magento', 'PrestaShop', 'Jumpseller*'].map((p) => (
                  <span
                    key={p}
                    className="px-3.5 py-1 rounded-full border border-[#C9AEE2] text-[#3C1053] font-nunito text-[13px] sm:text-[13.5px] font-semibold bg-white shadow-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
              {/* Fila 3: API destacada en verde */}
              <div className="flex justify-center mt-1">
                <span className="px-6 py-1 rounded-full border-2 border-[#009D4E] text-[#009D4E] font-nunito text-[14px] font-bold bg-[#eafaf1]/40 shadow-xs">
                  API
                </span>
              </div>
            </div>
          )}

          {/* Lista de beneficios / características */}
          <div className="w-full max-w-md mx-auto px-2 sm:px-4">
            <ul className="space-y-3 sm:space-y-3.5">
              {!isApi ? (
                <>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Plan de difusión</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Descuentos</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Atencion preferencial en canales digitales</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Retiro a domicilio a $3.490</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Alianzas y beneficios</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Integración vía API</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Atención personalizada</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Retiros en tu tienda</span>
                  </li>
                  <li className="flex items-center gap-3 font-nunito text-[15px] sm:text-[16px] text-[#262626] font-medium leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#262626] flex-shrink-0" />
                    <span>Personaliza tu check out</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* PANEL DERECHO: FORMULARIO SOMOS PARTNER CON EL SELECTOR EN EL TOPE */}
        <div className="w-full lg:w-[58%] bg-white rounded-3xl shadow-xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          <div>
            {/* SELECTOR DE OPCIÓN DE REGISTRO DENTRO DE LA CARD DE FORMULARIO */}
            <div className="mb-6">
              <label className="block font-nunito text-[16px] font-bold text-[#333333] mb-2.5 text-left">
                Selecciona opción de registro
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Opción 1: Solo Beneficios Soy Starken */}
                <button
                  type="button"
                  onClick={() => setSelectedOption('benefits')}
                  className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 border-2 cursor-pointer flex items-center justify-between gap-3 shadow-xs ${
                    selectedOption === 'benefits'
                      ? 'border-[#009239] bg-white text-[#009239] shadow-sm ring-2 ring-[#009239]/15'
                      : 'border-gray-200 bg-gray-50/80 hover:bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        selectedOption === 'benefits' ? 'bg-[#009239]' : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-[13.5px] sm:text-[14px] font-bold whitespace-nowrap">
                      Solo Beneficios Soy Starken
                    </span>
                  </div>
                  {selectedOption === 'benefits' && (
                    <span className="w-4 h-4 rounded-full bg-[#009239] text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>

                {/* Opción 2: Beneficios + Integración API */}
                <button
                  type="button"
                  onClick={() => setSelectedOption('api')}
                  className={`py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 border-2 cursor-pointer flex items-center justify-between gap-3 shadow-xs ${
                    selectedOption === 'api'
                      ? 'border-[#009239] bg-white text-[#009239] shadow-sm ring-2 ring-[#009239]/15'
                      : 'border-gray-200 bg-gray-50/80 hover:bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        selectedOption === 'api' ? 'bg-[#009239]' : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-[13.5px] sm:text-[14px] font-bold whitespace-nowrap">
                      Beneficios + Integración API
                    </span>
                  </div>
                  {selectedOption === 'api' && (
                    <span className="w-4 h-4 rounded-full bg-[#009239] text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              </div>
            </div>

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
