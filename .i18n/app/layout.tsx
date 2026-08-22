import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./mobile-fixes.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaGuard } from "@/components/mobile-cta-guard";
import { TravelWaysPromo } from "@/components/travel-ways-promo";
import { site } from "@/lib/site";
import { getPublicSiteSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata():Promise<Metadata>{
  const locale=await getLocale(); const es=locale==="es";
  return {
    metadataBase:new URL(site.baseUrl),
    title:{default:es?"TopTent Pro | Tiendas de Techo en Barcelona":"TopTent Pro | Premium Roof Tents Barcelona",template:"%s | TopTent Pro"},
    description:es?"Tiendas de techo, alquileres, equipos modulares, orientación de compatibilidad e instalación desde Barcelona.":"Roof tents, rentals, modular travel setups, vehicle compatibility guidance and installation support from Barcelona.",
    openGraph:{title:es?"TopTent Pro — Despierta en un lugar mejor":"TopTent Pro — Wake up somewhere better",description:es?"Tiendas de techo, alquileres, equipos modulares e instalación desde Barcelona.":"Roof tents, rentals, modular travel setups, fitment guidance and installation support from Barcelona.",type:"website",locale:es?"es_ES":"en_ES",alternateLocale:es?["en_ES"]:["es_ES"],siteName:"TopTent Pro"},
    twitter:{card:"summary_large_image",title:es?"TopTent Pro — Despierta en un lugar mejor":"TopTent Pro — Wake up somewhere better",description:es?"Tiendas de techo, alquileres, compatibilidad e instalación desde Barcelona.":"Roof tents, rentals, fitment guidance and installation support from Barcelona."},
  };
}

export default async function RootLayout({children}:{children:React.ReactNode}){
  const [settings,locale]=await Promise.all([getPublicSiteSettings(),getLocale()]); const es=locale==="es";
  const org={"@context":"https://schema.org","@type":"Organization",name:"TopTent Pro",url:site.baseUrl,description:es?"Empresa de tiendas de techo con base en Barcelona, España.":"Rooftop tent business based in Barcelona, Spain.",address:{"@type":"PostalAddress",addressLocality:"Barcelona",addressCountry:"ES"},...(settings.contactEmail?{email:settings.contactEmail}:{}),...(settings.businessPhone?{telephone:settings.businessPhone}:{}),...(Object.values(settings.socialLinks).some(Boolean)?{sameAs:Object.values(settings.socialLinks).filter(Boolean)}:{})};
  return <html lang={locale}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(org)}}/><Header locale={locale}/><main>{children}<TravelWaysPromo/></main><Footer/><MobileCtaGuard/><Analytics/></body></html>
}
