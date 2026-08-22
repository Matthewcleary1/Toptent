const deployedUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://tenttop.vercel.app";

export const site = {
  name: "Tenttop",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || deployedUrl,
  location: "Barcelona, Spain",
  email: "",
  whatsapp: process.env.NEXT_PUBLIC_TENTTOP_WHATSAPP || "",
  currency: "EUR",
};

export function formatPrice(value: number, currency = "EUR", locale: "en" | "es" = "en") {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-IE", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function whatsappUrl(message: string) {
  const number = site.whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `/contact?message=${encodeURIComponent(message)}`;
}
