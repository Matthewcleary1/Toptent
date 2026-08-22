"use client";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { callPublicSite } from "@/lib/public-api";
import { registerProductImage } from "@/app/admin/actions";
import type { Locale } from "@/lib/i18n/config";
import { localizeServerMessage } from "@/lib/i18n/messages";

export function VehiclePhotoUpload({locale="en"}:{locale?:Locale}) {
  const [path, setPath] = useState("");
  const [status, setStatus] = useState("");
  const es=locale==="es";
  async function choose(file?: File) {
    if (!file) { setPath(""); setStatus(""); return; }
    setStatus(es?"Preparando subida…":"Preparing upload…");
    try {
      const token = await callPublicSite("compatibility_upload_token", { name: file.name, type: file.type, size: file.size });
      if (!token.ok || !token.path || !token.token) throw new Error(token.message ? localizeServerMessage(token.message,locale) : (es?"No se ha podido preparar la subida":"Could not prepare upload"));
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.storage.from("customer-vehicle-uploads").uploadToSignedUrl(token.path, token.token, file, { contentType: file.type });
      if (error) throw error;
      setPath(token.path); setStatus(es?"Foto lista ✓":"Photo ready ✓");
    } catch (e: any) { setPath(""); setStatus(e?.message || (es?"Error al subir":"Upload failed")); }
  }
  return <label className="md:col-span-2">{es?"Foto del vehículo":"Vehicle photo"} <span className="text-black/45">({es?"opcional":"optional"})</span><input type="file" accept="image/jpeg,image/png,image/webp,image/heic" className="input" onChange={e => choose(e.target.files?.[0])} /><input type="hidden" name="vehicle_photo_path" value={path} />{status && <span className="text-xs font-medium text-black/55">{status}</span>}</label>;
}

export function AdminProductImageUploader({ productId, defaultAlt }: { productId: string; defaultAlt: string }) {
  const [file, setFile] = useState<File | null>(null); const [alt, setAlt] = useState(defaultAlt); const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
  async function upload() {
    if (!file) return;
    setBusy(true); setStatus("Uploading…");
    try {
      const r = await fetch("/api/admin/product-image-upload-token", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId, name: file.name, type: file.type, size: file.size }) });
      const t = await r.json(); if (!r.ok) throw new Error(t.error || "Could not prepare upload");
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.storage.from("product-images").uploadToSignedUrl(t.path, t.token, file, { contentType: file.type }); if (error) throw error;
      await registerProductImage(productId, t.path, alt); setStatus("Uploaded ✓"); setFile(null);
    } catch (e: any) { setStatus(e?.message || "Upload failed"); } finally { setBusy(false); }
  }
  return <div className="grid gap-3"><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e => setFile(e.target.files?.[0] || null)} /><label>Alt text<input className="input" value={alt} onChange={e => setAlt(e.target.value)} /></label><button type="button" disabled={!file || busy} onClick={upload} className="btn-dark disabled:opacity-50">{busy ? "Uploading…" : "Upload"}</button>{status && <p className="text-xs text-black/55">{status}</p>}</div>;
}
