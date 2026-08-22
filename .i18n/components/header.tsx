"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "./icons";
import { pathForLocale, unprefixedPath, type Locale } from "@/lib/i18n/config";

const nav = {
  en: [["Roof tents","/roof-tents"],["Compare","/compare"],["Fit my car","/vehicle-compatibility"],["Installation","/installation"],["FAQ","/faq"]],
  es: [["Tiendas de techo","/roof-tents"],["Comparar","/compare"],["Mi coche","/vehicle-compatibility"],["Instalación","/installation"],["Preguntas","/faq"]],
} satisfies Record<Locale, string[][]>;

export function Header({locale}:{locale:Locale}) {
  const [open,setOpen]=useState(false);
  const pathname=usePathname() || "/";
  const plainPath=unprefixedPath(pathname);
  const contactLabel=locale==="es"?"Habla con nosotros":"Talk to us";
  const languageLabel=locale==="es"?"EN":"ES";
  const switchLocale:Locale=locale==="es"?"en":"es";
  const switchHref=pathForLocale(plainPath,switchLocale);
  const languageAriaLabel=locale==="es"?"Cambiar a inglés":"Switch to Spanish";
  const href=(path:string)=>pathForLocale(path,locale);
  return <header className="sticky top-0 z-50 border-b border-black/8 bg-[#f4f0e7]/92 backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
      <Link href={href("/")} className="font-display text-[1.65rem] font-black tracking-[-.06em]" aria-label="Tenttop home">TENTTOP<span className="text-olive">.</span></Link>
      <nav className="hidden items-center gap-6 text-sm font-semibold md:flex" aria-label={locale==="es"?"Navegación principal":"Primary navigation"}>{nav[locale].map(([n,h])=><Link key={h} href={href(h)} className="hover:text-olive">{n}</Link>)}<a href={switchHref} className="rounded-full border border-black/15 px-3 py-2 text-xs font-black tracking-[.08em] hover:border-black/35" hrefLang={switchLocale} aria-label={languageAriaLabel}>{languageLabel}</a><Link className="btn-dark" href={href("/contact")}>{contactLabel}</Link></nav>
      <div className="flex items-center gap-2 md:hidden"><a href={switchHref} hrefLang={switchLocale} aria-label={languageAriaLabel} className="grid h-10 min-w-10 place-items-center rounded-full border border-black/15 px-2 text-xs font-black tracking-[.08em]">{languageLabel}</a><button aria-label={open?(locale==="es"?"Cerrar menú":"Close menu"):(locale==="es"?"Abrir menú":"Open menu")} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-black/15">{open?<XIcon className="h-5 w-5"/>:<MenuIcon className="h-5 w-5"/>}</button></div>
    </div>
    {open&&<nav id="mobile-navigation" className="border-t border-black/10 bg-[#f4f0e7] px-5 py-4 md:hidden" aria-label={locale==="es"?"Navegación móvil":"Mobile navigation"}>{nav[locale].map(([n,h])=><Link key={h} onClick={()=>setOpen(false)} href={href(h)} className="block border-b border-black/8 py-4 text-lg font-semibold">{n}</Link>)}<Link onClick={()=>setOpen(false)} href={href("/contact")} className="mt-4 block btn-dark text-center">{contactLabel}</Link></nav>}
  </header>
}
