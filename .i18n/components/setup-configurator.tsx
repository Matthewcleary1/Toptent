"use client";

import { useMemo, useState } from "react";
import { pathForLocale, type Locale } from "@/lib/i18n/config";
import { buildBase, rentalTents, travelAddOns } from "@/lib/travel-config";

function money(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function daysBetween(start: string, end: string) {
  if (!start || !end) return null;
  const from = new Date(`${start}T12:00:00`);
  const to = new Date(`${end}T12:00:00`);
  const days = Math.ceil((to.getTime() - from.getTime()) / 86400000);
  return days > 0 ? days : null;
}

export function SetupConfigurator({ mode, locale }: { mode: "build" | "rental"; locale: Locale }) {
  const es = locale === "es";
  const [selected, setSelected] = useState<string[]>([]);
  const [tentId, setTentId] = useState<string>(rentalTents[0].id);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggle = (id: string) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const selectedAddOns = useMemo(() => travelAddOns.filter((item) => selected.includes(item.id)), [selected]);
  const pricedPurchaseAddOns = selectedAddOns.filter((item) => item.purchasePriceEur !== null);
  const quotedPurchaseAddOns = selectedAddOns.filter((item) => item.purchasePriceEur === null);
  const buildTotal = buildBase.priceEur + pricedPurchaseAddOns.reduce((sum, item) => sum + (item.purchasePriceEur ?? 0), 0);
  const rentalDays = daysBetween(startDate, endDate);
  const rentalTent = rentalTents.find((tent) => tent.id === tentId) ?? rentalTents[0];
  const pendingDate = es ? "por confirmar" : "to confirm";
  const rentalDateSummary = startDate && endDate
    ? `${startDate} → ${endDate}`
    : startDate
      ? `${startDate} → ${pendingDate}`
      : endDate
        ? `${pendingDate} → ${endDate}`
        : pendingDate;

  const requestText = mode === "build"
    ? es
      ? `Hola TopTent Pro, quiero configurar un equipo de viaje. Base: ${buildBase.name.es} (${money(buildBase.priceEur, locale)}). Extras seleccionados: ${selectedAddOns.length ? selectedAddOns.map((item) => item.name.es).join(", ") : "ninguno todavía"}. ¿Podéis confirmarme compatibilidad y precio final?`
      : `Hi TopTent Pro, I want to build a travel setup. Base: ${buildBase.name.en} (${money(buildBase.priceEur, locale)}). Selected add-ons: ${selectedAddOns.length ? selectedAddOns.map((item) => item.name.en).join(", ") : "none yet"}. Can you confirm compatibility and the final price?`
    : es
      ? `Hola TopTent Pro, quiero solicitar un alquiler. Tienda preferida: ${rentalTent.name.es}. Fechas: ${rentalDateSummary}. Extras: ${selectedAddOns.length ? selectedAddOns.map((item) => item.name.es).join(", ") : "ninguno todavía"}. ¿Podéis confirmar disponibilidad y precio?`
      : `Hi TopTent Pro, I want to request a rental. Preferred tent: ${rentalTent.name.en}. Dates: ${rentalDateSummary}. Add-ons: ${selectedAddOns.length ? selectedAddOns.map((item) => item.name.en).join(", ") : "none yet"}. Can you confirm availability and pricing?`;

  const contactHref = `${pathForLocale("/contact", locale)}?message=${encodeURIComponent(requestText)}`;

  return <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
    <div>
      {mode === "rental" && <div className="form-card mb-6">
        <label>{es ? "Tienda preferida" : "Preferred tent"}
          <select className="input" value={tentId} onChange={(event) => setTentId(event.target.value)}>
            {rentalTents.map((tent) => <option key={tent.id} value={tent.id}>{tent.name[locale]}</option>)}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>{es ? "Fecha de inicio" : "Start date"}<input className="input" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label>
          <label>{es ? "Fecha de devolución" : "Return date"}<input className="input" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></label>
        </div>
        {rentalDays && <p className="text-sm text-black/60">{es ? `${rentalDays} días seleccionados` : `${rentalDays} days selected`}</p>}
      </div>}

      <div className="grid gap-3 sm:grid-cols-2">
        {travelAddOns.map((item) => {
          const active = selected.includes(item.id);
          const price = mode === "build" ? item.purchasePriceEur : item.rentalDailyPriceEur;
          return <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(item.id)}
            className={`rounded-2xl border p-5 text-left transition ${active ? "border-[#58664a] bg-[#eef0e8]" : "border-black/10 bg-white hover:border-black/35"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-black">{item.name[locale]}</h3>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/15 text-sm font-black">{active ? "✓" : "+"}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-black/60">{item.description[locale]}</p>
            <p className="mt-4 text-xs font-black uppercase tracking-[.08em] text-black/50">
              {price === null ? (es ? "Precio por confirmar" : "Price to confirm") : mode === "rental" ? `${money(price, locale)} / ${es ? "día" : "day"}` : `+ ${money(price, locale)}`}
            </p>
          </button>;
        })}
      </div>
    </div>

    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[2rem] bg-[#171914] p-6 text-[#f4f0e7] md:p-8">
        <p className="eyebrow text-white/45">{mode === "build" ? (es ? "Tu configuración" : "Your build") : (es ? "Tu alquiler" : "Your rental")}</p>
        {mode === "build" ? <>
          <div className="mt-5 border-b border-white/10 pb-5">
            <p className="font-black">{buildBase.name[locale]}</p>
            <p className="mt-1 text-sm text-white/55">{es ? "Configuración base" : "Base setup"}</p>
            <p className="mt-3 text-2xl font-black">{money(buildBase.priceEur, locale)}</p>
          </div>
          <div className="py-5">
            {selectedAddOns.length === 0 ? <p className="text-sm text-white/55">{es ? "Añade extras para crear tu equipo." : "Add extras to shape your setup."}</p> : <div className="grid gap-3">{selectedAddOns.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span>{item.name[locale]}</span><span className="font-bold">{item.purchasePriceEur === null ? (es ? "Por cotizar" : "Quote") : `+${money(item.purchasePriceEur, locale)}`}</span></div>)}</div>}
          </div>
          <div className="border-t border-white/10 pt-5">
            <div className="flex items-end justify-between gap-4"><span className="text-sm text-white/55">{es ? "Total conocido" : "Known total"}</span><strong className="text-3xl">{money(buildTotal, locale)}</strong></div>
            {quotedPurchaseAddOns.length > 0 && <p className="mt-2 text-xs leading-5 text-white/45">+ {quotedPurchaseAddOns.length} {es ? "extra(s) con precio por confirmar" : "add-on(s) awaiting confirmed pricing"}</p>}
          </div>
        </> : <>
          <div className="mt-5 border-b border-white/10 pb-5"><p className="font-black">{rentalTent.name[locale]}</p><p className="mt-2 text-sm text-white/55">{startDate || endDate ? rentalDateSummary : (es ? "Fechas por elegir" : "Dates to choose")}</p></div>
          <div className="py-5">{selectedAddOns.length ? <div className="grid gap-3">{selectedAddOns.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span>{item.name[locale]}</span><span className="font-bold">{item.rentalDailyPriceEur === null ? (es ? "Por cotizar" : "Quote") : `${money(item.rentalDailyPriceEur, locale)}/${es ? "día" : "day"}`}</span></div>)}</div> : <p className="text-sm text-white/55">{es ? "Selecciona los extras que quieres llevar." : "Choose the extras you want to take."}</p>}</div>
          <div className="border-t border-white/10 pt-5"><p className="text-sm leading-6 text-white/55">{es ? "Confirmaremos disponibilidad, compatibilidad del vehículo, condiciones y precio antes de cerrar el alquiler." : "We’ll confirm availability, vehicle compatibility, terms and pricing before the rental is final."}</p></div>
        </>}
        <a href={contactHref} className="btn-light mt-6 w-full text-center">{mode === "build" ? (es ? "Solicitar esta configuración" : "Request this build") : (es ? "Solicitar este alquiler" : "Request this rental")}</a>
      </div>
    </aside>
  </div>;
}
