import type { Metadata } from "next";
import Link from "next/link";
import { SetupConfigurator } from "@/components/setup-configurator";
import { getLocale } from "@/lib/i18n/server";
import { pathForLocale } from "@/lib/i18n/config";
import { buildBase } from "@/lib/travel-config";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const es = locale === "es";
  const path = "/build-your-tent";
  return {
    title: es ? "Configura tu tienda y equipo de viaje" : "Build Your Roof Tent Travel Setup",
    description: es ? "Empieza con la tienda de techo hard-shell de aluminio y añade baca, solar, Starlink, ducha, mesa y sillas." : "Start with the aluminium hard-shell rooftop tent and add a roof rack, solar, Starlink, shower, table and chairs.",
    alternates: {
      canonical: `${site.baseUrl}${pathForLocale(path, locale)}`,
      languages: { en: `${site.baseUrl}${path}`, es: `${site.baseUrl}/es${path}` },
    },
  };
}

export default async function BuildYourTentPage() {
  const locale = await getLocale();
  const es = locale === "es";
  const href = (path: string) => pathForLocale(path, locale);

  return <>
    <section className="section grid gap-10 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div>
        <p className="eyebrow text-olive">{es ? "Configura tu TopTent Pro" : "Build your TopTent Pro"}</p>
        <h1 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-black leading-[.86] tracking-[-.075em]">{es ? "Muchas de las ventajas de una camper. Sin el precio de una camper." : "A lot of the campervan experience. Without buying a campervan."}</h1>
        <p className="lead mt-6 max-w-2xl">{es ? "Empieza con nuestra tienda hard-shell de aluminio y crea un equipo alrededor de tu propio coche. Añade conectividad, energía y equipamiento de campamento según el tipo de viaje que quieras hacer." : "Start with our aluminium hard-shell tent and build a road-trip system around the car you already own. Add connectivity, power and camp equipment according to the kind of travelling you want to do."}</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href="#builder" className="btn-dark">{es ? "Empezar configuración" : "Start building"}</a><Link className="btn-outline" href={href("/rentals")}>{es ? "Prefiero alquilar" : "I’d rather rent"}</Link></div>
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-[#d9cbb3] p-4">
        <img className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" src={buildBase.imageUrl} alt={es ? "Tienda de techo hard-shell de aluminio TopTent Pro" : "TopTent Pro aluminium hard-shell rooftop tent"} />
      </div>
    </section>

    <section className="section pt-0">
      <div className="grid gap-5 rounded-[2rem] bg-[#171914] p-7 text-[#f4f0e7] md:grid-cols-[.8fr_1.2fr] md:p-10">
        <div><p className="eyebrow text-white/45">{es ? "El punto de partida" : "The starting point"}</p><p className="mt-4 text-5xl font-black tracking-[-.06em]">€1,200</p></div>
        <div><h2 className="text-3xl font-black tracking-[-.05em]">{buildBase.name[locale]}</h2><p className="mt-4 leading-7 text-white/65">{es ? "La base es el modelo de aluminio pop-up de dos plazas que ya vendemos. A partir de ahí, el configurador añade solamente el equipo que selecciones." : "The base is the two-person aluminium pop-up model already in the TopTent Pro range. From there, the configurator adds only the equipment you select."}</p></div>
      </div>
    </section>

    <section className="section pt-0">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow text-olive">{es ? "La idea" : "The idea"}</p>
        <h2 className="section-title mt-3">{es ? "Convierte tu coche en una base de viaje." : "Turn your car into a travel base."}</h2>
        <p className="lead mt-5">{es ? "Una camper puede juntar cama, energía, conectividad y vida de campamento en un solo vehículo. Esta propuesta busca ofrecer muchas de esas funciones alrededor del coche que ya tienes, con un sistema modular que puedes adaptar a tu presupuesto y a tu forma de viajar." : "A campervan combines sleeping, power, connectivity and camp life in one vehicle. This setup is designed to deliver many of those functions around the car you already have, using a modular system you can adapt to your budget and the way you travel."}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [es ? "Dormir" : "Sleep", es ? "La tienda hard-shell se convierte en tu espacio de descanso elevado." : "The hard-shell rooftop tent becomes your elevated sleeping space."],
          [es ? "Energía y conexión" : "Power & connection", es ? "Añade solar y Starlink si tu tipo de viaje necesita autonomía y conectividad." : "Add solar and Starlink when your style of travel needs off-grid power and connectivity."],
          [es ? "Vivir fuera" : "Live outside", es ? "Ducha, mesa y sillas completan una base sencilla para pasar más tiempo en ruta." : "A shower, table and chairs complete a simple base for spending more time on the road."],
        ].map(([title, body]) => <div key={title} className="rounded-2xl bg-white p-6"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-black/60">{body}</p></div>)}
      </div>
    </section>

    <section id="builder" className="section pt-0">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow text-olive">{es ? "Configura el tuyo" : "Build yours"}</p>
        <h2 className="section-title mt-3">{es ? "Empieza por la tienda. Añade el resto." : "Start with the tent. Add the rest."}</h2>
        <p className="lead mt-5">{es ? "El total conocido empieza en 1.200 €. Los extras sin una tarifa comercial confirmada aparecen como «precio por confirmar» en lugar de inventar cifras. En cuanto fijemos esas tarifas, el mismo configurador los sumará automáticamente al total." : "The known total starts at €1,200. Add-ons without a confirmed TopTent Pro selling price are marked “price to confirm” instead of using invented figures. Once those rates are set, this same configurator will automatically add them to the running total."}</p>
      </div>
      <SetupConfigurator mode="build" locale={locale} />
    </section>

    <section className="section pt-0">
      <div className="rounded-[2rem] bg-[#d9cbb3] p-7 md:p-10">
        <p className="eyebrow">{es ? "Primero: tu coche" : "First: your car"}</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.055em]">{es ? "El mejor equipo sigue necesitando una base segura." : "The best setup still needs a safe foundation."}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-black/65">{es ? "La tienda, la baca y cualquier accesorio montado deben respetar las especificaciones de tu vehículo y del sistema de techo. Podemos revisar la configuración antes de que cierres la compra." : "The tent, roof rack and anything mounted to it must stay within the relevant vehicle and roof-system specifications. We can review the setup before you finalise the purchase."}</p>
        <Link href={href("/vehicle-compatibility")} className="btn-dark mt-6">{es ? "Comprobar mi vehículo" : "Check my vehicle"}</Link>
      </div>
    </section>
  </>;
}
