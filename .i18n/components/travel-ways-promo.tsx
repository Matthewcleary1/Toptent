"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, pathForLocale, unprefixedPath } from "@/lib/i18n/config";

export function TravelWaysPromo() {
  const pathname = usePathname() || "/";
  if (unprefixedPath(pathname) !== "/") return null;
  const locale = localeFromPath(pathname);
  const es = locale === "es";
  const href = (path: string) => pathForLocale(path, locale);

  return <section className="section pt-0">
    <div className="mb-8 max-w-3xl">
      <p className="eyebrow text-olive">{es ? "Viaja a tu manera" : "Travel your way"}</p>
      <h2 className="section-title mt-3">{es ? "La libertad de una camper. Sin comprar una camper." : "Van-life freedom. Without buying a van."}</h2>
      <p className="lead mt-5">{es ? "Alquila un equipo listo para una escapada o crea el tuyo alrededor de una tienda de techo de aluminio y añade solo el equipo que necesitas." : "Rent a road-trip setup for your next escape, or build your own around an aluminium roof tent and add only the equipment you actually need."}</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <Link href={href("/rentals")} className="group rounded-[2rem] bg-[#171914] p-7 text-[#f4f0e7] md:p-10">
        <p className="eyebrow text-white/45">01 · {es ? "Alquilar" : "Rent"}</p>
        <h3 className="mt-4 text-4xl font-black tracking-[-.055em]">{es ? "Todo lo necesario para salir." : "Everything you need to go."}</h3>
        <p className="mt-4 max-w-xl leading-7 text-white/65">{es ? "Elige una tienda y añade baca, solar, Starlink, ducha, mesa y sillas para crear una configuración de viaje a tu medida." : "Choose a tent and add a roof rack, solar, Starlink, shower, table and chairs to create a travel-ready setup around your car."}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-black">{es ? "Crear alquiler" : "Build a rental"}<span className="transition group-hover:translate-x-1">→</span></span>
      </Link>
      <Link href={href("/build-your-tent")} className="group rounded-[2rem] bg-[#d9cbb3] p-7 md:p-10">
        <p className="eyebrow">02 · {es ? "Configurar" : "Build"}</p>
        <h3 className="mt-4 text-4xl font-black tracking-[-.055em]">{es ? "Construye tu alternativa a una camper." : "Build your alternative to a campervan."}</h3>
        <p className="mt-4 max-w-xl leading-7 text-black/65">{es ? "Empieza con la tienda hard-shell de aluminio de 1.200 € y añade conectividad, energía y equipamiento de campamento según lo necesites." : "Start with the €1,200 aluminium hard-shell tent, then add connectivity, power and camp equipment as you need it."}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-black">{es ? "Configurar mi equipo" : "Build my setup"}<span className="transition group-hover:translate-x-1">→</span></span>
      </Link>
    </div>
  </section>;
}
