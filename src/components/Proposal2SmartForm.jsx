import React, { useState } from 'react';
import {
  Sparkles,
  Code2,
  Check,
  AlertCircle,
  Globe,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Info,
  Terminal,
  Zap
} from 'lucide-react';
import { ALL_COMMUNES, ECOMMERCE_PLATFORMS, MONTHLY_VOLUMES } from '../data/communes';
import { formatRut, validateRut, isValidUrl } from '../utils/rutValidator';

export default function Proposal2SmartForm({ onSubmitSuccess }) {
  const [enrollmentType, setEnrollmentType] = useState('benefits_only'); // 'benefits_only' | 'benefits_api'
  const [personType, setPersonType] = useState('natural');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    rut: '',
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    address: '',
    commune: 'Santiago',
    website: '',
    ecommercePlatform: 'shopify',
    monthlyVolume: '50 a 200 envíos al mes',
    technicalContactName: '',
    technicalEmail: '',
    termsAccepted: false,
    marketingAccepted: false
  });

  const [errors, setErrors] = useState({});

  const isApi = enrollmentType === 'benefits_api';

  const handleChange = (field, value) => {
    let processed = value;
    if (field === 'rut') {
      processed = formatRut(value);
    }
    setFormData((prev) => ({ ...prev, [field]: processed }));

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = 'Ingresa el nombre completo.';
    if (!formData.email.trim()) {
      errs.email = 'Ingresa un correo de contacto.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Formato de correo inválido.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Ingresa el teléfono celular.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Teléfono debe tener mínimo 8 dígitos.';
    }

    if (formData.rut && !validateRut(formData.rut)) {
      errs.rut = 'RUT inválido (ej: 12.345.678-9).';
    }

    if (!formData.businessName.trim()) {
      errs.businessName = 'Ingresa el nombre de tu emprendimiento o empresa.';
    }

    if (!formData.address.trim()) {
      errs.address = 'Ingresa la dirección de retiro o despacho.';
    }

    if (!formData.commune) {
      errs.commune = 'Selecciona una comuna.';
    }

    // Regla de Jira para API: Sitio web obligatorio
    if (isApi) {
      if (!formData.website.trim()) {
        errs.website = 'El sitio web es obligatorio para solicitudes de integración API.';
      } else if (!isValidUrl(formData.website)) {
        errs.website = 'Ingresa una URL válida (ej: mitienda.cl o https://mitienda.com).';
      }

      if (formData.technicalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.technicalEmail)) {
        errs.technicalEmail = 'Correo de contacto técnico inválido.';
      }
    }

    if (!formData.termsAccepted) {
      errs.termsAccepted = 'Debes aceptar los términos y condiciones.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstErr = document.querySelector('.has-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess({
        ...formData,
        enrollmentType,
        personType
      });
    }, 850);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-['Nunito',sans-serif]">
      {/* Header de la Propuesta 2 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-2">
          <span>Propuesta 2 · Arquitectura Unificada Dinámica (Single Smart View)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Formulario Único de Afiliación Starken
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mt-1">
          Visualiza todo en una sola pantalla interactiva. Los campos y requisitos se adaptan en vivo según tu elección.
        </p>
      </div>

      {/* Selector Segmentado Superior (Tabs Principales) */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Opción 1: Beneficios Soy Starken */}
          <button
            type="button"
            onClick={() => setEnrollmentType('benefits_only')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 border-2 relative flex items-start gap-4 ${
              enrollmentType === 'benefits_only'
                ? 'border-[#029E47] bg-emerald-50/50 shadow-sm'
                : 'border-transparent bg-gray-50/80 hover:bg-gray-100/70 text-gray-600'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                enrollmentType === 'benefits_only' ? 'bg-[#029E47] text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  1. Solo Beneficios Soy Starken
                </span>
                {enrollmentType === 'benefits_only' && (
                  <span className="w-4 h-4 rounded-full bg-[#029E47] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Tarifas preferenciales para envíos en sucursal y online. Sin requerimiento técnico.
              </p>
            </div>
          </button>

          {/* Opción 2: Beneficios + Integración API */}
          <button
            type="button"
            onClick={() => setEnrollmentType('benefits_api')}
            className={`p-4 rounded-2xl text-left transition-all duration-200 border-2 relative flex items-start gap-4 ${
              enrollmentType === 'benefits_api'
                ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                : 'border-transparent bg-gray-50/80 hover:bg-gray-100/70 text-gray-600'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                enrollmentType === 'benefits_api' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  2. Beneficios + Integración API
                </span>
                {enrollmentType === 'benefits_api' && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Para tiendas online con sitio web. Cotización automática y etiquetas en checkout.
              </p>
            </div>
          </button>
        </div>

        {/* Banner Informativo Dinámico */}
        <div
          className={`mt-4 px-4 py-3 rounded-2xl text-xs flex items-center gap-3 transition-colors ${
            isApi
              ? 'bg-blue-50/70 border border-blue-200/80 text-blue-900'
              : 'bg-emerald-50/70 border border-emerald-200/80 text-emerald-900'
          }`}
        >
          {isApi ? (
            <>
              <Terminal className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span>
                <strong>Modo Integración Técnica Activo:</strong> Se solicitarán datos del sitio web y plataforma de e-commerce para coordinar con el equipo de APIs.
              </span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-[#029E47] flex-shrink-0" />
              <span>
                <strong>Modo Afiliación Directa:</strong> Formulario simplificado. No requiere sitio web; activa descuentos inmediatos en toda la red Starken.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Single Form Box */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECCIÓN 1: DATOS DE CONTACTO Y NEGOCIO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-100 gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#029E47]" />
                <span>1. Información del Titular y Negocio</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Datos requeridos para asociar los descuentos y beneficios del programa Soy Starken.
              </p>
            </div>

            {/* Toggle Tipo Persona */}
            <div className="inline-flex p-1 bg-gray-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setPersonType('natural')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  personType === 'natural' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                }`}
              >
                Persona
              </button>
              <button
                type="button"
                onClick={() => setPersonType('juridica')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  personType === 'juridica' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                }`}
              >
                Empresa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nombre Completo */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nombre y Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Juan Pérez"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47] transition-colors ${
                  errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* RUT */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                RUT (Persona o Empresa)
              </label>
              <input
                type="text"
                value={formData.rut}
                onChange={(e) => handleChange('rut', e.target.value)}
                placeholder="12.345.678-9"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 font-mono focus:outline-none focus:border-[#029E47] transition-colors ${
                  errors.rut ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
              {errors.rut && <p className="text-[11px] text-red-500 mt-1">{errors.rut}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contacto@empresa.cl"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47] transition-colors ${
                  errors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Celular */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Teléfono Celular <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+56</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="9 1234 5678"
                  className={`w-full pl-12 pr-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47] transition-colors ${
                    errors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Nombre del Negocio */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Nombre de Fantasía o Negocio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                placeholder="Ej: Joyas Luna / Logística Global SpA"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47] transition-colors ${
                  errors.businessName ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
              {errors.businessName && <p className="text-[11px] text-red-500 mt-1">{errors.businessName}</p>}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Dirección Comercial o de Retiro <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Av. Providencia 1234, Of. 501"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47] transition-colors ${
                  errors.address ? 'border-red-400 bg-red-50/20' : 'border-gray-200'
                }`}
              />
              {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Comuna */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Comuna <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.commune}
                onChange={(e) => handleChange('commune', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47]"
              >
                {ALL_COMMUNES.map((comm) => (
                  <option key={comm} value={comm}>
                    {comm}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: REQUISITOS TÉCNICOS DE API (PROGRESSIVE DISCLOSURE) */}
        {isApi ? (
          <div className="bg-gradient-to-b from-blue-50/50 to-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-blue-200 animate-fade-in">
            <div className="pb-4 mb-6 border-b border-blue-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-700" />
                    <span>2. Requisitos Técnicos para Integración de APIs</span>
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
                    Excluyente
                  </span>
                </div>
                <p className="text-xs text-blue-800 mt-0.5">
                  El equipo de integraciones requiere validar tu e-commerce para autorizar el alta en el portal de desarrolladores.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Sitio Web - OBLIGATORIO SEGÚN JIRA */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-extrabold text-blue-950">
                    Sitio Web de la Tienda Online <span className="text-red-500">* (Obligatorio)</span>
                  </label>
                  <span className="text-[11px] text-blue-700 font-semibold">
                    Requisito para habilitación API
                  </span>
                </div>
                <div className="relative">
                  <Globe className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://mitienda.cl o www.mitienda.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border-2 rounded-xl text-xs text-gray-900 font-mono focus:outline-none transition-colors ${
                      errors.website
                        ? 'border-red-400 bg-red-50/20'
                        : formData.website && isValidUrl(formData.website)
                        ? 'border-emerald-500 bg-emerald-50/20'
                        : 'border-blue-300 focus:border-blue-600'
                    }`}
                  />
                  {formData.website && isValidUrl(formData.website) && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> URL Válida
                    </span>
                  )}
                </div>
                {errors.website ? (
                  <p className="text-[11px] font-bold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.website}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-gray-500 mt-1">
                    Ingresa el dominio donde opera tu checkout o carro de compras.
                  </p>
                )}
              </div>

              {/* Plataforma e-commerce */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Plataforma Tecnológica
                </label>
                <select
                  value={formData.ecommercePlatform}
                  onChange={(e) => handleChange('ecommercePlatform', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  {ECOMMERCE_PLATFORMS.map((plat) => (
                    <option key={plat.id} value={plat.id}>
                      {plat.name} {plat.popular ? '★' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volumen Mensual */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Volumen Mensual de Envíos Estimado
                </label>
                <select
                  value={formData.monthlyVolume}
                  onChange={(e) => handleChange('monthlyVolume', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  {MONTHLY_VOLUMES.map((vol) => (
                    <option key={vol.id} value={vol.label}>
                      {vol.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contacto Técnico */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Contacto Técnico (opcional)
                </label>
                <input
                  type="text"
                  value={formData.technicalContactName}
                  onChange={(e) => handleChange('technicalContactName', e.target.value)}
                  placeholder="Nombre desarrollador / agencia"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Email Técnico */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Correo para API Keys Sandbox
                </label>
                <input
                  type="email"
                  value={formData.technicalEmail}
                  onChange={(e) => handleChange('technicalEmail', e.target.value)}
                  placeholder="dev@mitienda.cl"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Callout cuando NO es API */
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-4 text-xs text-gray-600 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-4 h-4 text-gray-400" />
              <span>
                ¿Necesitas conectar tu tienda online con APIs más adelante? Podrás solicitarlo en cualquier momento desde tu panel.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEnrollmentType('benefits_api')}
              className="text-xs font-bold text-blue-700 hover:underline flex-shrink-0 ml-2"
            >
              Cambiar a Beneficios + API
            </button>
          </div>
        )}

        {/* SECCIÓN 3: TÉRMINOS Y ENVÍO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => handleChange('termsAccepted', e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#029E47] rounded border-gray-300 focus:ring-[#029E47]"
            />
            <span className="text-xs text-gray-600 group-hover:text-gray-900 leading-relaxed">
              Acepto los{' '}
              <a href="#" className="text-[#029E47] font-bold underline">
                Términos y Condiciones del Programa Soy Starken
              </a>{' '}
              y autorizo el tratamiento de mis datos de contacto para la gestión comercial y técnica.{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.termsAccepted && <p className="text-[11px] text-red-500 pl-7">{errors.termsAccepted}</p>}

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Modo:</span>{' '}
              {isApi ? 'Beneficios + API (Sitio web validado)' : 'Solo Beneficios Soy Starken'}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                isApi
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                  : 'bg-[#029E47] hover:bg-[#02853c] shadow-[#029E47]/25'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando Solicitud...</span>
                </>
              ) : (
                <>
                  <span>Enviar Formulario Único</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
