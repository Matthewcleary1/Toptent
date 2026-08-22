import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import { getPublicSiteSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/server";

export async function generateMetadata():Promise<Metadata>{
  const locale=await getLocale(); const es=locale==="es";
  return {
    metadataBase:new URL(site.baseUrl),
    title:{default:es?"Tenttop | Tiendas de Techo en Barcelona":"Tenttop | Premium Roof Tents Barcelona",template:"%s | Tenttop"},
    description:es?"Tiendas de techo hard-shell y soft-shell, orientación de compatibilidad e instalación desde Barcelona.":"Hard-shell and soft-shell roof tents, vehicle compatibility guidance and installation support from Barcelona.",
    openGraph:{title:es?"Tenttop — Despierta en un lugar mejor":"Tenttop — Wake up somewhere better",description:es?"Tiendas de techo, ayuda de compatibilidad e instalación desde Barcelona.":"Roof tents, fitment guidance and installation support from Barcelona.",type:"website",locale:es?"es_ES":"en_ES",alternateLocale:es?["en_ES"]:["es_ES"],siteName:"Tenttop"},
    twitter:{card:"summary_large_image",title:es?"Tenttop — Despierta en un lugar mejor":"Tenttop — Wake up somewhere better",description:es?"Tiendas de techo, compatibilidad e instalación desde Barcelona.":"Roof tents, fitment guidance and installation support from Barcelona."},
  };
}

export default async function RootLayout({children}:{children:React.ReactNode}){
  const [settings,locale]=await Promise.all([getPublicSiteSettings(),getLocale()]); const es=locale==="es";
  const org={"@context":"https://schema.org","@type":"Organization",name:"Tenttop",url:site.baseUrl,description:es?"Empresa de tiendas de techo con base en Barcelona, España.":"Rooftop tent business based in Barcelona, Spain.",address:{"@type":"PostalAddress",addressLocality:"Barcelona",addressCountry:"ES"},...(settings.contactEmail?{email:settings.contactEmail}:{}),...(settings.businessPhone?{telephone:settings.businessPhone}:{}),...(Object.values(settings.socialLinks).some(Boolean)?{sameAs:Object.values(settings.socialLinks).filter(Boolean)}:{})};
  return <html lang={locale}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(org)}}/><Header locale={locale}/><main>{children}</main><Footer/><Analytics/></body></html>
}
