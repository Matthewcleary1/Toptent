import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";
import { site } from "@/lib/site";
import { pathForLocale } from "@/lib/i18n/config";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=site.baseUrl.replace(/\/$/,"");
  const staticRoutes=["/","/roof-tents","/rentals","/build-your-tent","/compare","/vehicle-compatibility","/installation","/delivery","/about","/faq","/contact"];
  const products=await getProducts();
  const routes=[...staticRoutes,...products.map(p=>`/roof-tents/${p.slug}`)];
  return routes.flatMap(path=>(["en","es"] as const).map(locale=>({
    url:`${base}${pathForLocale(path,locale)}`,
    lastModified:new Date(),
    alternates:{languages:{en:`${base}${pathForLocale(path,"en")}`,es:`${base}${pathForLocale(path,"es")}`}},
  })));
}
