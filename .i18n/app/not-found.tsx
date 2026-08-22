import Link from "next/link";
import { getLocale } from "@/lib/i18n/server";
import { pathForLocale } from "@/lib/i18n/config";
export default async function NotFound(){const locale=await getLocale();const es=locale==="es";return <section className="section text-center"><p className="eyebrow text-olive">404</p><h1 className="mt-4 text-6xl font-black tracking-[-.06em]">{es?"Ruta equivocada.":"Wrong turn."}</h1><p className="lead mx-auto mt-4 max-w-xl">{es?"Esa página ya no está en la ruta.":"That page isn’t on the route anymore."}</p><Link href={pathForLocale("/",locale)} className="btn-dark mt-7">{es?"Volver a Tenttop":"Back to Tenttop"}</Link></section>}
