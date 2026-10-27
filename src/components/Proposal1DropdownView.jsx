import React, { useState } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';
import { ChevronDown, Zap, Code2 } from 'lucide-react';

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

      {/* 2. BANNER SUPERIOR CON DEGRADADO MORADO #48185A Y CONTENIDO ACTUALIZADO */}
      <div className="relative rounded-3xl overflow-hidden mb-6 shadow-lg border border-purple-950/20">
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
