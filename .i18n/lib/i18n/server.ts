import { headers } from "next/headers";
import type { Metadata } from "next";
import { pathForLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  return requestHeaders.get("x-tenttop-locale") === "es" ? "es" : "en";
}

export function localeAlternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: pathForLocale(path, locale),
    languages: {
      en: pathForLocale(path, "en"),
      es: pathForLocale(path, "es"),
      "x-default": pathForLocale(path, "en"),
    },
  };
}
