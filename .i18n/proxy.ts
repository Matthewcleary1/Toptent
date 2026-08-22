import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  const originalPath=request.nextUrl.pathname;

  if (originalPath === "/es" || originalPath.startsWith("/es/")) {
    if (originalPath === "/es/admin" || originalPath.startsWith("/es/admin/")) {
      const destination=request.nextUrl.clone(); destination.pathname=originalPath.slice(3) || "/admin"; return NextResponse.redirect(destination);
    }
    const destination=request.nextUrl.clone(); destination.pathname=originalPath === "/es" ? "/" : originalPath.slice(3);
    const requestHeaders=new Headers(request.headers); requestHeaders.set("x-tenttop-locale","es");
    const response=NextResponse.rewrite(destination,{request:{headers:requestHeaders}});
    response.cookies.set("tenttop_locale","es",{path:"/",sameSite:"lax",maxAge:60*60*24*365});
    return response;
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet, cacheHeaders) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(cacheHeaders ?? {}).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const role = (data?.claims?.app_metadata as { role?: string } | undefined)?.role;
  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin") && !path.startsWith("/admin/login") && !path.startsWith("/admin/register") && role !== "admin") {
    const destination = request.nextUrl.clone(); destination.pathname = "/admin/login"; return NextResponse.redirect(destination);
  }
  return response;
}

export const config = { matcher: ["/admin/:path*", "/auth/:path*", "/es", "/es/:path*"] };
