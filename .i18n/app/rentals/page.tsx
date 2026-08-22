import type { Metadata } from "next";
import Link from "next/link";
import { SetupConfigurator } from "@/components/setup-configurator";
import { getLocale } from "@/lib/i18n/server";
import { pathForLocale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const es = locale === "es";
  const path = "/rentals";
  return {
    title: es ? "Alquiler de tiendas de techo y equipo" : "Roof Tent & Travel Setup Rental",
    description: es ? "Solicita una tienda de techo con extras como baca, solar, Starlink, ducha, mesa y sillas para viajar con tu propio coche." : "Request a roof tent with optional roof rack, solar, Starlink, shower, table and chairs for a travel-ready setup around your own car.",
    alternates: {
      canonical: `${site.baseUrl}${pathForLocale(path, locale)}`,
      languages: { en: `${site.baseUrl}${path}`, es: `${site.baseUrl}/es${path}` },
    },
  };
}

export default async function RentalsPage() {
  const locale = await getLocale();
  const es = locale === "es";
  const href = (path: string) => pathForLocale(path, locale);

  return <>
    <section className="section grid gap-10 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <div>
        <p className="eyebrow text-olive">{es ? "Alquiler TopTent Pro" : "TopTent Pro rentals"}</p>
        <h1 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-black leading-[.86] tracking-[-.075em]">{es ? "Viaja como en una camper. Con tu propio coche." : "Travel like a campervan. Keep your own car."}</h1>
        <p className="lead mt-6 max-w-2xl">{es ? "La idea es simple: eliges la tienda de techo, añades el equipo que necesitas y nos envías las fechas y los datos de tu coche. Confirmamos disponibilidad, compatibilidad, condiciones y precio antes de cerrar el alquiler." : "The idea is simple: choose the roof tent, add the equipment you need, then send us your dates and vehicle details. We confirm availability, compatibility, terms and pricing before anything is final."}</p>
        <div className="mt-7 flex flex-wrap gap-3"><a href="#configure-rental" className="btn-dark">{es ? "Crear mi alquiler" : "Build my rental"}</a><Link className="btn-outline" href={href("/vehicle-compatibility")}>{es ? "Comprobar mi coche" : "Check my car"}</Link></div>
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-[#d9cbb3] p-4">
        <img className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" src="https://static.wixstatic.com/media/97a3ea_5111b641a164402c864d8ecfa582b548~mv2.jpg/v1/fit/w_1125,h_927,q_90/file.jpg" alt={es ? "Tienda de techo TopTent Pro para un viaje por carretera" : "TopTent Pro rooftop tent for a road trip"} />
      </div>
    </section>

    <section className="section pt-0">
      <div className="rounded-[2rem] bg-white p-7 md:p-10">
        <p className="eyebrow text-olive">{es ? "Una base. El equipo que necesites." : "One base. The gear you need."}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            [es ? "1. Elige la tienda" : "1. Choose the tent", es ? "Selecciona el modelo que prefieres. La disponibilidad de alquiler se confirma para tus fechas." : "Select the model you prefer. Rental availability is confirmed for your dates."],
            [es ? "2. Añade equipamiento" : "2. Add the gear", es ? "Baca, paneles solares, Starlink, ducha, mesa y sillas se pueden solicitar como parte del equipo." : "Roof rack, solar panels, Starlink, shower, table and chairs can be requested as part of the setup."],
            [es ? "3. Confirma tu coche" : "3. Confirm your car", es ? "Revisamos el sistema de techo, las cargas permitidas y el plan de montaje o entrega antes de confirmar." : "We check the roof setup, relevant load limits and the fitting or handover plan before confirmation."],
          ].map(([title, body]) => <div key={title} className="rounded-2xl bg-[#f4f0e7] p-5"><h2 className="font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-black/60">{body}</p></div>)}
        </div>
      </div>
    </section>

    <section id="configure-rental" className="section pt-0">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow text-olive">{es ? "Configura tu alquiler" : "Configure your rental"}</p>
        <h2 className="section-title mt-3">{es ? "Llévate solo lo que necesitas." : "Take only what you need."}</h2>
        <p className="lead mt-5">{es ? "Selecciona una tienda, tus fechas y los extras. Como todavía no hemos fijado las tarifas de alquiler de cada componente, no mostramos precios inventados: recibirás un precio confirmado con la disponibilidad." : "Choose a tent, your dates and the extras. Because the rental rates for each component have not been set yet, we do not show invented prices: you’ll receive confirmed pricing together with availability."}</p>
      </div>
      <SetupConfigurator mode="rental" locale={locale} />
    </section>

    <section className="section pt-0">
      <div className="rounded-[2rem] bg-[#eef0e8] p-7 md:p-10">
        <p className="eyebrow text-olive">{es ? "Antes de reservar" : "Before you book"}</p>
        <h2 className="mt-3 text-4xl font-black tracking-[-.055em]">{es ? "La compatibilidad del coche sigue siendo lo primero." : "Vehicle compatibility still comes first."}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-black/65">{es ? "Una tienda de techo y una baca deben ser adecuadas para tu vehículo y para las cargas dinámicas y estáticas permitidas por sus fabricantes. Confirmamos esos datos antes de finalizar cualquier alquiler." : "A rooftop tent and roof-rack system must suit your vehicle and the dynamic/static limits specified by the relevant manufacturers. We confirm those details before any rental is final."}</p>
        <Link href={href("/vehicle-compatibility")} className="btn-dark mt-6">{es ? "Comprobar compatibilidad" : "Check compatibility"}</Link>
      </div>
    </section>
  </>;
}
