import React, { useState, useEffect, useRef } from 'react';
import SoyStarkenForm from './SoyStarkenForm';
import Breadcrumb from './Breadcrumb';
import { ChevronDown } from 'lucide-react';

export default function Proposal3InteractiveCards() {
  // null = ambas tarjetas en modo comparativo inicial
  // 'benefits' = tarjeta 1 seleccionada (expandida con formulario in-place)
  // 'api' = tarjeta 2 seleccionada (expandida con formulario in-place)
  const [selectedCard, setSelectedCard] = useState(null);

  // Estado para expandir los detalles (chips + beneficios) de cada tarjeta en mobile
  const [mobileExpandedCard, setMobileExpandedCard] = useState(null);

  const scrollTargetRef = useRef(null);
  const mobileFormRef = useRef(null);
  const mobileCard1Ref = useRef(null);
  const mobileCard2Ref = useRef(null);
  const mobileBullets1Ref = useRef(null);
  const mobileBullets2Ref = useRef(null);
  const cardBenefitsRef = useRef(null);
  const cardApiRef = useRef(null);
  const prevSelectedCardRef = useRef(null);
  const prevMobileExpandedRef = useRef(null);

  // Toggle para desplegar/contraer la información de una tarjeta en mobile
  const toggleMobileExpand = (cardKey) => {
    // Al contraer una card que tenía el formulario abierto o los beneficios desplegados,
    // se deselecciona y siempre se hace auto-scroll a la parte superior de la web
    if (mobileExpandedCard === cardKey) {
      if (selectedCard === cardKey) {
        setSelectedCard(null);
      }
      setMobileExpandedCard(null);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setMobileExpandedCard(cardKey);
    }
  };

  // Manejar click en botón de acción en mobile
  const handleMobileSelectCard = (cardKey) => {
    if (selectedCard === cardKey) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardKey);
      setMobileExpandedCard(cardKey); // también despliega los detalles si estaban cerrados
    }
  };

  // Click o Tap fuera de las cards para volver a la vista inicial (ambas contraídas)
  useEffect(() => {
    // Si ninguna card está abierta o seleccionada, no necesitamos escuchar eventos
    if (!selectedCard && !mobileExpandedCard) return;

    let startedInside = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTriggerTime = 0;

    const checkInside = (target) => {
      // Si el elemento ya no está en el DOM (fue desmontado por una acción interna, ej: seleccionar opción de dropdown), se considera interno
      if (!target || !document.body.contains(target)) {
        return true;
      }

      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const card1 = mobileCard1Ref.current;
        const card2 = mobileCard2Ref.current;
        return Boolean((card1 && card1.contains(target)) || (card2 && card2.contains(target)));
      } else {
        const activeDesktopCard = selectedCard === 'benefits' ? cardBenefitsRef.current : cardApiRef.current;
        return Boolean(activeDesktopCard && activeDesktopCard.contains(target));
      }
    };

    const handlePointerDown = (e) => {
      startedInside = checkInside(e.target);
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      } else {
        touchStartX = e.clientX;
        touchStartY = e.clientY;
      }
    };

    const handleActionOutside = (e) => {
      // Evitar doble ejecución rápida (por ejemplo touchend seguido de click sintético)
      const now = Date.now();
      if (now - lastTriggerTime < 250) return;

      // Si el gesto comenzó dentro de la card, ignorar y marcar tiempo para ignorar clicks sintéticos posteriores
      if (startedInside) {
        startedInside = false;
        lastTriggerTime = now;
        return;
      }

      // Si el usuario arrastró más de 12px (hizo scroll/swipe), no es un tap/click intencional
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.changedTouches && e.changedTouches[0]) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }

      if (clientX !== undefined && clientY !== undefined && touchStartX !== undefined && touchStartY !== undefined) {
        const distance = Math.hypot(clientX - touchStartX, clientY - touchStartY);
        if (distance > 12) {
          return;
        }
      }

      // Verificar que el elemento final tampoco sea interno
      if (!checkInside(e.target)) {
        lastTriggerTime = now;
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          setMobileExpandedCard(null);
          setSelectedCard(null);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          setSelectedCard(null);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerDown, { passive: true });
      document.addEventListener('touchstart', handlePointerDown, { passive: true });
      document.addEventListener('click', handleActionOutside);
      document.addEventListener('touchend', handleActionOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('click', handleActionOutside);
      document.removeEventListener('touchend', handleActionOutside);
    };
  }, [selectedCard, mobileExpandedCard]);

  // Auto-centrar suavemente en el formulario / tarjetas cuando se selecciona una opción
  // o autoscrollear a la parte superior de la web cuando se contraen las tarjetas (mobile y desktop)
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    if (selectedCard) {
      const timer = setTimeout(() => {
        if (isMobile) {
          const targetRef = selectedCard === 'benefits' ? mobileBullets1Ref.current : mobileBullets2Ref.current;
          if (targetRef) {
            const navbarHeight = 116; // Sticky navbar mobile total (46px + 70px)
            const elementTop = targetRef.getBoundingClientRect().top;
            const targetY = elementTop + window.pageYOffset - (navbarHeight + 16);

            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth'
            });
          }
        } else if (!isMobile && scrollTargetRef.current) {
          const navbarHeight = 125; // Altura sticky navbar desktop
          const elementTop = scrollTargetRef.current.getBoundingClientRect().top;
          const targetY = elementTop + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Cuando se deselecciona o se contraen las tarjetas a la vista inicial comprimida
      const wasSelected = Boolean(prevSelectedCardRef.current);
      const wasExpanded = Boolean(prevMobileExpandedRef.current);

      if ((wasSelected || wasExpanded) && !selectedCard && !mobileExpandedCard) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Verificación de seguridad: tras la transición de repliegue de la card,
        // asegurar que la vista no quede atrapada en el footer
        const timer = setTimeout(() => {
          if (window.pageYOffset > 0) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }, 300);

        return () => clearTimeout(timer);
      }
    }

    prevSelectedCardRef.current = selectedCard;
    prevMobileExpandedRef.current = mobileExpandedCard;
  }, [selectedCard, mobileExpandedCard]);

  // Auto-scroll en mobile al desplegar una card (por ejemplo al pulsar la flecha en la card de abajo)
  useEffect(() => {
    if (mobileExpandedCard && !selectedCard) {
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) return;

      const timer = setTimeout(() => {
        if (mobileExpandedCard === 'api' && mobileCard2Ref.current) {
          // Dejar Card 2 con su badge flotante visible y con aire bajo el navbar (116px)
          // La caja blanca de Card 2 queda a ~175px del tope para coincidir exactamente con la referencia
          const cardTop = mobileCard2Ref.current.getBoundingClientRect().top + window.pageYOffset;
          const targetY = cardTop - 175;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        } else if (mobileExpandedCard === 'benefits' && mobileCard1Ref.current) {
          const cardTop = mobileCard1Ref.current.getBoundingClientRect().top + window.pageYOffset;
          const targetY = cardTop - 175;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }
      }, 120);

      return () => clearTimeout(timer);
    }
  }, [mobileExpandedCard, selectedCard]);

  return (
    <div className="w-full font-nunito pb-0 lg:pb-8">
      {/* 1. BREADCRUMB (oculto en mobile) */}
      <div className="hidden lg:block mb-2">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '#' },
            { label: 'Registro Somos Partner', active: true }
          ]}
        />
      </div>

      {/* 2. ENCABEZADO PRINCIPAL CENTRADO (SEGÚN REFERENCIA) */}
      <div className="text-center max-w-[840px] mx-auto mb-3.5 sm:mb-8 lg:mb-9">
        {/* Versión Mobile */}
        <div className="block lg:hidden">
          <h1
            className="font-din whitespace-nowrap font-bold text-[#48185A] tracking-tight leading-tight mb-1"
            style={{ fontSize: '20px' }}
          >
            Únete al programa de pyme de Starken
          </h1>
          <p
            className="font-nunito text-base text-[16px] text-bajada-16 font-semibold text-[#505050] tracking-wide"
            style={{ fontSize: '16px', color: '#505050' }}
          >
            y haz crecer tu negocio.
          </p>
        </div>

        {/* Versión Desktop */}
        <div className="hidden lg:block">
          <h1 className="font-din text-[28px] text-main-title font-bold text-[#48185A] tracking-normal leading-tight mb-1.5">
            Únete al programa de pymes y emprendedores <br />
            <span className="inline-block">más grande de Chile</span>
          </h1>
          <p
            className="font-nunito text-base text-[16px] text-bajada-16 font-semibold text-[#505050] tracking-wide"
            style={{ fontSize: '16px', color: '#505050' }}
          >
            y comienza a enviar tus pedidos con Starken
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. VERSIÓN MOBILE: TARJETAS VERTICALES COMPACTAS PLEGABLES */}
      {/* ============================================================== */}
      <div className="block lg:hidden mb-2 space-y-[40px] pt-4 pb-2">
        {/* ========================================== */}
        {/* TARJETA 1 MOBILE: UNIRME AL PROGRAMA */}
        {/* ========================================== */}
        <div
          ref={mobileCard1Ref}
          onClick={() => {
            if (mobileExpandedCard !== 'benefits') {
              // Tap en la card contraída la despliega
              setMobileExpandedCard('benefits');
            } else {
              // Tap en cualquier parte de la card expandida (fuera del CTA/formulario) la contrae
              toggleMobileExpand('benefits');
            }
          }}
          className={`w-full bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] relative select-none cursor-pointer pb-7 sm:pb-8 ${selectedCard === 'benefits'
              ? 'border-2 border-[#48185A] shadow-xl ring-2 ring-[#48185A]/15 pb-7'
              : 'border-gray-200/90 shadow-md hover:border-[#48185A]/40'
            }`}
        >
          {/* Cabecera / Área superior de la tarjeta */}
          <div>
            {/* Badge superior flotante */}
            <div className="flex justify-center -mt-9 mb-3">
              <span className="px-4 py-1 rounded-full border border-[#F97316] bg-white text-[#EA580C] font-nunito font-semibold text-[12px] tracking-wide select-none">
                Unirme al programa
              </span>
            </div>

            {/* Título de la tarjeta centrado */}
            <div className="text-center mb-1">
              <h2
                className="font-din text-[18px] text-card-title-18 font-bold text-[#303030] leading-snug"
                style={{ fontSize: '18px' }}
              >
                Obtén descuentos por categorías
              </h2>
            </div>

            {/* Subtítulo Categorías visible siempre (contraída y expandida) */}
            <p className="font-nunito text-[13px] text-[#505050] font-medium text-center mb-1.5" style={{ color: '#505050' }}>
              Categorias
            </p>

            {/* Chips de Categorías visible siempre (contraída y expandida) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                <span
                  key={cat}
                  style={{ fontSize: '12px' }}
                  className="px-3.5 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs text-badge-12 font-semibold shadow-2xs"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Botón principal CTA en card contraída */}
            {mobileExpandedCard !== 'benefits' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileSelectCard('benefits');
                }}
                className="mt-5 mx-auto flex items-center justify-center h-[46px] w-full rounded-full bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white shadow-md cursor-pointer font-nunito font-bold text-[15px] select-none transition-colors duration-200 animate-fadeIn"
              >
                Unirme al programa
              </button>
            )}
          </div>

          {/* Detalle desplegable animado suavemente (tipo spring sin rebote) */}
          <div
            className={`smooth-accordion-wrapper ${mobileExpandedCard === 'benefits' ? 'is-expanded' : ''
              }`}
          >
            <div className="smooth-accordion-inner">
              <div ref={mobileBullets1Ref} className="pt-4 mt-3 border-t border-gray-100 scroll-mt-28">
                {/* Lista de Viñetas Punteadas con más aire y separación */}
                <ul className="space-y-3.5 mb-6">
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Alianza y beneficios</span>
                  </li>
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Atención especializada en canales digitales</span>
                  </li>
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Plan de difusión</span>
                  </li>
                </ul>

                {/* Botón de acción (solo visible cuando los beneficios están expandidos pero el formulario NO está abierto aún) */}
                {selectedCard !== 'benefits' && (
                  <div className="pt-1 pb-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobileSelectCard('benefits');
                      }}
                      className="w-full py-3 px-5 rounded-full font-bold text-[14.5px] shadow-md transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 bg-[#48185A] hover:bg-[#381146] text-white"
                    >
                      Unirme al programa
                    </button>
                  </div>
                )}

                {/* Formulario móvil desplegado abajo SOLO cuando se presiona el botón */}
                {selectedCard === 'benefits' && (
                  <div
                    ref={mobileFormRef}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 pt-5 border-t border-gray-100 animate-fadeIn scroll-mt-24 cursor-default"
                  >
                    <div className="mb-5 pb-3 border-b border-gray-100">
                      <h3 className="font-din text-[20px] font-bold text-[#48185A] leading-snug">
                        Formulario de registro
                      </h3>
                    </div>
                    <SoyStarkenForm optionType="benefits" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botón circular con flecha (expandir / contraer) - Mitad dentro, mitad fuera */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileExpand('benefits');
            }}
            aria-expanded={mobileExpandedCard === 'benefits'}
            aria-label={mobileExpandedCard === 'benefits' ? 'Contraer beneficios' : 'Desplegar beneficios'}
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white flex items-center justify-center shadow-md cursor-pointer border-2 border-white transition-all z-20"
          >
            <ChevronDown
              className={`w-5 h-5 text-white transition-transform duration-300 ${mobileExpandedCard === 'benefits' ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </button>
        </div>

        {/* ========================================== */}
        {/* TARJETA 2 MOBILE: CONECTAR MI PÁGINA WEB */}
        {/* ========================================== */}
        <div
          ref={mobileCard2Ref}
          onClick={() => {
            if (mobileExpandedCard !== 'api') {
              // Tap en la card contraída la despliega
              setMobileExpandedCard('api');
            } else {
              // Tap en cualquier parte de la card expandida (fuera del CTA/formulario) la contrae
              toggleMobileExpand('api');
            }
          }}
          className={`w-full bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] relative select-none cursor-pointer pb-7 sm:pb-8 ${selectedCard === 'api'
              ? 'border-2 border-[#48185A] shadow-xl ring-2 ring-[#48185A]/15 pb-7'
              : 'border-gray-200/90 shadow-md hover:border-[#48185A]/40'
            }`}
        >
          {/* Cabecera / Área superior de la tarjeta */}
          <div>
            {/* Badge superior flotante */}
            <div className="flex justify-center -mt-9 mb-3">
              <span className="px-4 py-1 rounded-full border border-[#F97316] bg-white text-[#EA580C] font-nunito font-semibold text-[12px] tracking-wide select-none">
                Conectar mi página web
              </span>
            </div>

            {/* Título de la tarjeta centrado */}
            <div className="text-center mb-1">
              <h2
                className="font-din text-[18px] text-card-title-18 font-bold text-[#303030] leading-snug"
                style={{ fontSize: '18px' }}
              >
                Precios especiales por volumen
              </h2>
            </div>

            {/* Subtítulo Plataformas disponible siempre (contraída y expandida) */}
            <p className="font-nunito text-[13px] text-[#505050] font-medium text-center mb-1.5" style={{ color: '#505050' }}>
              Plataformas disponibles
            </p>

            {/* Chips de Plataformas visible siempre (contraída y expandida) */}
            <div className="flex flex-col items-center gap-1.5 mb-2 w-full">
              <div className="flex flex-nowrap items-center justify-center gap-1.5 max-w-full">
                {['Shopify', 'Magento', 'Bsale*', 'Jumpseller*'].map((p) => (
                  <span
                    key={p}
                    style={{ fontSize: '12px' }}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-[12px] text-badge-12 font-semibold shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-nowrap items-center justify-center gap-1.5 max-w-full">
                {['PrestaShop', 'WooCommerce', 'VTEX'].map((p) => (
                  <span
                    key={p}
                    style={{ fontSize: '12px' }}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-[12px] text-badge-12 font-semibold shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Botón principal CTA en card contraída */}
            {mobileExpandedCard !== 'api' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMobileSelectCard('api');
                }}
                className="mt-5 mx-auto flex items-center justify-center h-[46px] w-full rounded-full bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white shadow-md cursor-pointer font-nunito font-bold text-[15px] select-none transition-colors duration-200 animate-fadeIn"
              >
                Contactar con ejecutivo
              </button>
            )}
          </div>

          {/* Detalle desplegable animado suavemente (tipo spring sin rebote) */}
          <div
            className={`smooth-accordion-wrapper ${mobileExpandedCard === 'api' ? 'is-expanded' : ''
              }`}
          >
            <div className="smooth-accordion-inner">
              <div ref={mobileBullets2Ref} className="pt-4 mt-3 border-t border-gray-100 scroll-mt-28">
                {/* Lista de Viñetas Punteadas con más aire y separación */}
                <ul className="space-y-3.5 mb-6">
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Integración vía API o Plugin</span>
                  </li>
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Acompañamiento especializado</span>
                  </li>
                  <li className="flex items-start gap-3 font-nunito text-sm text-bullet-14 text-[#303030] font-medium leading-relaxed" style={{ fontSize: '14px' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0 mt-1" />
                    <span>Vende y despacha desde un solo lugar</span>
                  </li>
                </ul>

                {/* Botón de acción (solo visible cuando los beneficios están expandidos pero el formulario NO está abierto aún) */}
                {selectedCard !== 'api' && (
                  <div className="pt-1 pb-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobileSelectCard('api');
                      }}
                      className="w-full py-3 px-5 rounded-full font-bold text-[14.5px] shadow-md transition-all duration-150 cursor-pointer text-center flex items-center justify-center gap-2 bg-[#48185A] hover:bg-[#381146] text-white"
                    >
                      Contactar con ejecutivo
                    </button>
                  </div>
                )}

                {/* Formulario móvil desplegado abajo SOLO cuando se presiona el botón */}
                {selectedCard === 'api' && (
                  <div
                    ref={mobileFormRef}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 pt-5 border-t border-gray-100 animate-fadeIn scroll-mt-24 cursor-default"
                  >
                    <div className="mb-5 pb-3 border-b border-gray-100">
                      <h3 className="font-din text-[20px] font-bold text-[#48185A] leading-snug">
                        Formulario de integración ecommerce
                      </h3>
                      <p className="font-nunito text-[13px] text-[#505050] mt-1" style={{ color: '#505050' }}>
                        Completa los datos de tu empresa y plataforma web.
                      </p>
                    </div>
                    <SoyStarkenForm optionType="api" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botón circular con flecha (expandir / contraer) - Mitad dentro, mitad fuera */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMobileExpand('api');
            }}
            aria-expanded={mobileExpandedCard === 'api'}
            aria-label={mobileExpandedCard === 'api' ? 'Contraer beneficios' : 'Desplegar beneficios'}
            className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white flex items-center justify-center shadow-md cursor-pointer border-2 border-white transition-all z-20"
          >
            <ChevronDown
              className={`w-5 h-5 text-white transition-transform duration-300 ${mobileExpandedCard === 'api' ? 'rotate-180' : 'rotate-0'
                }`}
            />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. VERSIÓN DESKTOP: TARJETAS COMPARATIVAS INTERACTIVAS */}
      {/* ============================================================== */}
      <div
        ref={scrollTargetRef}
        className={`hidden lg:flex lg:flex-row gap-8 lg:gap-7 justify-center transition-all duration-300 ease-in-out pt-6 ${selectedCard ? 'items-start' : 'items-stretch'
          }`}
      >
        {/* ============================================================== */}
        {/* TARJETA 1: REGISTRARME / UNIRME AL PROGRAMA */}
        {/* ============================================================== */}
        <div
          ref={cardBenefitsRef}
          className={`w-full bg-white rounded-3xl p-6 sm:p-8 lg:py-11 lg:px-9 border transition-all duration-300 ease-in-out flex flex-col relative ${selectedCard === 'benefits'
              ? 'lg:w-[62%] border-2 border-[#48185A] shadow-xl ring-4 ring-[#48185A]/10 cursor-default'
              : selectedCard === 'api'
                ? 'lg:w-[38%] border-gray-200/90 shadow-md opacity-95 hover:opacity-100 hover:border-[#48185A]/40 cursor-pointer'
                : 'lg:w-[50%] border-gray-200/90 shadow-lg hover:shadow-xl cursor-pointer'
            }`}
          onClick={() => {
            if (!selectedCard) {
              setSelectedCard('benefits');
            }
          }}
        >
          {/* Badge superior flotante centrado exactamente sobre la línea superior de la card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="whitespace-nowrap px-6 py-2 rounded-full border-2 border-[#F97316] bg-white text-[#EA580C] font-nunito font-bold text-[14px] shadow-sm tracking-wide select-none">
              Unirme al programa
            </span>
          </div>

          {/* CASO A: SI ESTÁ SELECCIONADA -> FORMULARIO ARRIBA Y RESTO DE DETALLES ABAJO */}
          {selectedCard === 'benefits' ? (
            <div className="w-full animate-fadeIn">
              {/* 1. FORMULARIO ARRIBA */}
              <div className="mb-8">
                <div className="mb-6 pb-3 border-b border-gray-100">
                  <h3 className="font-din text-[24px] font-bold text-[#48185A]">
                    Formulario de registro
                  </h3>
                </div>
                <SoyStarkenForm optionType="benefits" />
              </div>

              {/* 2. RESTO DE DETALLES ABAJO: EN LA MISMA LÍNEA HORIZONTAL */}
              <div className="pt-7 mt-2 border-t border-gray-200/80">
                <div className="bg-[#FAF7FC]/90 rounded-2xl p-6 sm:p-7 border border-[#48185A]/10 shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Sección 1 (Izquierda): Título, Subtítulo y Categorías */}
                    <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4
                        className="font-din text-[24px] text-card-title-desktop-24 font-bold text-[#303030] mb-1 leading-snug"
                        style={{ fontSize: '24px' }}
                      >
                        Obtén descuentos por categorías
                      </h4>
                      <p className="font-nunito text-[14px] text-[#505050] font-medium mb-1.5" style={{ color: '#505050' }}>
                        Categorias
                      </p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                          <span
                            key={cat}
                            className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-[13px] lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs whitespace-nowrap"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sección 2 (Derecha): Viñetas en la misma línea horizontal */}
                    <div className="md:col-span-6 md:border-l md:border-[#48185A]/15 md:pl-6 lg:pl-8">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Alianza y beneficios</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Atención especializada en canales digitales</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Plan de difusión</span>
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
              {/* SECCIÓN 1: TÍTULO + BAJADA + BADGES */}
              <div className="flex flex-col items-center mb-7 sm:mb-8 lg:mb-10">
                {/* Título de la tarjeta */}
                <h2
                  className="font-din text-[24px] text-card-title-desktop-24 font-bold text-[#303030] text-center mb-1 leading-snug"
                  style={{ fontSize: '24px' }}
                >
                  Obtén descuentos por categorías
                </h2>

                {/* Subtítulo Categorías */}
                <p className="font-nunito text-[14px] text-[#505050] font-medium text-center mb-1.5" style={{ color: '#505050' }}>
                  Categorias
                </p>

                {/* Chips de Categorías */}
                <div className="flex items-start justify-center gap-2 pt-1 h-[70px] w-full">
                  {['Colina', 'Montaña', 'Cordillera'].map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-[13px] lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs whitespace-nowrap"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* SECCIÓN 2: LISTA DE BENEFICIOS PUNTEADOS */}
              <ul className="space-y-3.5 lg:space-y-4 mb-7 sm:mb-8 lg:mb-10">
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Alianza y beneficios</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Atención especializada en canales digitales</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Plan de difusión</span>
                </li>
              </ul>

              {/* SECCIÓN 3: BOTÓN DE ACCIÓN */}
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard('benefits');
                  }}
                  className="w-full py-3.5 lg:py-4 px-6 rounded-[7px] bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
                >
                  Unirme al programa
                </button>
              </div>
            </>
          )}
        </div>

        {/* ============================================================== */}
        {/* TARJETA 2: REGISTRARME + INTEGRACIONES / CONECTA TU PAGINA WEB */}
        {/* ============================================================== */}
        <div
          ref={cardApiRef}
          className={`w-full bg-white rounded-3xl p-6 sm:p-8 lg:py-11 lg:px-9 border transition-all duration-300 ease-in-out flex flex-col relative ${selectedCard === 'api'
              ? 'lg:w-[62%] border-2 border-[#48185A] shadow-xl ring-4 ring-[#48185A]/10 cursor-default'
              : selectedCard === 'benefits'
                ? 'lg:w-[38%] border-gray-200/90 shadow-md opacity-95 hover:opacity-100 hover:border-[#48185A]/40 cursor-pointer'
                : 'lg:w-[50%] border-gray-200/90 shadow-lg hover:shadow-xl cursor-pointer'
            }`}
          onClick={() => {
            if (!selectedCard) {
              setSelectedCard('api');
            }
          }}
        >
          {/* Badge superior flotante centrado exactamente sobre la línea superior de la card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="whitespace-nowrap px-6 py-2 rounded-full border-2 border-[#F97316] bg-white text-[#EA580C] font-nunito font-bold text-[14px] shadow-sm tracking-wide select-none">
              Conectar mi página web
            </span>
          </div>

          {/* CASO A: SI ESTÁ SELECCIONADA -> FORMULARIO ARRIBA Y RESTO DE DETALLES ABAJO */}
          {selectedCard === 'api' ? (
            <div className="w-full animate-fadeIn">
              {/* 1. FORMULARIO ARRIBA */}
              <div className="mb-8">
                <div className="mb-6 pb-3 border-b border-gray-100">
                  <h3 className="font-din text-[24px] font-bold text-[#48185A]">
                    Formulario de integración ecommerce
                  </h3>
                  <p className="font-nunito text-[16px] text-[#505050] mt-1" style={{ color: '#505050' }}>
                    Completa los datos de tu empresa y plataforma web.
                  </p>
                </div>
                <SoyStarkenForm optionType="api" />
              </div>

              {/* 2. RESTO DE DETALLES ABAJO: EN LA MISMA LÍNEA HORIZONTAL */}
              <div className="pt-7 mt-2 border-t border-gray-200/80">
                <div className="bg-[#FAF7FC]/90 rounded-2xl p-6 sm:p-7 border border-[#48185A]/10 shadow-2xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Sección 1 (Izquierda): Título, Subtítulo y Plataformas */}
                    <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4
                        className="font-din text-[24px] text-card-title-desktop-24 font-bold text-[#303030] mb-1 leading-snug"
                        style={{ fontSize: '24px' }}
                      >
                        Precios especiales por volumen
                      </h4>
                      <p className="font-nunito text-[14px] text-[#505050] font-medium mb-1.5" style={{ color: '#505050' }}>
                        Plataformas disponibles
                      </p>
                      <div className="flex flex-col items-center md:items-start gap-1.5 sm:gap-2">
                        {/* Fila 1 */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 sm:gap-1.5">
                          {['Shopify', 'WooCommerce', 'Bsale*', 'Jumpseller*'].map((p) => (
                            <span
                              key={p}
                              className="whitespace-nowrap px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-[11.5px] sm:text-xs lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                        {/* Fila 2 */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 sm:gap-1.5">
                          {['PrestaShop', 'Magento', 'VTEX'].map((p) => (
                            <span
                              key={p}
                              className="whitespace-nowrap px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[#48185A] font-nunito text-[11.5px] sm:text-xs lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs"
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
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Integración vía API o Plugin</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Acompañamiento especializado</span>
                        </li>
                        <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                          <span>Vende y despacha desde un solo lugar</span>
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
              {/* SECCIÓN 1: TÍTULO + BAJADA + BADGES */}
              <div className="flex flex-col items-center mb-7 sm:mb-8 lg:mb-10">
                {/* Título de la tarjeta */}
                <h2
                  className="font-din text-[24px] text-card-title-desktop-24 font-bold text-[#303030] text-center mb-1 leading-snug"
                  style={{ fontSize: '24px' }}
                >
                  Precios especiales por volumen
                </h2>

                {/* Subtítulo Plataformas disponibles */}
                <p className="font-nunito text-[14px] text-[#505050] font-medium text-center mb-1.5" style={{ color: '#505050' }}>
                  Plataformas disponibles
                </p>

                {/* Chips de Plataformas disponibles (En 2 filas horizontales en desktop) */}
                <div className="flex flex-col items-center justify-start gap-1.5 pt-1 h-[70px] w-full">
                  {/* Fila 1 */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-full">
                    {['Shopify', 'WooCommerce', 'Bsale*', 'Jumpseller*'].map((p) => (
                      <span
                        key={p}
                        className="whitespace-nowrap px-2.5 sm:px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs sm:text-[12px] lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  {/* Fila 2 */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 max-w-full">
                    {['PrestaShop', 'Magento', 'VTEX'].map((p) => (
                      <span
                        key={p}
                        className="whitespace-nowrap px-2.5 sm:px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 text-[#48185A] font-nunito text-xs sm:text-[12px] lg:text-[14px] text-badge-desktop-14 font-semibold shadow-2xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: LISTA DE BENEFICIOS PUNTEADOS */}
              <ul className="space-y-3.5 lg:space-y-4 mb-7 sm:mb-8 lg:mb-10">
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Integración vía API o Plugin</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Acompañamiento especializado</span>
                </li>
                <li className="flex items-center gap-3 font-nunito text-[16px] text-[#303030] font-medium leading-relaxed">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  <span>Vende y despacha desde un solo lugar</span>
                </li>
              </ul>

              {/* SECCIÓN 3: BOTÓN DE ACCIÓN */}
              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard('api');
                  }}
                  className="w-full py-3.5 lg:py-4 px-6 rounded-[7px] bg-[#48185A] hover:bg-[#381146] active:bg-[#2b0c36] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
                >
                  Contactar con ejecutivo
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
