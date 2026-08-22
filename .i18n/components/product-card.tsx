import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/site";
import { ArrowRight } from "./icons";
import { StockBadge } from "./stock-badge";
import type { Locale } from "@/lib/i18n/config";
import { pathForLocale } from "@/lib/i18n/config";

export function ProductCard({product,locale="en"}:{product:Product;locale?:Locale}){
  const es=locale==="es";
  return <article className="group overflow-hidden rounded-[1.8rem] bg-white shadow-[0_12px_50px_rgba(23,25,20,.08)]"><Link href={pathForLocale(`/roof-tents/${product.slug}`,locale)} className="block"><div className="relative aspect-[4/3] overflow-hidden bg-stone-200">{product.images[0]&&<Image src={product.images[0].url} alt={product.images[0].alt_text} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]"/>}</div><div className="p-6 md:p-7"><div className="flex items-start justify-between gap-4"><div><StockBadge product={product} locale={locale}/><h3 className="mt-3 text-2xl font-black tracking-[-.04em]">{product.name.replace("TopTent™ ","")}</h3></div><p className="text-xl font-black">{formatPrice(product.sale_price ?? product.price,product.currency,locale)}</p></div><p className="mt-3 text-sm leading-6 text-black/60">{product.short_description}</p><div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-black/60">{product.sleeping_capacity&&<span className="pill">{es?"Para":"Sleeps"} {product.sleeping_capacity.replace(" people","").replace(" personas","")}</span>}{product.weight_display&&<span className="pill">{product.weight_display}</span>}{product.opening_style&&<span className="pill">{product.opening_style}</span>}</div><div className="mt-6 flex items-center gap-2 font-bold">{es?"Ver tienda":"View tent"} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></div></div></Link></article>
}
