import React from 'react';
import {
  Sparkles,
  Code2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Box,
  Globe2,
  CheckCircle2,
  Zap,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function HomeHero({ onOpenForm, activeProposal }) {
  return (
    <div className="font-['Nunito',sans-serif]">
      {/* Hero Banner Principal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003B1C] via-[#025E2B] to-[#029E47] text-white py-16 sm:py-24">
        {/* Background Decorative Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-[#1ED760]" />
                <span>Nuevo Formulario Único de Afiliación</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Elige cómo sumar tu negocio a <span className="text-[#1ED760]">Starken</span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-xl">
                Un solo formulario inteligente para acceder a los beneficios comerciales de Soy Starken o solicitar la integración técnica vía API para tu tienda online.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenForm}
                  className="px-8 py-4 bg-white hover:bg-emerald-50 text-[#029E47] rounded-xl text-base font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Iniciar Formulario de Inscripción</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#comparativa"
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-sm font-bold text-center transition-all"
                >
                  Conocer las 2 Opciones
                </a>
              </div>

              {/* Quick Trust Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-emerald-100/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1ED760]" />
                  <span>Descuentos inmediatos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1ED760]" />
                  <span>APIs REST & Plugins e-commerce</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1ED760]" />
                  <span>Cobertura nacional 100%</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 text-gray-900 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                    Bifurcación Inteligente
                  </span>
                  <span className="text-xs font-bold text-[#029E47] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Propuesta Activa: P{activeProposal}
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Flujo A Card */}
                  <div
                    onClick={onOpenForm}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-[#029E47] hover:bg-emerald-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#029E47] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#029E47] transition-colors">
                          Flujo A: Programa de Beneficios
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Para personas y pymes. Descuentos por volumen sin requerimiento de sitio web.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Flujo B Card */}
                  <div
                    onClick={onOpenForm}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          Flujo B: Beneficios + Integración API
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Para tiendas online. Cotización en checkout y emisión de etiquetas. <strong>Sitio web obligatorio</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenForm}
                    className="w-full py-3 bg-[#029E47] hover:bg-[#02853c] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Abrir Formulario en Modo Propuesta {activeProposal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Comparativa de Opciones (Jira Alignment) */}
      <section id="comparativa" className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#029E47]">
              Estructura de la Solicitud
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              ¿Cuál es la opción adecuada para tu empresa?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              El formulario bifurca la captura de datos para evitar solicitar requisitos innecesarios y asegurar solicitudes mejor calificadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Opción 1 Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#029E47] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Grupo de Beneficios Soy Starken
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Ideal para emprendedores y empresas que realizan sus envíos entregando en sucursales o solicitando retiros puntuales desde Starken.cl.
                </p>

                <div className="space-y-3 pb-6 border-b border-gray-100 text-xs">
                  <div className="flex items-center gap-2.5 font-bold text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#029E47]" />
                    <span>Descuentos aplicados al RUT</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#029E47]" />
                    <span>Facturación centralizada opcional</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#029E47]" />
                    <span>Sin necesidad de sitio web ni desarrolladores</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenForm}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-[#029E47] hover:text-white text-gray-800 text-xs font-bold transition-all text-center block"
                >
                  Inscribirme a Beneficios
                </button>
              </div>
            </div>

            {/* Opción 2 Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-blue-200 flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                Para E-Commerce
              </span>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2. Beneficios + Integración API
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Para comercios electrónicos con tienda activa que necesitan conectar su plataforma y automatizar cotización, órdenes y rotulado.
                </p>

                <div className="space-y-3 pb-6 border-b border-gray-100 text-xs">
                  <div className="flex items-center gap-2.5 font-bold text-blue-900">
                    <Globe2 className="w-4 h-4 text-blue-600" />
                    <span>Sitio Web Obligatorio (validado)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Plugins para Shopify, WooCommerce, VTEX</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Credenciales de prueba Sandbox en 48 hrs</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenForm}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center block shadow-md"
                >
                  Inscribirme con API
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acceso Rápido desde Footer Notice */}
      <section className="py-8 bg-emerald-900/90 text-white text-center px-4">
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-xs text-emerald-200">
            También puedes acceder en cualquier momento desde el pie de página oficial haciendo clic en el enlace{' '}
            <strong className="text-white underline underline-offset-2">"Ser Soy Starken"</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
