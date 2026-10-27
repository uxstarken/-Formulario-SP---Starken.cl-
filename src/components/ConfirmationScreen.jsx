import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  Code2,
  ArrowRight,
  ExternalLink,
  Download,
  Mail,
  Clock,
  Sparkles,
  Globe,
  Terminal,
  FileText
} from 'lucide-react';

export default function ConfirmationScreen({ formData, onReset, onGoHome }) {
  const isApiFlow = formData.enrollmentType === 'benefits_api';
  const folio = isApiFlow ? `STK-API-${Math.floor(100000 + Math.random() * 900000)}` : `STK-BEN-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: isApiFlow ? ['#029E47', '#2563EB', '#10B981'] : ['#029E47', '#FF8400', '#10B981']
      });
    } catch {
      // ignore
    }
  }, [isApiFlow]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 font-['Nunito',sans-serif] animate-fade-in">
      {/* Tarjeta Principal de Confirmación */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-center p-8 sm:p-12 relative">
        {/* Glow de fondo */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-20 pointer-events-none rounded-full ${
            isApiFlow ? 'bg-blue-500' : 'bg-emerald-500'
          }`}
        />

        {/* Icono de Éxito */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-emerald-50 text-[#029E47] shadow-inner ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Badge de tipo de inscripción */}
        <div className="flex justify-center mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isApiFlow
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {isApiFlow ? <Code2 className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isApiFlow ? 'Beneficios + Integración API' : 'Programa de Beneficios Soy Starken'}
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {isApiFlow
            ? '¡Solicitud de Integración y Beneficios Recibida!'
            : '¡Bienvenido a la Comunidad Soy Starken!'}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8">
          {isApiFlow ? (
            <>
              Hemos registrado la solicitud para{' '}
              <strong className="text-gray-900">{formData.businessName || formData.fullName}</strong>.
              Nuestro equipo técnico verificará tu sitio web{' '}
              <strong className="text-blue-700">{formData.website}</strong> para activar tus credenciales.
            </>
          ) : (
            <>
              ¡Felicitaciones, <strong className="text-gray-900">{formData.fullName}</strong>! Ya eres parte del
              programa de beneficios exclusivo de Starken para potenciar tus envíos a todo Chile.
            </>
          )}
        </p>

        {/* Folio y Resumen de Datos Clave */}
        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-200/80 gap-2">
            <div>
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Número de Folio</span>
              <p className="text-lg font-black text-gray-900 font-mono">{folio}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Fecha de Emisión</span>
              <p className="text-xs font-bold text-gray-700">{new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 font-semibold">Titular / Empresa:</span>
              <p className="font-bold text-gray-800 text-sm mt-0.5">{formData.businessName || formData.fullName}</p>
            </div>
            <div>
              <span className="text-gray-400 font-semibold">RUT Registrado:</span>
              <p className="font-bold text-gray-800 text-sm mt-0.5">{formData.rut || 'No informado'}</p>
            </div>
            <div>
              <span className="text-gray-400 font-semibold">Correo Electrónico:</span>
              <p className="font-bold text-gray-800 text-sm mt-0.5">{formData.email}</p>
            </div>
            <div>
              <span className="text-gray-400 font-semibold">Comuna de Operación:</span>
              <p className="font-bold text-gray-800 text-sm mt-0.5">{formData.commune || 'Santiago'}</p>
            </div>

            {isApiFlow && (
              <>
                <div className="sm:col-span-2 pt-2 border-t border-gray-200/70">
                  <span className="text-blue-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    Sitio Web a Integrar:
                  </span>
                  <a
                    href={formData.website?.startsWith('http') ? formData.website : `https://${formData.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-blue-600 hover:underline text-sm break-all flex items-center gap-1 mt-0.5"
                  >
                    <span>{formData.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold">Plataforma e-commerce:</span>
                  <p className="font-bold text-gray-800 mt-0.5 capitalize">{formData.ecommercePlatform || 'No especificada'}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold">Volumen Mensual Estimado:</span>
                  <p className="font-bold text-gray-800 mt-0.5">{formData.monthlyVolume || 'En crecimiento'}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Roadmap o Próximos Pasos Diferenciados */}
        {isApiFlow ? (
          <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-2xl p-6 text-left border border-blue-100 mb-8">
            <h3 className="text-sm font-bold text-blue-950 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Hoja de Ruta para tu Integración API</span>
            </h3>
            <ol className="space-y-3 text-xs text-blue-900">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">1</span>
                <div>
                  <strong className="block text-blue-950">Validación Técnica del Sitio Web (24 a 48 hrs hábiles)</strong>
                  <span>El equipo de ingeniería verificará la tienda online para habilitar el conector adecuado (Shopify, WooCommerce, VTEX o API REST).</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">2</span>
                <div>
                  <strong className="block text-blue-950">Entrega de API Keys en Ambiente Sandbox</strong>
                  <span>Recibirás credenciales de prueba al correo <strong>{formData.technicalEmail || formData.email}</strong> para realizar pruebas de cotización y emisión.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">3</span>
                <div>
                  <strong className="block text-blue-950">Homologación y Activación de Tarifas Preferenciales</strong>
                  <span>Al certificar tu primera orden, pasas a producción con tarifas preferenciales y recolección programada.</span>
                </div>
              </li>
            </ol>
          </div>
        ) : (
          <div className="bg-emerald-50/70 rounded-2xl p-6 text-left border border-emerald-100 mb-8">
            <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#029E47]" />
              <span>Tus Beneficios Activos Desde Hoy</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-900">
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-950 block mb-1">Tarifas Preferenciales</span>
                <span>Descuento directo en envíos a todo Chile dictando tu RUT en sucursal o Starken.cl.</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-950 block mb-1">Acumulación de Puntos</span>
                <span>Cada envío suma beneficios canjeables y escalas a mejores categorías de cliente.</span>
              </div>
              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                <span className="font-bold text-emerald-950 block mb-1">Atención Prioritaria</span>
                <span>Línea telefónica y de WhatsApp dedicada para consultas de seguimiento y soporte.</span>
              </div>
            </div>
          </div>
        )}

        {/* Acciones Finales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {isApiFlow ? (
            <a
              href="https://developers.starken.cl"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#029E47] hover:bg-[#02853c] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Ir a Documentación de APIs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-3 bg-[#029E47] hover:bg-[#02853c] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Ir al Home de Starken</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-all"
          >
            Llenar otra solicitud
          </button>
        </div>
      </div>
    </div>
  );
}
