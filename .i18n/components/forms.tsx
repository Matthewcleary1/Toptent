"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { callPublicSite, type PublicAction } from "@/lib/public-api";
import { VehiclePhotoUpload } from "./direct-uploads";
import type { Locale } from "@/lib/i18n/config";
import { pathForLocale } from "@/lib/i18n/config";
import { localizeServerMessage } from "@/lib/i18n/messages";

type FormState = { ok: boolean; message: string };
const initial: FormState = { ok: false, message: "" };
const input = "input";

function Result({ state }: { state: FormState }) {
  return state.message ? <p role="status" aria-live="polite" className={`rounded-xl px-4 py-3 text-sm ${state.ok ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>{state.message}</p> : null;
}

function usePublicSubmit(action: PublicAction, locale:Locale, event?: string) {
  const [state, setState] = useState<FormState>(initial);
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>, extras: Record<string, unknown> = {}) {
    e.preventDefault(); const form = e.currentTarget; if (!form.reportValidity()) return;
    setBusy(true); setState(initial);
    const payload = { ...Object.fromEntries(new FormData(form).entries()), ...extras } as Record<string, unknown>;
    const result = await callPublicSite(action, payload);
    const fallback=result.ok ? (locale==="es"?"Solicitud recibida.":"Request received.") : (locale==="es"?"No hemos podido enviarlo ahora mismo.":"We couldn't send that right now.");
    const next = { ok: result.ok, message: localizeServerMessage(result.message || fallback,locale) };
    setState(next); setBusy(false); if (next.ok && event) track(event);
  }
  return { state, busy, submit };
}

function SendButton({ busy, children, locale }: { busy: boolean; children: string; locale:Locale }) {
  return <button type="submit" disabled={busy} className="btn-dark w-full disabled:cursor-not-allowed disabled:opacity-50">{busy ? (locale==="es"?"Enviando…":"Sending…") : children}</button>;
}

export function CompatibilityForm({locale="en"}:{locale?:Locale}) {
  const { state, busy, submit } = usePublicSubmit("compatibility",locale,"compatibility_request");
  const [step, setStep] = useState(1); const [vehicleMake, setVehicleMake] = useState(""); const [vehicleModel, setVehicleModel] = useState(""); const [vehicleYear, setVehicleYear] = useState(""); const [roofSetup, setRoofSetup] = useState("");
  const progress = Math.min(step, 5); const es=locale==="es";
  const nextDisabled = step === 1 ? vehicleMake.trim().length < 1 : step === 2 ? vehicleModel.trim().length < 1 : step === 3 ? !/^\d{4}$/.test(vehicleYear) : step === 4 ? !roofSetup : false;
  const roofOptions=[
    {value:"Factory roof rails",label:es?"Barras longitudinales de fábrica":"Factory roof rails"},
    {value:"Cross bars",label:es?"Barras transversales":"Cross bars"},
    {value:"Platform rack",label:es?"Baca/plataforma":"Platform rack"},
    {value:"Bare roof",label:es?"Techo sin barras":"Bare roof"},
    {value:"Not sure",label:es?"No estoy seguro":"Not sure"},
  ];
  return <form onSubmit={(e) => submit(e, { vehicle_make: vehicleMake, vehicle_model: vehicleModel, vehicle_year: vehicleYear, roof_setup: roofSetup })} className="form-card">
    <div className="flex items-center justify-between gap-4"><p className="text-xs font-black uppercase tracking-[.16em] text-olive">{es?`Paso ${progress} de 5`:`Step ${progress} of 5`}</p><p className="text-xs text-black/45">{es?"Comprobación de compatibilidad":"Vehicle compatibility check"}</p></div>
    <div className="h-1.5 overflow-hidden rounded-full bg-black/8"><div className="h-full rounded-full bg-[#58664a] transition-all" style={{ width: `${progress * 20}%` }} /></div>
    {step === 1 && <div><label className="text-lg font-black">{es?"Marca del vehículo":"Vehicle manufacturer"}<input autoFocus value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} className={input} placeholder={es?"p. ej. Land Rover":"e.g. Land Rover"} /></label><p className="mt-2 text-sm text-black/50">{es?"Empieza por la marca que aparece en la documentación del vehículo.":"Start with the make shown on the vehicle registration."}</p></div>}
    {step === 2 && <div><label className="text-lg font-black">{es?"Modelo":"Model"}<input autoFocus value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} className={input} placeholder="Discovery Sport" /></label><p className="mt-2 text-sm text-black/50">{es?"Puedes añadir el acabado o tipo de carrocería en las notas si es relevante.":"Trim or body style can be added later in the notes if relevant."}</p></div>}
    {step === 3 && <div><label className="text-lg font-black">{es?"Año":"Year"}<input autoFocus value={vehicleYear} onChange={e => setVehicleYear(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" className={input} placeholder="2022" /></label><p className="mt-2 text-sm text-black/50">{es?"El año ayuda a distinguir estructuras de techo e indicaciones del fabricante.":"Model year helps distinguish roof structures and manufacturer guidance."}</p></div>}
    {step === 4 && <div><p className="text-lg font-black">{es?"¿Qué llevas ya instalado en el techo?":"What is already on the roof?"}</p><div className="mt-4 grid gap-2">{roofOptions.map(option => <button key={option.value} type="button" onClick={() => setRoofSetup(option.value)} className={`min-h-12 rounded-xl border px-4 text-left text-sm font-bold transition ${roofSetup === option.value ? "border-[#58664a] bg-[#eef0e8]" : "border-black/12 bg-white hover:border-black/35"}`}>{option.label}</button>)}</div></div>}
    {step === 5 && <div><div className="rounded-xl bg-[#eef0e8] p-4 text-sm leading-6"><strong>{es?"Lo revisaremos contigo.":"We’ll check it for you."}</strong> {es?"Usamos el vehículo, la configuración del techo y la información del fabricante/baca para orientarte. Este formulario no constituye una garantía universal de compatibilidad.":"We use the vehicle, roof setup and manufacturer/rack information to give guidance. This form does not create a universal fitment guarantee."}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><label>{es?"Nombre":"Name"}<input name="name" autoComplete="name" required className={input} /></label><label>Email<input name="email" type="email" autoComplete="email" required className={input} /></label><label className="md:col-span-2">{es?"Teléfono / WhatsApp":"Phone / WhatsApp"}<input name="phone" type="tel" autoComplete="tel" className={input} /></label><VehiclePhotoUpload locale={locale}/></div><input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" /><Result state={state} /></div>}
    <div className="flex gap-3">{step > 1 && <button type="button" onClick={() => setStep(s => Math.max(1, s - 1))} className="btn-outline">{es?"Atrás":"Back"}</button>}{step < 5 ? <button type="button" disabled={nextDisabled} onClick={() => setStep(s => Math.min(5, s + 1))} className="btn-dark disabled:cursor-not-allowed disabled:opacity-40">{es?"Continuar":"Continue"}</button> : <SendButton busy={busy} locale={locale}>{es?"Enviar comprobación":"Send compatibility check"}</SendButton>}</div>
  </form>;
}

export function ReservationForm({ productId, productName, locale="en" }: { productId: string; productName: string; locale?:Locale }) {
  const { state, busy, submit } = usePublicSubmit("reservation",locale,"reservation_submitted"); const started = useRef(false); const es=locale==="es";
  return <form onSubmit={(e) => submit(e)} className="form-card" onFocusCapture={() => { if (!started.current) { track("reservation_started", { product: productName }); started.current = true; } }}>
    <input type="hidden" name="product_id" value={productId} /><input type="hidden" name="product_name" value={productName} />
    <div className="grid gap-4 md:grid-cols-2"><label>{es?"Nombre":"Name"}<input name="name" autoComplete="name" required className={input} /></label><label>Email<input name="email" type="email" autoComplete="email" required className={input} /></label><label>{es?"Teléfono":"Phone"}<input name="phone" type="tel" autoComplete="tel" required className={input} /></label><label>{es?"Fecha preferida":"Preferred date"}<input name="preferred_date" type="date" className={input} /></label><label>{es?"Marca del vehículo":"Vehicle make"}<input name="vehicle_make" required className={input} /></label><label>{es?"Modelo del vehículo":"Vehicle model"}<input name="vehicle_model" required className={input} /></label><label>{es?"Año del vehículo":"Vehicle year"}<input name="vehicle_year" inputMode="numeric" pattern="[0-9]{4}" className={input} /></label><label className="md:col-span-2">{es?"Mensaje":"Message"}<textarea name="message" rows={3} className={input} /></label></div>
    <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" /><Result state={state}/><p className="text-xs leading-5 text-black/45">{es?"Al enviar este formulario, autorizas a Tenttop a utilizar los datos facilitados para responder a esta solicitud.":"By sending this form, you’re asking Tenttop to use the details you provide to respond to this request."} <Link className="font-bold underline" href={pathForLocale("/legal/privacy",locale)}>{es?"Información de privacidad":"Privacy information"}</Link>.</p><SendButton busy={busy} locale={locale}>{es?"Reservar esta tienda":"Reserve this tent"}</SendButton>
  </form>;
}

export function InstallationForm({locale="en"}:{locale?:Locale}) {
  const { state, busy, submit } = usePublicSubmit("installation",locale,"installation_request"); const es=locale==="es";
  return <form onSubmit={(e) => submit(e)} className="form-card"><div className="grid gap-4 md:grid-cols-2"><label>{es?"Nombre":"Name"}<input name="name" autoComplete="name" required className={input} /></label><label>Email<input name="email" type="email" autoComplete="email" required className={input} /></label><label>{es?"Teléfono":"Phone"}<input name="phone" type="tel" autoComplete="tel" className={input} /></label><label>{es?"Producto":"Product"}<input name="product" className={input} /></label><label>{es?"Vehículo":"Vehicle"}<input name="vehicle" required className={input} /></label><label>{es?"Tipo de barras / baca":"Roof rack / bar type"}<input name="roof_setup" className={input} /></label><label>{es?"Fecha deseada":"Desired date"}<input name="desired_date" type="date" className={input} /></label><label>{es?"Notas":"Notes"}<textarea name="notes" rows={3} className={input} /></label></div><input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" /><Result state={state}/><SendButton busy={busy} locale={locale}>{es?"Solicitar instalación":"Request installation"}</SendButton></form>;
}

export function ContactForm({ defaultMessage = "", locale="en" }: { defaultMessage?: string; locale?:Locale }) {
  const { state, busy, submit } = usePublicSubmit("contact",locale,"contact_enquiry"); const es=locale==="es";
  return <form onSubmit={(e) => submit(e)} className="form-card"><label>{es?"Nombre":"Name"}<input name="name" autoComplete="name" required className={input} /></label><label>Email<input name="email" type="email" autoComplete="email" required className={input} /></label><label>{es?"Teléfono / WhatsApp":"Phone / WhatsApp"}<input name="phone" type="tel" autoComplete="tel" className={input} /></label><label>{es?"¿En qué podemos ayudarte?":"How can we help?"}<textarea name="message" required minLength={5} rows={5} defaultValue={defaultMessage} className={input} /></label><input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" /><Result state={state}/><SendButton busy={busy} locale={locale}>{es?"Enviar consulta":"Send enquiry"}</SendButton></form>;
}
