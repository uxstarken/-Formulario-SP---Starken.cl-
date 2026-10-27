export const CHILE_REGIONS_AND_COMMUNES = [
  {
    region: "Región Metropolitana de Santiago",
    communes: [
      "Santiago", "Providencia", "Las Condes", "Ñuñoa", "Vitacura", "Lo Barnechea",
      "La Florida", "Maipú", "Puente Alto", "San Miguel", "Peñalolén", "Macul",
      "La Reina", "Estación Central", "Quinta Normal", "Independencia", "Recoleta",
      "Huechuraba", "Quilicura", "Pudahuel", "Cerro Navia", "Renca", "Conchalí",
      "San Joaquín", "La Granja", "La Pintana", "San Ramón", "La Cisterna",
      "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Cerrillos", "San Bernardo",
      "Calera de Tango", "Buin", "Paine", "Melipilla", "Talagante", "Peñaflor",
      "Isla de Maipo", "El Monte", "Padre Hurtado", "Colina", "Lampa", "Tiltil"
    ]
  },
  {
    region: "Región de Valparaíso",
    communes: [
      "Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota",
      "La Calera", "San Antonio", "Cartagena", "El Quisco", "Algarrobo", "Los Andes",
      "San Felipe", "Limache", "Olmué", "Casablanca"
    ]
  },
  {
    region: "Región del Biobío",
    communes: [
      "Concepción", "San Pedro de la Paz", "Talcahuano", "Chiguayante", "Hualpén",
      "Coronel", "Lota", "Los Ángeles", "Tomé", "Penco", "Arauco", "Curanilahue"
    ]
  },
  {
    region: "Región de Antofagasta",
    communes: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"]
  },
  {
    region: "Región de Coquimbo",
    communes: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña", "Salamanca"]
  },
  {
    region: "Región de La Araucanía",
    communes: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Lautaro"]
  },
  {
    region: "Región de Los Lagos",
    communes: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Frutillar"]
  },
  {
    region: "Región del Maule",
    communes: ["Talca", "Curicó", "Linares", "Constitución", "Molina", "San Javier"]
  },
  {
    region: "Región de O'Higgins",
    communes: ["Rancagua", "Machalí", "San Fernando", "Rengo", "Pichilemu", "Santa Cruz"]
  }
];

export const ALL_COMMUNES = CHILE_REGIONS_AND_COMMUNES.flatMap(r => r.communes).sort();

export const ECOMMERCE_PLATFORMS = [
  { id: "shopify", name: "Shopify", popular: true },
  { id: "woocommerce", name: "WooCommerce (WordPress)", popular: true },
  { id: "vtex", name: "VTEX", popular: true },
  { id: "jumpseller", name: "Jumpseller", popular: true },
  { id: "prestashop", name: "PrestaShop", popular: false },
  { id: "magento", name: "Magento / Adobe Commerce", popular: false },
  { id: "tiendanube", name: "Tiendanube", popular: false },
  { id: "mercadolibre", name: "Mercado Libre / Mercado Shops", popular: false },
  { id: "custom", name: "Desarrollo Propio / API REST Directa", popular: true },
  { id: "other", name: "Otra plataforma", popular: false }
];

export const MONTHLY_VOLUMES = [
  { id: "vol_1", label: "Menos de 50 envíos al mes", desc: "Emprendimientos iniciales" },
  { id: "vol_2", label: "50 a 200 envíos al mes", desc: "Negocios en crecimiento" },
  { id: "vol_3", label: "201 a 1.000 envíos al mes", desc: "E-commerce consolidado" },
  { id: "vol_4", label: "Más de 1.000 envíos al mes", desc: "Alto volumen corporativo" }
];
