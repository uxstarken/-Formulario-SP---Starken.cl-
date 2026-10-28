import React, { useState, useEffect, useRef } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Proposal3InteractiveCards() {
  // null = ambas tarjetas en modo comparativo inicial
  // 'benefits' = tarjeta 1 seleccionada (expandida con formulario in-place)
  // 'api' = tarjeta 2 seleccionada (expandida con formulario in-place)
  const [selectedCard, setSelectedCard] = useState(null);
  const scrollTargetRef = useRef(null);
  const carouselRef = useRef(null);
  const mobileFormRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Manejar deslizamiento del carrusel en mobile para sincronizar los dots
  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, offsetWidth } = carouselRef.current;
      const slide = Math.round(scrollLeft / (offsetWidth * 0.75));
      setActiveSlide(Math.min(1, Math.max(0, slide)));
    }
  };

  const scrollToSlide = (index) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
      setActiveSlide(index);
    }
  };

  // Auto-centrar suavemente en el formulario / tarjetas cuando se selecciona una opción
  useEffect(() => {
    if (selectedCard) {
      const isMobile = window.innerWidth < 1024;
      const timer = setTimeout(() => {
        if (isMobile && mobileFormRef.current) {
          const navbarHeight = 85; // Altura sticky navbar mobile
          const elementTop = mobileFormRef.current.getBoundingClientRect().top;
          const targetY = elementTop + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        } else if (!isMobile && scrollTargetRef.current) {
          const navbarHeight = 125; // Altura sticky navbar desktop
          const elementTop = scrollTargetRef.current.getBoundingClientRect().top;
          const targetY = elementTop + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }
      }, 90);

      return () => clearTimeout(timer);
    }
  }, [selectedCard]);

  return (
    <div className="w-full font-nunito pb-12">
      {/* 1. BREADCRUMB */}
      <div className="mb-1 sm:mb-2">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '#' },
            { label: 'Registro Somos Partner', active: true }
          ]}
        />
      </div>

      {/* 2. ENCABEZADO PRINCIPAL CENTRADO (SEGÚN REFERENCIA) */}
      <div className="text-center max-w-[840px] mx-auto mb-8 sm:mb-9">
        <h1 className="font-din text-[28px] font-bold text-[#48185A] tracking-normal leading-tight mb-2">
          Unete al programa de pymes mas grande de Chile
        </h1>
        <p className="font-nunito text-[16px] font-semibold text-[#303030] tracking-wide mb-2">
          Y comienza a enviar tus pedidos con Starken
        </p>
        <p className="font-nunito text-[16px] font-bold text-[#009239]">
          Conoce nuestras opciones
        </p>

        {/* Botón para volver a ver ambas opciones en caso de que alguna esté seleccionada */}
        {selectedCard && (
          <div ref={scrollTargetRef} className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#48185A] bg-[#FAF5FC] hover:bg-[#F3E8F7] border border-[#48185A]/25 transition-all shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver ambas opciones en tamaño inicial</span>
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. VERSIÓN MOBILE: CARRUSEL HORIZONTAL TIPO PEEK + FORMULARIO ABAJO */}
      {/* ============================================================== */}
      <div className="block lg:hidden mb-8">
        {/* Contenedor Carrusel Horizontal con Efecto Peek (asomando la otra tarjeta) */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto gap-3.5 snap-x snap-mandatory pt-8 pb-3 px-4 -mx-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Tarjeta 1 Mobile: Unirme al programa */}
          <div
            onClick={() => {
              setSelectedCard('benefits');
              scrollToSlide(0);
            }}
            className={`w-[85vw] max-w-[340px] flex-shrink-0 snap-center bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col relative cursor-pointer ${
              selectedCard === 'benefits'
                ? 'border-2 border-[#48185A] shadow-xl ring-2 ring-[#48185A]/15'
                : 'border-gray-200/90 shadow-md hover:border-[#48185A]/40'
            }`}
          >
            {/* Badge superior flotante */}
            <div className="flex justify-center -mt-10 mb-3">
              <span className="px-5 py-1.5 rounded-xl bg-[#48185A] text-white font-nunito font-bold text-[13px] shadow-md tracking-wide select-none">
                Unirme al programa
              </span>
            </div>

            {/* Título de la tarjeta */}
            <h2 className="font-din text-[22px] font-bold text-[#2b2e2c] text-center mb-1 leading-snug">
              Obten hasta un 20% de descuento
            </h2>

            {/* Subtítulo Categorías */}
            <p className="font-nunito text-[13.5px] text-gray-500 font-medium text-center mb-2.5">
              Categorias
            </p>

            {/* Chips de Categorías */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                <span
                  key={cat}
                  style={{ fontSize: '12px' }}
                  className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs text-badge-12 font-semibold shadow-2xs"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Lista de Viñetas Punteadas */}
            <ul className="space-y-2.5 mb-5 flex-1">
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Plan de difusión</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Descuentos</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Atencion preferencial en canales digitales</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Retiro a domicilio a $3.490</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Alianzas y beneficios</span>
              </li>
            </ul>

            {/* Botón */}
            <div className="pt-2 mt-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard('benefits');
                  scrollToSlide(0);
                }}
                className={`w-full py-3 px-5 rounded-xl font-bold text-[14.5px] shadow-md transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 ${
                  selectedCard === 'benefits'
                    ? 'bg-[#009239] text-white shadow-[#009239]/20'
                    : 'bg-[#48185A] hover:bg-[#381146] text-white'
                }`}
              >
                {selectedCard === 'benefits' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Opción Seleccionada</span>
                  </>
                ) : (
                  <span>Crea tu cuenta</span>
                )}
              </button>
            </div>
          </div>

          {/* Tarjeta 2 Mobile: Conectar mi pagina web */}
          <div
            onClick={() => {
              setSelectedCard('api');
              scrollToSlide(1);
            }}
            className={`w-[85vw] max-w-[340px] flex-shrink-0 snap-center bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col relative cursor-pointer ${
              selectedCard === 'api'
                ? 'border-2 border-[#48185A] shadow-xl ring-2 ring-[#48185A]/15'
                : 'border-gray-200/90 shadow-md hover:border-[#48185A]/40'
            }`}
          >
            {/* Badge superior flotante */}
            <div className="flex justify-center -mt-10 mb-3">
              <span className="px-5 py-1.5 rounded-xl bg-[#48185A] text-white font-nunito font-bold text-[13px] shadow-md tracking-wide select-none">
                Conectar mi pagina web
              </span>
            </div>

            {/* Título de la tarjeta */}
            <h2 className="font-din text-[22px] font-bold text-[#2b2e2c] text-center mb-1 leading-snug">
              Precios especiales por volumen
            </h2>

            {/* Subtítulo Plataformas disponibles */}
            <p className="font-nunito text-[13.5px] text-gray-500 font-medium text-center mb-2.5">
              Plataformas disponibles:
            </p>

            {/* Chips de Plataformas */}
            <div className="flex flex-col items-center gap-1.5 mb-5">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX'].map((p) => (
                  <span
                    key={p}
                    style={{ fontSize: '12px' }}
                    className="px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs text-badge-12 font-semibold shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {['Magento', 'PrestaShop', 'Jumpseller*'].map((p) => (
                  <span
                    key={p}
                    style={{ fontSize: '12px' }}
                    className="px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs text-badge-12 font-semibold shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Lista de Viñetas Punteadas */}
            <ul className="space-y-2.5 mb-5 flex-1">
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Integración vía API</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Atención personalizada</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Retiros en tu tienda</span>
              </li>
              <li className="flex items-center gap-2.5 font-nunito text-sm text-bullet-14 text-[#2b2e2c] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                <span>Personaliza tu check out</span>
              </li>
            </ul>

            {/* Botón */}
            <div className="pt-2 mt-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard('api');
                  scrollToSlide(1);
                }}
                className={`w-full py-3 px-5 rounded-xl font-bold text-[14.5px] shadow-md transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 ${
                  selectedCard === 'api'
                    ? 'bg-[#009239] text-white shadow-[#009239]/20'
                    : 'bg-[#48185A] hover:bg-[#381146] text-white'
                }`}
              >
                {selectedCard === 'api' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Opción Seleccionada</span>
                  </>
                ) : (
                  <span>Escribe a un ejecutivo</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Indicadores de paginación (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-2 mb-1">
          <button
            type="button"
            onClick={() => scrollToSlide(0)}
            className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeSlide === 0 ? 'w-7 bg-[#48185A]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label="Ver opción 1: Unirme al programa"
          />
          <button
            type="button"
            onClick={() => scrollToSlide(1)}
            className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeSlide === 1 ? 'w-7 bg-[#48185A]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label="Ver opción 2: Conectar mi pagina web"
          />
        </div>

        {/* Formulario móvil desplegado abajo al seleccionar una opción */}
        {selectedCard && (
          <div ref={mobileFormRef} className="mt-6 animate-fadeIn scroll-mt-24">
            <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#48185A] shadow-xl ring-2 ring-[#48185A]/10">
              <div className="mb-6 pb-3.5 border-b border-gray-100 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-din text-[22px] font-bold text-[#48185A] leading-snug">
                    {selectedCard === 'benefits'
                      ? 'Formulario de registro Somos Partner'
                      : 'Formulario de integración ecommerce'}
                  </h3>
                  <p className="font-nunito text-[14px] text-gray-500 mt-1">
                    {selectedCard === 'benefits'
                      ? 'Completa la información requerida para dar de alta tu negocio en Starken.'
                      : 'Completa los datos de tu empresa y plataforma web.'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#009239] bg-[#eafaf1] px-2.5 py-1 rounded-full flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Activa</span>
                </div>
              </div>

              <SoyStarkenForm optionType={selectedCard} />
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. VERSIÓN DESKTOP: TARJETAS COMPARATIVAS INTERACTIVAS */}
      {/* ============================================================== */}
      <div className="hidden lg:flex lg:flex-row gap-8 lg:gap-7 items-start justify-center transition-all duration-300 ease-in-out">
        {/* ============================================================== */}
        {/* TARJETA 1: REGISTRARME / UNIRME AL PROGRAMA */}
        {/* ============================================================== */}
        <div
          className={`w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border transition-all duration-300 ease-in-out flex flex-col relative ${
            selectedCard === 'benefits'
              ? 'lg:w-[62%] border-2 border-[#48185A] shadow-xl ring-4 ring-[#48185A]/10'
              : selectedCard === 'api'
              ? 'lg:w-[38%] border-gray-200/90 shadow-md opacity-95 hover:opacity-100 hover:border-[#48185A]/40 cursor-pointer'
              : 'lg:w-[50%] border-gray-200/90 shadow-lg hover:shadow-xl'
          }`}
          onClick={() => {
            if (selectedCard === 'api') {
              setSelectedCard('benefits');
            }
          }}
        >
          {/* Badge superior flotante */}
          <div className="flex justify-center -mt-10 sm:-mt-11 mb-4">
            <span className="px-6 py-2 rounded-xl bg-[#48185A] text-white font-nunito font-bold text-[14px] shadow-md tracking-wide select-none">
              Unirme al programa
            </span>
          </div>

          {/* CASO A: SI ESTÁ SELECCIONADA -> FORMULARIO ARRIBA Y RESTO DE DETALLES ABAJO */}
          {selectedCard === 'benefits' ? (
            <div className="w-full animate-fadeIn">
              {/* 1. FORMULARIO ARRIBA */}
              <div className="mb-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-din text-[24px] font-bold text-[#48185A]">
                      Formulario de registro Somos Partner
                    </h3>
                    <p className="font-nunito text-[16px] text-gray-500 mt-1">
                      Completa la información requerida para dar de alta tu negocio en Starken.
                    </p>
                  </div>
                  <div className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-[#009239] bg-[#eafaf1] px-3 py-1 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Opción Activa</span>
                  </div>
                </div>
                <SoyStarkenForm optionType="benefits" />
              </div>

              {/* 2. RESTO DE DETALLES ABAJO: EN LA MISMA LÍNEA HORIZONTAL */}
              <div className="pt-7 mt-2 border-t border-gray-200/80">
                <div className="bg-[#FAF7FC]/90 rounded-2xl p-6 sm:p-7 border border-[#48185A]/10 shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Sección 1 (Izquierda): Título, Subtítulo y Categorías */}
                    <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4 className="font-din text-[22px] sm:text-[24px] font-bold text-[#2b2e2c] mb-1.5 leading-snug">
                        Obten hasta un 20% de descuento
                      </h4>
                      <p className="font-nunito text-[14px] text-gray-500 font-medium mb-3">
                        Categorias
                      </p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                          <span
                            key={cat}
                            className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-[13px] font-semibold shadow-2xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sección 2 (Derecha): Viñetas en la misma línea horizontal */}
                    <div className="md:col-span-6 md:border-l md:border-[#48185A]/15 md:pl-6 lg:pl-8">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Plan de difusión</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Descuentos</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Atencion preferencial en canales digitales</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Retiro a domicilio a $3.490</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Alianzas y beneficios</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* CASO B: SI NO ESTÁ SELECCIONADA -> MUESTRA DETALLES Y BOTÓN DE SELECCIÓN */
            <>
              {/* Título de la tarjeta */}
              <h2 className="font-din text-[24px] font-bold text-[#2b2e2c] text-center mb-1 leading-snug">
                Obten hasta un 20% de descuento
              </h2>

              {/* Subtítulo Categorías */}
              <p className="font-nunito text-[14px] text-gray-500 font-medium text-center mb-2.5">
                Categorias
              </p>

              {/* Chips de Categorías */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-[13px] font-semibold shadow-2xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Lista de Viñetas Punteadas (Nunito 16px) */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Plan de difusión</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Descuentos</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Atencion preferencial en canales digitales</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Retiro a domicilio a $3.490</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Alianzas y beneficios</span>
                </li>
              </ul>

              <div className="pt-4 mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard('benefits');
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
                >
                  Crea tu cuenta
                </button>
              </div>
            </>
          )}
        </div>

        {/* ============================================================== */}
        {/* TARJETA 2: REGISTRARME + INTEGRACIONES / CONECTA TU PAGINA WEB */}
        {/* ============================================================== */}
        <div
          className={`w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border transition-all duration-300 ease-in-out flex flex-col relative ${
            selectedCard === 'api'
              ? 'lg:w-[62%] border-2 border-[#48185A] shadow-xl ring-4 ring-[#48185A]/10'
              : selectedCard === 'benefits'
              ? 'lg:w-[38%] border-gray-200/90 shadow-md opacity-95 hover:opacity-100 hover:border-[#48185A]/40 cursor-pointer'
              : 'lg:w-[50%] border-gray-200/90 shadow-lg hover:shadow-xl'
          }`}
          onClick={() => {
            if (selectedCard === 'benefits') {
              setSelectedCard('api');
            }
          }}
        >
          {/* Badge superior flotante */}
          <div className="flex justify-center -mt-10 sm:-mt-11 mb-4">
            <span className="px-6 py-2 rounded-xl bg-[#48185A] text-white font-nunito font-bold text-[14px] shadow-md tracking-wide select-none">
              Conectar mi pagina web
            </span>
          </div>

          {/* CASO A: SI ESTÁ SELECCIONADA -> FORMULARIO ARRIBA Y RESTO DE DETALLES ABAJO */}
          {selectedCard === 'api' ? (
            <div className="w-full animate-fadeIn">
              {/* 1. FORMULARIO ARRIBA */}
              <div className="mb-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-din text-[24px] font-bold text-[#48185A]">
                      Formulario de integración ecommerce
                    </h3>
                    <p className="font-nunito text-[16px] text-gray-500 mt-1">
                      Completa los datos de tu empresa y plataforma web.
                    </p>
                  </div>
                  <div className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-bold text-[#009239] bg-[#eafaf1] px-3 py-1 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Opción Activa</span>
                  </div>
                </div>
                <SoyStarkenForm optionType="api" />
              </div>

              {/* 2. RESTO DE DETALLES ABAJO: EN LA MISMA LÍNEA HORIZONTAL */}
              <div className="pt-7 mt-2 border-t border-gray-200/80">
                <div className="bg-[#FAF7FC]/90 rounded-2xl p-6 sm:p-7 border border-[#48185A]/10 shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Sección 1 (Izquierda): Título, Subtítulo y Plataformas */}
                    <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4 className="font-din text-[22px] sm:text-[24px] font-bold text-[#2b2e2c] mb-1.5 leading-snug">
                        Precios especiales por volumen
                      </h4>
                      <p className="font-nunito text-[14px] text-gray-500 font-medium mb-3">
                        Plataformas disponibles:
                      </p>
                      <div className="flex flex-col items-center md:items-start gap-2">
                        {/* Fila 1 */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                          {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX'].map((p) => (
                            <span
                              key={p}
                              className="px-3 py-1 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-xs sm:text-[13px] font-semibold shadow-2xs"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                        {/* Fila 2 */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                          {['Magento', 'PrestaShop', 'Jumpseller*'].map((p) => (
                            <span
                              key={p}
                              className="px-3 py-1 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-xs sm:text-[13px] font-semibold shadow-2xs"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sección 2 (Derecha): Viñetas en la misma línea horizontal */}
                    <div className="md:col-span-6 md:border-l md:border-[#48185A]/15 md:pl-6 lg:pl-8">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Integración vía API</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Atención personalizada</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Retiros en tu tienda</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Personaliza tu check out</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* CASO B: SI NO ESTÁ SELECCIONADA -> MUESTRA DETALLES Y BOTÓN DE SELECCIÓN */
            <>
              {/* Título de la tarjeta */}
              <h2 className="font-din text-[24px] font-bold text-[#2b2e2c] text-center mb-1 leading-snug">
                Precios especiales por volumen
              </h2>

              {/* Subtítulo Plataformas disponibles */}
              <p className="font-nunito text-[14px] text-gray-500 font-medium text-center mb-2.5">
                Plataformas disponibles:
              </p>

              {/* Chips de Plataformas disponibles (En 2 filas según lineamientos) */}
              <div className="flex flex-col items-center gap-2 mb-6">
                {/* Fila 1 */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['Shopify', 'WooCommerce', 'Bsale*', 'VTEX'].map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs sm:text-[13px] font-semibold shadow-2xs"
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
                      className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs sm:text-[13px] font-semibold shadow-2xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lista de Viñetas Punteadas (Nunito 16px) */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Integración vía API</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Atención personalizada</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Retiros en tu tienda</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#2b2e2c] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Personaliza tu check out</span>
                </li>
              </ul>

              <div className="pt-4 mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard('api');
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
                >
                  Escribe a un ejecutivo
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
