import type { Product } from "@/lib/types";
import type { Locale } from "./config";

type ProductTranslation = {
  name: string;
  short: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  shellType?: string;
  shellMaterial?: string;
  openingStyle?: string;
  sleepingCapacity?: string;
  weightDisplay?: string;
  features: Array<{ title: string; description: string }>;
  included: string[];
};

const es: Record<string, ProductTranslation> = {
  "solar-powered-pop-up-rooftop-tent": {
    name: "TopTent™ Tienda de Techo Pop-Up Solar",
    short: "Tienda de techo rígida de aluminio para dos personas con paneles solares integrados, power box y conexiones USB/USB-C.",
    description: "Una tienda de techo rígida de aluminio para dos personas con apertura pop-up, paneles solares integrados, power box, soportes con amortiguadores de gas, escalera telescópica de aluminio e iluminación LED interior.",
    seoTitle: "Tienda de Techo Pop-Up Solar TopTent",
    seoDescription: "Tienda de techo rígida de aluminio para dos personas con paneles solares integrados, power box y salidas USB/USB-C.",
    shellType: "Carcasa rígida",
    shellMaterial: "Aluminio",
    openingStyle: "Pop-up",
    sleepingCapacity: "2 personas",
    weightDisplay: "61 kg netos / 73 kg brutos",
    features: [
      { title: "Solar integrado", description: "Paneles solares integrados, power box y conexiones USB/USB-C. La potencia de los paneles todavía no está publicada." },
      { title: "Tejidos resistentes a la intemperie", description: "Sobretoldo de polyoxford rip-stop 420D con impermeabilidad de 2500 mm y cuerpo de lona policotón rip-stop de 280 g con impermeabilidad de 2000 mm." },
    ],
    included: ["Tienda de techo", "Colchón de espuma", "Paneles solares integrados y power box", "Barras de soporte con amortiguadores de gas de acero inoxidable 304", "Escalera telescópica de aluminio", "Bolsa para herramientas", "Luces LED interiores integradas"],
  },
  "pop-up-aluminum-rooftop-tent": {
    name: "TopTent™ Tienda de Techo Pop-Up de Aluminio",
    short: "Tienda de techo rígida de aluminio para dos personas con escalera telescópica e iluminación LED interior.",
    description: "Una tienda de techo rígida de aluminio para dos personas, con tejido resistente a la intemperie, soportes de gas de acero inoxidable, escalera telescópica de aluminio, bolsa de almacenamiento e iluminación LED interior.",
    seoTitle: "Tienda de Techo Pop-Up de Aluminio TopTent",
    seoDescription: "Tienda de techo rígida de aluminio para dos personas, 22 cm de altura cerrada, escalera e iluminación LED interior.",
    shellType: "Carcasa rígida",
    shellMaterial: "Aluminio",
    openingStyle: "Pop-up",
    sleepingCapacity: "2 personas",
    weightDisplay: "61 kg netos / 73 kg brutos",
    features: [
      { title: "Carcasa rígida de aluminio", description: "Construcción rígida de aluminio con soportes de gas de acero inoxidable." },
      { title: "Tejidos resistentes a la intemperie", description: "Sobretoldo de polyoxford rip-stop 420D con impermeabilidad de 2500 mm y cuerpo de lona policotón rip-stop de 280 g con impermeabilidad de 2000 mm." },
    ],
    included: ["Tienda de techo", "Colchón de espuma", "Barras de soporte con amortiguadores de gas de acero inoxidable 304", "Escalera telescópica de aluminio", "Bolsa para herramientas", "Iluminación LED interior"],
  },
  "large-soft-shell-rooftop-tent": {
    name: "TopTent™ Tienda de Techo Soft-Shell Grande",
    short: "Tienda de techo soft-shell espaciosa para 3–4 personas, con estructura ligera de aluminio y colchón de 5 cm.",
    description: "Una tienda de techo soft-shell para 3–4 personas pensada para escapadas durante todo el año, con tejidos impermeables, estructura ligera de aluminio, ventanas de ventilación y colchón con funda lavable. El ancho plegado y el peso varían según la variante.",
    seoTitle: "Tienda de Techo Soft-Shell Grande TopTent",
    seoDescription: "Tienda de techo soft-shell para 3–4 personas con colchón de 5 cm y tejidos con impermeabilidad de 3000 mm.",
    shellType: "Soft-shell",
    shellMaterial: "Estructura de aleación de aluminio",
    openingStyle: "Desplegable",
    sleepingCapacity: "3–4 personas",
    weightDisplay: "51–57 kg (según variante)",
    features: [
      { title: "Construcción resistente al agua", description: "Sobretoldo Oxford 420D PU 3000 mm y cuerpo de policotón de 280 g PU 3000 mm." },
      { title: "Colchón", description: "Colchón de 5 cm con funda lavable." },
    ],
    included: ["Tienda de techo", "Colchón de 5 cm con funda lavable", "Escalera de 2 m", "Bolsas para calzado", "Varillas para lluvia", "Kit completo de piezas"],
  },
  "four-season-rooftop-tent": {
    name: "TopTent™ Tienda de Techo Cuatro Estaciones",
    short: "Tienda de techo rígida para 2–3 personas con carcasa ABS de 5,5 mm, apertura hidráulica y colchón de 4 cm.",
    description: "Una tienda de techo rígida para 2–3 personas con carcasa ABS de 5,5 mm, tejidos con impermeabilidad de 3000 mm, barras hidráulicas de acero inoxidable, colchón de 4 cm con funda lavable y escalera telescópica.",
    seoTitle: "Tienda de Techo Cuatro Estaciones TopTent",
    seoDescription: "Tienda de techo rígida ABS para 2–3 personas con colchón de 4 cm, apertura hidráulica y tejidos con impermeabilidad de 3000 mm.",
    shellType: "Carcasa rígida",
    shellMaterial: "ABS de 5,5 mm",
    openingStyle: "Apertura hidráulica / desplegable",
    sleepingCapacity: "2–3 personas",
    weightDisplay: "91 kg",
    features: [
      { title: "Carcasa rígida ABS", description: "Construcción con carcasa rígida ABS de 5,5 mm." },
      { title: "Protección frente al clima", description: "Sobretoldo Oxford 420D PU3000 y cuerpo de policotón de 280 g PU3000 según la ficha actual." },
    ],
    included: ["Tienda de techo", "Colchón de 4 cm con funda lavable", "Escalera telescópica de 2 m", "Bolsas para calzado", "Varillas para lluvia", "Kit completo de piezas"],
  },
};

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale !== "es") return product;
  const tr = es[product.slug];
  if (!tr) return product;
  return {
    ...product,
    name: tr.name,
    short_description: tr.short,
    description: tr.description,
    seo_title: tr.seoTitle,
    seo_description: tr.seoDescription,
    shell_type: tr.shellType ?? product.shell_type,
    shell_material: tr.shellMaterial ?? product.shell_material,
    opening_style: tr.openingStyle ?? product.opening_style,
    sleeping_capacity: tr.sleepingCapacity ?? product.sleeping_capacity,
    weight_display: tr.weightDisplay ?? product.weight_display,
    features: tr.features.length ? tr.features : product.features,
    included_items: tr.included.length ? tr.included : product.included_items,
    images: product.images.map((image) => ({ ...image, alt_text: tr.name.replace("TopTent™ ", "") })),
  };
}

export function localizeProducts(products: Product[], locale: Locale): Product[] {
  return products.map((product) => localizeProduct(product, locale));
}
