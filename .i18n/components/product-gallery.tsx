"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";

export function ProductGallery({images,name,locale="en"}:{images:ProductImage[];name:string;locale?:Locale}){
  const [active,setActive]=useState(0);
  const [open,setOpen]=useState(false);
  const touchStart=useRef<number|null>(null);
  const image=images[active];
  const es=locale==="es";
  const move=(delta:number)=>setActive(i=>(i+delta+images.length)%images.length);
  useEffect(()=>{if(!open)return;const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false);if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1)};document.addEventListener("keydown",key);document.body.style.overflow="hidden";return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=""}},[open,images.length]);
  const onTouchStart=(e:React.TouchEvent)=>{touchStart.current=e.changedTouches[0]?.clientX??null};
  const onTouchEnd=(e:React.TouchEvent)=>{if(touchStart.current==null)return;const dx=(e.changedTouches[0]?.clientX??touchStart.current)-touchStart.current;if(Math.abs(dx)>45)move(dx<0?1:-1);touchStart.current=null};
  if(!image)return <div className="aspect-square rounded-[1.8rem] bg-stone-200" aria-label={es?"Imagen de producto pendiente":"Product image pending"}/>;
  return <div>
    <button className="relative block aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] bg-stone-200" onClick={()=>setOpen(true)} aria-label={es?"Abrir galería de imágenes a pantalla completa":"Open full-screen image gallery"} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Image src={image.url} alt={image.alt_text||name} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover"/>
      <span className="absolute bottom-3 right-3 rounded-full bg-black/65 px-3 py-1.5 text-xs font-bold text-white">{active+1} / {images.length} · {es?"Ampliar":"Expand"}</span>
    </button>
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label={es?"Miniaturas de imágenes del producto":"Product image thumbnails"}>{images.map((img,i)=><button aria-label={es?`Ver imagen ${i+1}`:`View image ${i+1}`} key={img.id} onClick={()=>setActive(i)} className={`relative h-20 min-w-20 overflow-hidden rounded-xl border-2 ${i===active?"border-[#48543d]":"border-transparent"}`}><Image src={img.url} alt="" fill sizes="80px" className="object-cover"/></button>)}</div>
    {open&&<div role="dialog" aria-modal="true" aria-label={`${name} ${es?"galería de imágenes":"image gallery"}`} className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-3 md:p-8" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button onClick={()=>setOpen(false)} className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-black" aria-label={es?"Cerrar galería":"Close gallery"}>×</button>
      {images.length>1&&<><button onClick={()=>move(-1)} className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl font-black" aria-label={es?"Imagen anterior":"Previous image"}>‹</button><button onClick={()=>move(1)} className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl font-black" aria-label={es?"Imagen siguiente":"Next image"}>›</button></>}
      <div className="relative h-[82vh] w-full max-w-6xl"><Image src={image.url} alt={image.alt_text||name} fill sizes="100vw" className="object-contain" priority/></div>
      <div className="absolute bottom-4 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white">{active+1} / {images.length} · {es?"Desliza o usa las flechas":"Swipe or use arrow keys"}</div>
    </div>}
  </div>;
}
