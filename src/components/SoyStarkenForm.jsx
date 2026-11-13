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

// Dropdown estilizado siguiendo el lineamiento de los demás inputs (#009239 en foco, bordes y tipografía consistentes)
function CustomDropdown({ value, onChange, onBlur, options, placeholder, hasError, searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll en mobile al abrir el dropdown para posicionar el input arriba (~210px) y desplegar la lista amplia abajo
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth < 1024;
      if (isMobile && containerRef.current) {
        setTimeout(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const currentY = window.pageYOffset;
          // Altura ideal: ~210px del tope (debajo de Dirección de tu negocio y con navbar de 116px)
          const desiredViewportTop = 210;
          const targetY = currentY + rect.top - desiredViewportTop;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }, 50);
      }
    }
  }, [isOpen]);

  // Click outside para cerrar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) {
          setIsOpen(false);
          setSearch('');
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onBlur]);

  const filteredOptions = searchable && search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleSelectOption = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearch('');
    if (onBlur) onBlur();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      {searchable ? (
        // Input integrado con búsqueda directa (sin input anidado adentro)
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? search : (value || '')}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => {
              setIsOpen(true);
              setSearch('');
            }}
            placeholder={placeholder}
            className={`w-full px-3.5 py-2.5 pr-10 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] placeholder:text-[#94A3B8] ${hasError
                ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f] text-[#ff4d4f] placeholder:text-[#ff4d4f]/60'
                : isOpen
                  ? 'border-[#009239] ring-2 ring-[#009239]/15 text-[#303030]'
                  : !value
                    ? 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#303030] placeholder:text-[#94A3B8]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#303030]'
              }`}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
                setSearch('');
                if (onBlur) onBlur();
              } else {
                setIsOpen(true);
                setSearch('');
                if (inputRef.current) inputRef.current.focus();
              }
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#009239] transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#009239]' : ''
                }`}
            />
          </button>
        </div>
      ) : (
        // Botón selector estándar para opciones fijas (ej. Plataformas)
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen && onBlur) onBlur();
          }}
          className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none flex items-center justify-between text-left transition-colors cursor-pointer ${hasError
              ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f] text-[#ff4d4f]'
              : isOpen
                ? 'border-[#009239] ring-2 ring-[#009239]/15 text-[#303030]'
                : !value
                  ? 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#94A3B8]'
                  : 'border-[#d9d9d9] hover:border-[#b3b3b3] text-[#303030]'
            }`}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronDown
            className={`w-4 h-4 text-[#999999] transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180 text-[#009239]' : ''
              }`}
          />
        </button>
      )}

      {isOpen && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-gray-200 shadow-2xl max-h-[340px] overflow-y-auto z-50 py-1.5 animate-fadeIn"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3.5 py-4 text-xs md:text-sm text-gray-400 font-nunito text-center">
              No se encontraron opciones
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = value === opt;
              return (
                <div
                  key={opt}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectOption(opt);
                  }}
                  className={`px-3.5 py-2.5 font-nunito text-[14px] md:text-[15px] cursor-pointer transition-colors duration-100 flex items-center justify-between ${isSelected
                      ? 'bg-[#009239]/10 text-[#009239] font-bold'
                      : 'text-[#303030] hover:bg-gray-50 hover:text-[#009239]'
                    }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#009239] flex-shrink-0" />}
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
    tieneWeb: 'si',
    paginaWeb: '',
    plataforma: '',
    otraPlataforma: '',
    correo: '',
    celular: '',
    terminos: false
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prevenir tecleo de números en nombre
  const handleNameKeyDown = (e) => {
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Prevenir tecleo de letras o caracteres especiales en celular (solo permitir 0-9 y controles)
  const handleNumericKeyDown = (e) => {
    if (
      ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key) ||
      e.ctrlKey || e.metaKey
    ) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // Form 1 Handlers
  const handleForm1Change = (field, val) => {
    let finalVal = val;
    if (field === 'nombre') {
      // No se permiten números en el campo nombre
      finalVal = val.replace(/[0-9]/g, '');
    } else if (field === 'celular') {
      // Solo numérico, sin letras ni símbolos, máximo 9 dígitos
      finalVal = val.replace(/\D/g, '').slice(0, 9);
    }
    setForm1((prev) => ({ ...prev, [field]: finalVal }));
  };

  // Form 2 Handlers
  const handleForm2Change = (field, val) => {
    let finalVal = val;
    if (field === 'rut') {
      finalVal = formatRut(val);
    } else if (field === 'celular') {
      // Solo numérico, sin letras ni símbolos, máximo 9 dígitos
      finalVal = val.replace(/\D/g, '').slice(0, 9);
    }
    // En razonSocial sí se pueden ingresar números, se mantiene sin filtro
    setForm2((prev) => ({ ...prev, [field]: finalVal }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validations for Option 1 (Solo Beneficios)
  const errors1 = {};
  const cleanNombre1 = form1.nombre.trim();
  if (!cleanNombre1) {
    errors1.nombre = 'Ingrese un nombre válido.';
  } else if (/\d/.test(cleanNombre1)) {
    errors1.nombre = 'El nombre no puede contener números.';
  } else if (cleanNombre1.length < 3) {
    errors1.nombre = 'Ingrese un nombre válido.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form1.correo.trim() || !emailRegex.test(form1.correo)) {
    errors1.correo = 'Ingrese un correo electrónico válido, siga el formato correo@mail.com';
  }

  const digits1 = form1.celular.replace(/\D/g, '');
  if (!digits1) {
    errors1.celular = 'Ingrese un número de teléfono válido.';
  } else if (digits1.length < 8) {
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
    errors2.razonSocial = 'Ingrese razón social.';
  } else if (form2.razonSocial.trim().length < 3) {
    errors2.razonSocial = 'Ingrese al menos 3 caracteres.';
  }

  if (!form2.rut.trim()) {
    errors2.rut = 'Ingrese un RUT válido.';
  } else if (!validateRut(form2.rut)) {
    errors2.rut = 'RUT inválido. Ejemplo: 12345678-9';
  }

  if (form2.tieneWeb === 'si') {
    if (!form2.paginaWeb.trim()) {
      errors2.paginaWeb = 'Ingrese una página web válida.';
    } else if (!isValidUrl(form2.paginaWeb)) {
      errors2.paginaWeb = 'Ingrese una URL válida (ej: www.ejemplo.cl).';
    }

    if (!form2.plataforma) {
      errors2.plataforma = 'Seleccione su plataforma de ecommerce.';
    } else if (form2.plataforma === 'Otra' && !form2.otraPlataforma.trim()) {
      errors2.otraPlataforma = 'Ingrese el nombre de su plataforma.';
    }
  }

  if (!form2.correo.trim() || !emailRegex.test(form2.correo)) {
    errors2.correo = 'Ingrese un correo electrónico válido, siga el formato correo@mail.com';
  }

  const digits2 = form2.celular.replace(/\D/g, '');
  if (!digits2) {
    errors2.celular = 'Ingrese un número de teléfono válido (ej: 912345678).';
  } else if (digits2.length < 8) {
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
      const touchedFields = {
        razonSocial: true,
        rut: true,
        correo: true,
        celular: true,
        terminos: true
      };
      if (form2.tieneWeb === 'si') {
        touchedFields.paginaWeb = true;
        touchedFields.plataforma = true;
        if (form2.plataforma === 'Otra') {
          touchedFields.otraPlataforma = true;
        }
      }
      setTouched(touchedFields);
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
      tieneWeb: 'si',
      paginaWeb: '',
      plataforma: '',
      otraPlataforma: '',
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
              Hemos recibido la solicitud para <strong>{form2.razonSocial}</strong>
              {form2.tieneWeb === 'si' && form2.paginaWeb ? (
                <>
                  {' '}con integración web para la tienda{' '}
                  <span className="text-[#009239] font-semibold">{form2.paginaWeb}</span>{' '}
                  ({form2.plataforma === 'Otra' ? (form2.otraPlataforma || 'Otra') : (form2.plataforma || 'E-commerce')}).
                </>
              ) : (
                ' con integración y beneficios personalizados.'
              )}{' '}
              Nuestro equipo se pondrá en contacto a la brevedad.
            </>
          ) : (
            <>
              Hemos recibido la inscripción para <strong>{form1.nombre}</strong> en el programa Soy Starken. Un ejecutivo activará tus beneficios.
            </>
          )}
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 bg-[#F97316] text-white rounded-full sm:rounded-[7px] font-bold text-sm hover:bg-[#ea580c] transition-colors cursor-pointer shadow-md"
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Nombre y apellido
              </label>
              <input
                type="text"
                value={form1.nombre}
                onKeyDown={handleNameKeyDown}
                onChange={(e) => handleForm1Change('nombre', e.target.value)}
                onBlur={() => handleBlur('nombre')}
                placeholder="Escribe tu nombre"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('nombre')
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Correo
              </label>
              <input
                type="email"
                value={form1.correo}
                onChange={(e) => handleForm1Change('correo', e.target.value)}
                onBlur={() => handleBlur('correo')}
                placeholder="correo@correo.cl"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('correo')
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Celular
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={9}
                value={form1.celular}
                onKeyDown={handleNumericKeyDown}
                onChange={(e) => handleForm1Change('celular', e.target.value)}
                onBlur={() => handleBlur('celular')}
                placeholder="Ingresa n° de teléfono"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('celular')
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Dirección de tu negocio
              </label>
              <input
                type="text"
                value={form1.direccion}
                onChange={(e) => handleForm1Change('direccion', e.target.value)}
                onBlur={() => handleBlur('direccion')}
                placeholder="Dirección del negocio"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('direccion')
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Comuna
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
              <p className="font-nunito text-[14px] text-[#505050]">Todos los campos son obligatorios</p>
            </div>
          </div>

          {/* Botón Enviar en color Naranjo #F97316 alineado a la derecha */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 px-8 bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-sm rounded-full sm:rounded-[7px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
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
            {/* 1. Razón social * */}
            <div>
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Razón social
              </label>
              <input
                type="text"
                value={form2.razonSocial}
                onChange={(e) => handleForm2Change('razonSocial', e.target.value)}
                onBlur={() => handleBlur('razonSocial')}
                placeholder="Ej: Inversiones y Servicios SpA"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('razonSocial')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                  }`}
              />
              {showError('razonSocial') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.razonSocial}</p>
              )}
            </div>

            {/* 2. Rut empresa * */}
            <div>
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Rut empresa
              </label>
              <input
                type="text"
                maxLength={12}
                value={form2.rut}
                onChange={(e) => handleForm2Change('rut', e.target.value)}
                onBlur={() => handleBlur('rut')}
                placeholder="123456789-0"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('rut')
                    ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                    : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                  }`}
              />
              {showError('rut') && (
                <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.rut}</p>
              )}
            </div>

            {/* 3. ¿Cuentas con página web o ecommerce? */}
            <div className="col-span-1 md:col-span-2 py-1">
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-2">
                ¿Cuentas con página web o ecommerce?
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleForm2Change('tieneWeb', 'si')}
                  className={`px-5 py-2 rounded-xl border text-[14px] font-nunito font-bold flex items-center gap-2.5 transition-all duration-150 cursor-pointer ${form2.tieneWeb === 'si'
                      ? 'bg-[#48185A] border-[#48185A] text-white shadow-sm'
                      : 'bg-white border-gray-200 text-[#303030] hover:border-[#48185A]/40 hover:bg-[#FAF5FC]'
                    }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full border transition-colors flex-shrink-0 ${form2.tieneWeb === 'si'
                        ? 'border-white bg-[#F97316]'
                        : 'border-gray-400 bg-white'
                      }`}
                  />
                  <span>Sí</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleForm2Change('tieneWeb', 'no')}
                  className={`px-5 py-2 rounded-xl border text-[14px] font-nunito font-bold flex items-center gap-2.5 transition-all duration-150 cursor-pointer ${form2.tieneWeb === 'no'
                      ? 'bg-[#48185A] border-[#48185A] text-white shadow-sm'
                      : 'bg-white border-gray-200 text-[#303030] hover:border-[#48185A]/40 hover:bg-[#FAF5FC]'
                    }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full border transition-colors flex-shrink-0 ${form2.tieneWeb === 'no'
                        ? 'border-white bg-[#F97316]'
                        : 'border-gray-400 bg-white'
                      }`}
                  />
                  <span>No</span>
                </button>
              </div>
            </div>

            {/* 4. Página web * y 5. Plataforma de ecommerce * (Solo se despliegan si tieneWeb === 'si') */}
            {form2.tieneWeb === 'si' && (
              <>
                <div>
                  <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                    Página web
                  </label>
                  <input
                    type="text"
                    value={form2.paginaWeb}
                    onChange={(e) => handleForm2Change('paginaWeb', e.target.value)}
                    onBlur={() => handleBlur('paginaWeb')}
                    placeholder="www.ejemplo.cl"
                    className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('paginaWeb')
                        ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                        : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                      }`}
                  />
                  {showError('paginaWeb') && (
                    <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.paginaWeb}</p>
                  )}
                </div>

                <div>
                  <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                    Plataforma de ecommerce
                  </label>
                  <CustomDropdown
                    value={form2.plataforma}
                    onChange={(val) => {
                      handleForm2Change('plataforma', val);
                      if (val !== 'Otra') {
                        handleForm2Change('otraPlataforma', '');
                      }
                    }}
                    onBlur={() => handleBlur('plataforma')}
                    options={ECOMMERCE_PLATFORMS}
                    placeholder="Selecciona tu plataforma"
                    hasError={Boolean(showError('plataforma'))}
                  />
                  {showError('plataforma') && (
                    <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.plataforma}</p>
                  )}

                  {/* Si selecciona "Otra", aparece abajo el input para especificar la plataforma */}
                  {form2.plataforma === 'Otra' && (
                    <div className="mt-3.5 animate-fadeIn">
                      <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                        Tu plataforma
                      </label>
                      <input
                        type="text"
                        value={form2.otraPlataforma}
                        onChange={(e) => handleForm2Change('otraPlataforma', e.target.value)}
                        onBlur={() => handleBlur('otraPlataforma')}
                        placeholder="Nombre de tu plataforma"
                        className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('otraPlataforma')
                            ? 'border-[#ff4d4f] shadow-[0_0_0_1px_#ff4d4f]'
                            : 'border-[#d9d9d9] hover:border-[#b3b3b3] focus:border-[#009239]'
                          }`}
                      />
                      {showError('otraPlataforma') && (
                        <p className="font-nunito text-xs text-[#ff4d4f] mt-1 font-normal">{errors2.otraPlataforma}</p>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 5. Correo * */}
            <div>
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Correo
              </label>
              <input
                type="email"
                value={form2.correo}
                onChange={(e) => handleForm2Change('correo', e.target.value)}
                onBlur={() => handleBlur('correo')}
                placeholder="ejemplo@starken.cl"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('correo')
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
              <label className="block font-nunito text-[16px] md:text-[14px] font-semibold text-[#303030] mb-1.5">
                Celular
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={9}
                value={form2.celular}
                onKeyDown={handleNumericKeyDown}
                onChange={(e) => handleForm2Change('celular', e.target.value)}
                onBlur={() => handleBlur('celular')}
                placeholder="912345678"
                className={`w-full px-3.5 py-2.5 rounded-lg font-nunito text-[14px] md:text-[16px] bg-white border outline-none transition-colors text-[#303030] placeholder:text-[#94A3B8] placeholder:font-nunito placeholder:text-[14px] md:placeholder:text-[16px] ${showError('celular')
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
                <span className="font-nunito text-[14px] text-[#303030] leading-relaxed">
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
              <p className="font-nunito text-[14px] text-[#505050]">Todos los campos son obligatorios</p>
            </div>
          </div>

          {/* Botón Enviar en color Naranjo #F97316 alineado a la derecha */}
          <div className="pt-10 sm:pt-11 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-56 py-3.5 px-8 bg-[#F97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-sm rounded-full sm:rounded-[7px] shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer text-center"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
