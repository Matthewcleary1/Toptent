import type { Product } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";

export function StockBadge({ product, locale="en" }: { product: Product; locale?: Locale }) {
  const es=locale==="es";
  let text = es ? "Consultar disponibilidad" : "Check availability";
  if (product.quantity_available != null) {
    text = product.quantity_available === 0 ? (es?"Agotado":"Sold out") : product.quantity_available === 1 ? (es?"Solo 1 disponible":"Only 1 available") : product.quantity_available <= 3 ? (es?`${product.quantity_available} disponibles`:`${product.quantity_available} available`) : (es?"En stock":"In stock");
  } else {
    const labels = es ? {
      in_stock: "En stock", low_stock: "Pocas unidades", reserved: "Reservado", sold_out: "Agotado", coming_soon: "Próximamente", archived: "No disponible", check_availability: "Consultar disponibilidad",
    } as const : {
      in_stock: "In stock", low_stock: "Low stock", reserved: "Reserved", sold_out: "Sold out", coming_soon: "Coming soon", archived: "Unavailable", check_availability: "Check availability",
    } as const;
    text = labels[product.product_status];
  }
  return <span className="inline-flex rounded-full bg-[#dfe5d6] px-3 py-1 text-xs font-bold text-[#33402c]">{text}</span>;
}
