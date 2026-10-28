import React, { useState, useRef, useEffect } from 'react';
import { ALL_COMMUNES } from '../data/communes';
import { validateRut, formatRut, isValidUrl } from '../utils/rutValidator';
import { CheckCircle2, ChevronDown, Check } from 'lucide-react';

const ECOMMERCE_PLATFORMS = [
  'Shopify',
  'WooCommerce',
  'Bsale',
  'Jumpseller',
  'Prestashop',
  'Magento',
  'Vtex',
  'WordPress',
  'Otra'
];

// Dropdown estilizado con línea selectora en tono morado suave (#FAF5FC / #F3E8F7)
function CustomDropdown({ value, onChange, onBlur, options, placeholder, hasError, searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) {
          setIsOpen(false);
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  const filteredOptions = searchable && search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-30' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen && onBlur) onBlur();
        }}
        className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none flex items-center justify-between text-left transition-colors cursor-pointer ${
          hasError
            ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f] text-[#ff4d4f]'
            : isOpen
            ? 'border-[#48185A] ring-2 ring-[#48185A]/15'
            : !value
            ? 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#757575]'
            : 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#333333]'
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#999999] transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-[#48185A]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-[#48185A]/20 shadow-xl max-h-60 overflow-y-auto z-50 py-1.5 animate-fadeIn">
          {searchable && (
            <div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar comuna..."
                className="w-full px-3 py-1.5 text-xs font-nunito rounded-lg border border-gray-200 outline-none focus:border-[#48185A]"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="px-3.5 py-3 text-xs text-gray-400 font-nunito text-center">
              No se encontraron opciones
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = value === opt;
              return (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`px-3.5 py-2.5 font-nunito text-[14px] cursor-pointer transition-colors duration-100 flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#F3E8F7] text-[#48185A] font-bold'
                      : 'text-[#333333] hover:bg-[#FAF5FC] hover:text-[#48185A]'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#48185A] flex-shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function SoyStarkenForm({ optionType = 'benefits', onSubmitted }) {
  const isApi = optionType === 'api';

  // Option 1 state (Solo Beneficios)
  const [form1, setForm1] = useState({
    nombre: '',
    correo: '',
    celular: '',
    direccion: '',
    comuna: ''
  });

  // Option 2 state (Beneficios + Integración API)
  const [form2, setForm2] = useState({
    razonSocial: '',
    rut: '',
    paginaWeb: '',
    plataforma: '',
    correo: '',
    celular: '',
    terminos: false
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form 1 Handlers
  const handleForm1Change = (field, val) => {
    setForm1((prev) => ({ ...prev, [field]: val }));
  };

  // Form 2 Handlers
  const handleForm2Change = (field, val) => {
    let finalVal = val;
    if (field === 'rut') {
      finalVal = formatRut(val);
    }
    setForm2((prev) => ({ ...prev, [field]: finalVal }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validations for Option 1 (Solo Beneficios)
  const errors1 = {};
  if (!form1.nombre.trim()) {
    errors1.nombre = 'Ingrese un nombre válido.';
  } else if (form1.nombre.trim().length < 3) {
    errors1.nombre = 'Ingrese un nombre válido.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form1.correo.trim() || !emailRegex.test(form1.correo)) {
    errors1.correo = 'Ingrese un correo electrónico válido, siga el formato correo@mail.com';
  }

  const digits1 = form1.celular.replace(/\D/g, '');
  if (!digits1 || digits1.length < 8) {
    errors1.celular = 'Ingrese un número de teléfono válido.';
  }

  if (!form1.direccion.trim()) {
    errors1.direccion = 'Ingrese una dirección.';
  }

  if (!form1.comuna) {
    errors1.comuna = 'Seleccione una comuna válida.';
  }

  // Validations for Option 2 (Beneficios + Integración API)
  const errors2 = {};
  if (!form2.razonSocial.trim()) {
    errors2.razonSocial = 'Ingrese nombre o razón social.';
  } else if (form2.razonSocial.trim().length < 3) {
    errors2.razonSocial = 'Ingrese al menos 3 caracteres.';
  }

  if (!form2.rut.trim()) {
    errors2.rut = 'Ingrese un RUT válido.';
  } else if (!validateRut(form2.rut)) {
    errors2.rut = 'RUT inválido. Ejemplo: 12345678-9';
  }

  if (!form2.paginaWeb.trim()) {
    errors2.paginaWeb = 'Ingrese una página web válida.';
  } else if (!isValidUrl(form2.paginaWeb)) {
    errors2.paginaWeb = 'Ingrese una URL válida (ej: www.ejemplo.cl).';
  }

  if (!form2.plataforma) {
    errors2.plataforma = 'Seleccione su plataforma de ecommerce.';
  }

  if (!form2.correo.trim() || !emailRegex.test(form2.correo)) {
    errors2.correo = 'Ingrese un correo electrónico válido, siga el formato correo@mail.com';
  }

  const digits2 = form2.celular.replace(/\D/g, '');
  if (!digits2 || digits2.length < 8) {
    errors2.celular = 'Ingrese un número de teléfono válido (ej: 912345678).';
  }

  if (!form2.terminos) {
    errors2.terminos = 'Debe aceptar los términos de uso y la política de privacidad.';
  }

  const activeErrors = isApi ? errors2 : errors1;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isApi) {
      setTouched({
        razonSocial: true,
        rut: true,
        paginaWeb: true,
        plataforma: true,
        correo: true,
        celular: true,
        terminos: true
      });
    } else {
      setTouched({
        nombre: true,
        correo: true,
        celular: true,
        direccion: true,
        comuna: true
      });
    }

    if (Object.keys(activeErrors).length === 0) {
      setSuccess(true);
      if (onSubmitted) {
        onSubmitted(isApi ? { ...form2, optionType } : { ...form1, optionType });
      }
    }
  };

  const handleReset = () => {
    setForm1({
      nombre: '',
      correo: '',
      celular: '',
      direccion: '',
      comuna: ''
    });
    setForm2({
      razonSocial: '',
      rut: '',
      paginaWeb: '',
      plataforma: '',
      correo: '',
      celular: '',
      terminos: false
    });
    setTouched({});
    setSubmitted(false);
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="py-8 px-6 text-center bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in max-w-lg mx-auto">
        <div className="w-16 h-16 bg-emerald-50 text-[#009239] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Formulario Enviado con Éxito!</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {isApi ? (
            <>
              Hemos recibido la solicitud para <strong>{form2.razonSocial}</strong> con integración API para la tienda{' '}
              <span className="text-[#009239] font-semibold">{form2.paginaWeb}</span> ({form2.plataforma}). Nuestro equipo técnico se pondrá en contacto a la brevedad.
            </>
          ) : (
            <>
              Hemos recibido la inscripción para <strong>{form1.nombre}</strong> en el programa Soy Starken. Un ejecutivo activará tus beneficios.
            </>
          )}
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 bg-[#F97316] text-white rounded-lg font-bold text-sm hover:bg-[#ea580c] transition-colors cursor-pointer shadow-md"
        >
          Llenar otro registro
        </button>
      </div>
    );
  }

  const showError = (field) => (submitted || touched[field]) && activeErrors[field];

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {/* ============================================================== */}
      {/* CASO 1: SOLO BENEFICIOS SOY STARKEN (Campos según Imagen 1) */}
      {/* ============================================================== */}
      {!isApi && (
        <div className="flex flex-col justify-between min-h-[390px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3.5">
            {/* 1. Nombre y apellido */}
            <div>
              <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
                <span className="text-[#ff4d4f] font-bold mr-1">*</span> Nombre y apellido
              </label>
              <input
                type="text"
                value={form1.nombre}
                onChange={(e) => handleForm1Change('nombre', e.target.value)}
                onBlur={() => handleBlur('nombre')}
                placeholder="Escribe tu nombre"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                  showError('nombre')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                }`}
              />
              {showError('nombre') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors1.nombre}</p>
              )}
            </div>

            {/* 2. Correo */}
            <div>
              <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
                <span className="text-[#ff4d4f] font-bold mr-1">*</span> Correo
              </label>
              <input
                type="email"
                value={form1.correo}
                onChange={(e) => handleForm1Change('correo', e.target.value)}
                onBlur={() => handleBlur('correo')}
                placeholder="correo@correo.cl"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                  showError('correo')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                }`}
              />
              {showError('correo') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors1.correo}</p>
              )}
            </div>

            {/* 3. Celular */}
            <div>
              <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
                <span className="text-[#ff4d4f] font-bold mr-1">*</span> Celular
              </label>
              <input
                type="tel"
                maxLength={9}
                value={form1.celular}
                onChange={(e) => handleForm1Change('celular', e.target.value)}
                onBlur={() => handleBlur('celular')}
                placeholder="Ingresa n° de teléfono"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                  showError('celular')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                }`}
              />
              {showError('celular') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors1.celular}</p>
              )}
            </div>

            {/* 4. Dirección de tu negocio */}
            <div>
              <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
                <span className="text-[#ff4d4f] font-bold mr-1">*</span> Dirección de tu negocio
              </label>
              <input
                type="text"
                value={form1.direccion}
                onChange={(e) => handleForm1Change('direccion', e.target.value)}
                onBlur={() => handleBlur('direccion')}
                placeholder="Dirección del negocio"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                  showError('direccion')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                }`}
              />
              {showError('direccion') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors1.direccion}</p>
              )}
            </div>

            {/* 5. Comuna */}
            <div className="md:col-span-2">
              <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
                <span className="text-[#ff4d4f] font-bold mr-1">*</span> Comuna
              </label>
              <CustomDropdown
                value={form1.comuna}
                onChange={(val) => handleForm1Change('comuna', val)}
                onBlur={() => handleBlur('comuna')}
                options={ALL_COMMUNES}
                placeholder="Selecciona una comuna"
                hasError={Boolean(showError('comuna'))}
                searchable={true}
              />
              {showError('comuna') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors1.comuna}</p>
              )}
            </div>

            {/* Nota de campo obligatorio (pegado a Comuna en Opción 1, baja en Opción 2 con el checkbox) */}
            <div className="col-span-1 md:col-span-2 pt-0.5">
              <p className="font-nunito text-[14px] text-[#666666]">(*) Campo obligatorio</p>
            </div>
          </div>

          {/* Botón Enviar en color Naranjo #F97316 alineado a la derecha */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 px-8 bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CASO 2: BENEFICIOS + INTEGRACIÓN API (Mismo diseño que Opción 1, solo cambia el contenido) */}
      {/* ============================================================== */}
      {isApi && (
        <div className="flex flex-col justify-between min-h-[390px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3.5">
          {/* 1. Nombre o razón social * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> Nombre o razón social
            </label>
            <input
              type="text"
              value={form2.razonSocial}
              onChange={(e) => handleForm2Change('razonSocial', e.target.value)}
              onBlur={() => handleBlur('razonSocial')}
              placeholder="nombre y apellido"
              className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                showError('razonSocial')
                  ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
              }`}
            />
            {showError('razonSocial') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.razonSocial}</p>
            )}
          </div>

          {/* 2. RUT * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> RUT
            </label>
            <input
              type="text"
              maxLength={12}
              value={form2.rut}
              onChange={(e) => handleForm2Change('rut', e.target.value)}
              onBlur={() => handleBlur('rut')}
              placeholder="123456789-0"
              className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                showError('rut')
                  ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
              }`}
            />
            {showError('rut') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.rut}</p>
            )}
          </div>

          {/* 3. Página web * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> Página web
            </label>
            <input
              type="text"
              value={form2.paginaWeb}
              onChange={(e) => handleForm2Change('paginaWeb', e.target.value)}
              onBlur={() => handleBlur('paginaWeb')}
              placeholder="www.ejemplo.cl"
              className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                showError('paginaWeb')
                  ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
              }`}
            />
            {showError('paginaWeb') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.paginaWeb}</p>
            )}
          </div>

          {/* 4. Plataforma de ecommerce * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> Plataforma de ecommerce
            </label>
            <CustomDropdown
              value={form2.plataforma}
              onChange={(val) => handleForm2Change('plataforma', val)}
              onBlur={() => handleBlur('plataforma')}
              options={ECOMMERCE_PLATFORMS}
              placeholder="Selecciona tu plataforma"
              hasError={Boolean(showError('plataforma'))}
            />
            {showError('plataforma') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.plataforma}</p>
            )}
          </div>

          {/* 5. Correo * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> Correo
            </label>
            <input
              type="email"
              value={form2.correo}
              onChange={(e) => handleForm2Change('correo', e.target.value)}
              onBlur={() => handleBlur('correo')}
              placeholder="ejemplo@starken.cl"
              className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                showError('correo')
                  ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
              }`}
            />
            {showError('correo') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.correo}</p>
            )}
          </div>

          {/* 6. Celular * */}
          <div>
            <label className="block font-nunito text-[16px] font-semibold text-[#333333] mb-1.5">
              <span className="text-[#ff4d4f] font-bold mr-1">*</span> Celular
            </label>
            <input
              type="tel"
              maxLength={9}
              value={form2.celular}
              onChange={(e) => handleForm2Change('celular', e.target.value)}
              onBlur={() => handleBlur('celular')}
              placeholder="912345678"
              className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] bg-white border outline-none transition-colors placeholder:font-nunito placeholder:text-[14px] ${
                showError('celular')
                  ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
              }`}
            />
            {showError('celular') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.celular}</p>
            )}
          </div>

          {/* 7. Checkbox Términos y Condiciones */}
          <div className="col-span-1 md:col-span-2 pt-1.5">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form2.terminos}
                onChange={(e) => handleForm2Change('terminos', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#009239] border-gray-300 focus:ring-[#009239] cursor-pointer"
              />
              <span className="font-nunito text-[14px] text-[#2b2e2c] leading-relaxed">
                He leído y acepto los{' '}
                <a
                  href="#terminos"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#6941C6] font-semibold underline hover:text-[#53389E]"
                >
                  términos de uso y la política de privacidad.
                </a>
              </span>
            </label>
            {showError('terminos') && (
              <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.terminos}</p>
            )}
          </div>

            {/* Nota de campo obligatorio */}
            <div className="col-span-1 md:col-span-2 pt-0.5">
              <p className="font-nunito text-[14px] text-[#666666]">(*) Campo obligatorio</p>
            </div>
          </div>

          {/* Botón Enviar en color Naranjo #F97316 alineado a la derecha */}
          <div className="pt-10 sm:pt-11 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 px-8 bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
