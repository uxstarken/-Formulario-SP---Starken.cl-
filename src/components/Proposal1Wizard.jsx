import React, { useState } from 'react';
import {
  Sparkles,
  Code2,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Globe,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ALL_COMMUNES, ECOMMERCE_PLATFORMS, MONTHLY_VOLUMES } from '../data/communes';
import { formatRut, validateRut, isValidUrl } from '../utils/rutValidator';

export default function Proposal1Wizard({ onSubmitSuccess }) {
  // Wizard state: 1 = Selector, 2 = Contacto & Negocio, 3 = Datos Técnicos (solo API), 4 = Resumen y Confirmación
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    enrollmentType: 'benefits_only', // 'benefits_only' (Flujo A) | 'benefits_api' (Flujo B)
    personType: 'natural', // 'natural' | 'juridica'
    rut: '',
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    address: '',
    commune: 'Santiago',
    // Campos API (Flujo B)
    website: '',
    ecommercePlatform: 'shopify',
    monthlyVolume: '50 a 200 envíos al mes',
    technicalContactName: '',
    technicalEmail: '',
    hasTechnicalTeam: 'yes',
    // Checkboxes
    termsAccepted: false,
    marketingAccepted: false
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  const isApi = formData.enrollmentType === 'benefits_api';
  const totalSteps = isApi ? 4 : 3;

  // Handle field change
  const handleChange = (field, value) => {
    let processedValue = value;
    if (field === 'rut') {
      processedValue = formatRut(value);
    }
    setFormData((prev) => ({ ...prev, [field]: processedValue }));

    // Clean error
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validate current step before advancing
  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      if (!formData.enrollmentType) {
        errs.enrollmentType = 'Por favor selecciona una opción de inscripción.';
      }
    } else if (step === 2) {
      if (!formData.fullName.trim()) errs.fullName = 'El nombre completo es obligatorio.';
      if (!formData.email.trim()) {
        errs.email = 'El correo electrónico es obligatorio.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Ingresa un correo electrónico válido.';
      }

      if (!formData.phone.trim()) {
        errs.phone = 'El teléfono de contacto es obligatorio.';
      } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
        errs.phone = 'Ingresa un número telefónico válido (ej: 9 1234 5678).';
      }

      if (formData.rut && !validateRut(formData.rut)) {
        errs.rut = 'El RUT ingresado no es válido (ej: 12.345.678-9).';
      }

      if (!formData.businessName.trim()) {
        errs.businessName = 'El nombre del negocio o emprendimiento es obligatorio.';
      }

      if (!formData.address.trim()) {
        errs.address = 'La dirección comercial o de retiro es obligatoria.';
      }

      if (!formData.commune) {
        errs.commune = 'Selecciona una comuna válida.';
      }
    } else if (step === 3 && isApi) {
      // Step 3 is only for API flow
      if (!formData.website.trim()) {
        errs.website = 'El sitio web es obligatorio para solicitudes de integración API.';
      } else if (!isValidUrl(formData.website)) {
        errs.website = 'Ingresa un sitio web válido (ej: mitienda.cl o https://mitienda.com).';
      }

      if (formData.technicalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.technicalEmail)) {
        errs.technicalEmail = 'El correo del contacto técnico debe tener un formato válido.';
      }
    } else if ((step === 3 && !isApi) || (step === 4 && isApi)) {
      // Final confirmation step
      if (!formData.termsAccepted) {
        errs.termsAccepted = 'Debes aceptar los términos y condiciones del programa para continuar.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 900);
  };

  // Steps configuration for Stepper Header
  const stepsList = isApi
    ? [
        { num: 1, label: 'Tipo de Inscripción' },
        { num: 2, label: 'Datos de Negocio' },
        { num: 3, label: 'Integración Técnica' },
        { num: 4, label: 'Resumen y Envío' }
      ]
    : [
        { num: 1, label: 'Tipo de Inscripción' },
        { num: 2, label: 'Datos de Negocio' },
        { num: 3, label: 'Resumen y Envío' }
      ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-['Nunito',sans-serif]">
      {/* Header de la Propuesta 1 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#029E47] mb-2">
          <span>Propuesta 1 · Arquitectura Asistida (Paso a Paso)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Inscripción al Programa Soy Starken & APIs
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mt-1">
          Un solo punto de entrada para personas, comercios y empresas que desean tarifas preferenciales o automatización técnica de envíos.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between relative">
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-100 z-0 mx-6 sm:mx-12" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#029E47] z-0 transition-all duration-300 mx-6 sm:mx-12"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
            }}
          />

          {stepsList.map((st) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={st.num > currentStep}
                  onClick={() => {
                    if (st.num < currentStep) setCurrentStep(st.num);
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#029E47] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-white border-2 border-[#029E47] text-[#029E47] shadow-md ring-4 ring-emerald-50'
                      : 'bg-white border border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-white" /> : st.num}
                </button>
                <span
                  className={`text-[11px] sm:text-xs mt-2 font-medium text-center hidden sm:block ${
                    isCurrent ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 sm:p-10 transition-all">
        {/* ========================================================= */}
        {/* PASO 1: SELECCIÓN DE TIPO DE INSCRIPCIÓN (BIFURCACIÓN)    */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                Paso 1: ¿Qué tipo de incorporación necesitas?
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Selecciona la opción que mejor represente a tu negocio. El formulario se adaptará para pedirte solo lo necesario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Opción A: Solo Beneficios */}
              <div
                onClick={() => handleChange('enrollmentType', 'benefits_only')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  formData.enrollmentType === 'benefits_only'
                    ? 'border-[#029E47] bg-emerald-50/30 shadow-md ring-2 ring-emerald-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#029E47] flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800">
                      Sin requisitos técnicos
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Programa de Beneficios Soy Starken
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mb-3">
                    Para personas, emprendimientos y pymes que despachan por sucursales o Starken.cl
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Accede a tarifas preferenciales, descuentos de hasta 20% y beneficios comerciales sin necesidad de tener sitio web ni realizar integraciones.
                  </p>

                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#029E47]" />
                      <span>Descuentos inmediatos dictando tu RUT</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#029E47]" />
                      <span>Atención personalizada y promociones mensuales</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#029E47]" />
                      <span>No requiere sitio web ni conocimientos técnicos</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">
                    {formData.enrollmentType === 'benefits_only' ? 'Opción Seleccionada' : 'Seleccionar esta opción'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.enrollmentType === 'benefits_only'
                        ? 'border-[#029E47] bg-[#029E47]'
                        : 'border-gray-300'
                    }`}
                  >
                    {formData.enrollmentType === 'benefits_only' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>

              {/* Opción B: Beneficios + Integración API */}
              <div
                onClick={() => handleChange('enrollmentType', 'benefits_api')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  formData.enrollmentType === 'benefits_api'
                    ? 'border-blue-600 bg-blue-50/30 shadow-md ring-2 ring-blue-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-800">
                      Requiere Sitio Web Activo
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Beneficios + Integración API
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mb-3">
                    Para comercios con e-commerce que quieren automatizar sus envíos
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Conecta tu tienda online (Shopify, WooCommerce, VTEX o API REST) con Starken. Cotización en checkout, generación automática de etiquetas y tarifas preferenciales.
                  </p>

                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Todos los beneficios de Soy Starken incluidos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>API Keys para cotización y emisión masiva</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold text-amber-900">Sitio Web obligatorio para homologación</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">
                    {formData.enrollmentType === 'benefits_api' ? 'Opción Seleccionada' : 'Seleccionar esta opción'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.enrollmentType === 'benefits_api'
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {formData.enrollmentType === 'benefits_api' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PASO 2: DATOS DE CONTACTO Y NEGOCIO (CAMPOS BASE)         */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Paso 2: Datos del Titular y Negocio
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Información para asociar los beneficios de Starken a tu cuenta comercial.
              </p>
            </div>

            {/* Toggle Tipo de Persona */}
            <div className="flex items-center gap-4 p-1.5 bg-gray-100 rounded-xl max-w-sm">
              <button
                type="button"
                onClick={() => handleChange('personType', 'natural')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  formData.personType === 'natural'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Persona Natural
              </button>
              <button
                type="button"
                onClick={() => handleChange('personType', 'juridica')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  formData.personType === 'juridica'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Empresa con RUT
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre y Apellido */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Nombre Completo del Solicitante <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Ej: Juan Pérez Morales"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* RUT */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  RUT del Titular o Empresa (opcional para persona)
                </label>
                <input
                  type="text"
                  value={formData.rut}
                  onChange={(e) => handleChange('rut', e.target.value)}
                  placeholder="Ej: 12.345.678-9"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors font-mono ${
                    errors.rut ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                  }`}
                />
                {errors.rut && <p className="text-[11px] text-red-500 mt-1">{errors.rut}</p>}
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Correo Electrónico Comercial <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contacto@tunegocio.cl"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Celular */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Teléfono Celular <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 flex items-center gap-1">
                    <span>+56</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="9 8765 4321"
                    className={`w-full pl-14 pr-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Nombre del Negocio */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Nombre de Fantasía o Razón Social <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Ej: Tienda Modas Chic / Comercial Stark SpA"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors ${
                      errors.businessName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                    }`}
                  />
                </div>
                {errors.businessName && <p className="text-[11px] text-red-500 mt-1">{errors.businessName}</p>}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Dirección del Negocio o Retiro <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Calle, número, oficina/depto"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none transition-colors ${
                      errors.address ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#029E47]'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              {/* Comuna */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Comuna <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.commune}
                  onChange={(e) => handleChange('commune', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#029E47]"
                >
                  {ALL_COMMUNES.map((comm) => (
                    <option key={comm} value={comm}>
                      {comm}
                    </option>
                  ))}
                </select>
                {errors.commune && <p className="text-[11px] text-red-500 mt-1">{errors.commune}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PASO 3 (SOLO API): DATOS TÉCNICOS Y SITIO WEB OBLIGATORIO */}
        {/* ========================================================= */}
        {currentStep === 3 && isApi && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
              <Code2 className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-blue-950">
                  Requisitos de Factibilidad Técnica para APIs Starken
                </h3>
                <p className="text-[11px] text-blue-800 mt-0.5">
                  La integración vía API requiere que tu tienda disponga de un <strong>sitio web activo</strong> para poder emitir credenciales de Sandbox y producción.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Sitio Web - CAMPO OBLIGATORIO EXCLUYENTE */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-900 mb-1">
                  Sitio Web de la Tienda / E-commerce <span className="text-red-500 font-extrabold">* (Obligatorio para API)</span>
                </label>
                <p className="text-[11px] text-gray-500 mb-1.5">
                  Dirección URL pública donde se conectará la pasarela o cotizador de Starken.
                </p>
                <div className="relative">
                  <Globe className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder="https://mitienda.cl o www.mitienda.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border-2 rounded-xl text-xs text-gray-900 font-mono focus:outline-none transition-colors ${
                      errors.website
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : formData.website && isValidUrl(formData.website)
                        ? 'border-emerald-500 focus:border-emerald-600 bg-emerald-50/10'
                        : 'border-blue-200 focus:border-blue-600'
                    }`}
                  />
                  {formData.website && isValidUrl(formData.website) && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                {errors.website && (
                  <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.website}</span>
                  </p>
                )}
              </div>

              {/* Plataforma e-commerce */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Plataforma de E-commerce
                </label>
                <select
                  value={formData.ecommercePlatform}
                  onChange={(e) => handleChange('ecommercePlatform', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  {ECOMMERCE_PLATFORMS.map((plat) => (
                    <option key={plat.id} value={plat.id}>
                      {plat.name} {plat.popular ? '★' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Volumen Mensual de Envíos */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Volumen Mensual Estimado
                </label>
                <select
                  value={formData.monthlyVolume}
                  onChange={(e) => handleChange('monthlyVolume', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                >
                  {MONTHLY_VOLUMES.map((vol) => (
                    <option key={vol.id} value={vol.label}>
                      {vol.label} ({vol.desc})
                    </option>
                  ))}
                </select>
              </div>

              {/* Contacto Técnico (Nombre) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Nombre de Contraparte Técnica o Desarrollador (opcional)
                </label>
                <input
                  type="text"
                  value={formData.technicalContactName}
                  onChange={(e) => handleChange('technicalContactName', e.target.value)}
                  placeholder="Ej: Rodrigo Tapia (Lead Dev / Agencia)"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Contacto Técnico (Email) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Correo para Credenciales API Sandbox
                </label>
                <input
                  type="email"
                  value={formData.technicalEmail}
                  onChange={(e) => handleChange('technicalEmail', e.target.value)}
                  placeholder="dev@mitienda.cl (si difiere del comercial)"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs text-gray-900 focus:outline-none focus:border-blue-600 ${
                    errors.technicalEmail ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.technicalEmail && <p className="text-[11px] text-red-500 mt-1">{errors.technicalEmail}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PASO FINAL: RESUMEN, TÉRMINOS Y CONFIRMACIÓN              */}
        {/* ========================================================= */}
        {((currentStep === 3 && !isApi) || (currentStep === 4 && isApi)) && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Resumen de Inscripción y Validación
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Por favor revisa la información ingresada antes de enviar tu solicitud.
              </p>
            </div>

            {/* Resumen Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px]">Modalidad</span>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs ${
                    isApi ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isApi ? 'Beneficios + Integración API' : 'Programa de Beneficios Soy Starken'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div>
                  <span className="text-gray-400 font-semibold block">Solicitante:</span>
                  <span className="font-bold text-gray-900 text-sm">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Negocio / Razón Social:</span>
                  <span className="font-bold text-gray-900 text-sm">{formData.businessName}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Correo:</span>
                  <span className="font-bold text-gray-800">{formData.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Teléfono:</span>
                  <span className="font-bold text-gray-800">+56 {formData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Comuna:</span>
                  <span className="font-bold text-gray-800">{formData.commune}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">RUT:</span>
                  <span className="font-bold text-gray-800 font-mono">{formData.rut || 'No informado'}</span>
                </div>

                {isApi && (
                  <>
                    <div className="sm:col-span-2 pt-2 border-t border-gray-200">
                      <span className="text-blue-700 font-bold block">Sitio Web Validado:</span>
                      <span className="font-bold text-gray-900 font-mono text-sm">{formData.website}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block">Plataforma:</span>
                      <span className="font-bold text-gray-800 capitalize">{formData.ecommercePlatform}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block">Volumen Estimado:</span>
                      <span className="font-bold text-gray-800">{formData.monthlyVolume}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Checkboxes de Términos */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#029E47] rounded border-gray-300 focus:ring-[#029E47]"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 leading-relaxed">
                  Declaro que los datos ingresados son fidedignos y acepto los{' '}
                  <a href="#" className="text-[#029E47] font-bold underline">
                    Términos y Condiciones del Programa Soy Starken
                  </a>{' '}
                  y las políticas de tratamiento de datos personales. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.termsAccepted && <p className="text-[11px] text-red-500 pl-7">{errors.termsAccepted}</p>}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.marketingAccepted}
                  onChange={(e) => handleChange('marketingAccepted', e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#029E47] rounded border-gray-300 focus:ring-[#029E47]"
                />
                <span className="text-xs text-gray-500 group-hover:text-gray-700 leading-relaxed">
                  Deseo recibir promociones exclusivas, invitaciones a talleres para emprendedores y novedades logísticas de Starken.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* NAVEGACIÓN INFERIOR (ATRÁS / CONTINUAR / ENVIAR)          */}
        {/* ========================================================= */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-[#029E47] hover:bg-[#02853c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-xl bg-[#029E47] hover:bg-[#02853c] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Procesando Solicitud...</span>
                </>
              ) : (
                <>
                  <span>Completar Inscripción</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
