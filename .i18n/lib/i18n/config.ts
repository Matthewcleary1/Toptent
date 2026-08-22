export const supportedLocales = ["en", "es"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";
export const plannedLocales = ["ca"] as const;

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function pathForLocale(path: string, locale: Locale): string {
  if (!path || path === "/") return locale === "es" ? "/es" : "/";
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const splitIndex = path.search(/[?#]/);
  const pathname = splitIndex === -1 ? path : path.slice(0, splitIndex);
  const suffix = splitIndex === -1 ? "" : path.slice(splitIndex);
  const clean = pathname.startsWith("/es/") ? pathname.slice(3) : pathname === "/es" ? "/" : pathname;
  const localized = locale === "es" ? `/es${clean === "/" ? "" : clean}` : clean;
  return `${localized}${suffix}`;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function unprefixedPath(pathname: string): string {
  if (pathname === "/es") return "/";
  return pathname.startsWith("/es/") ? pathname.slice(3) : pathname;
}
