import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;
    const isPublicPath =
      path === "/" ||
      path === "/harfenunterricht" ||
      path.startsWith("/angebot/") ||
      path === "/veranstaltungen" ||
      path.startsWith("/veranstaltungen/") ||
      path === "/blog" ||
      path.startsWith("/blog/") ||
      path === "/kontakt" ||
      path === "/login" ||
      path.startsWith("/rechtliches/") ||
      path.startsWith("/region/") ||
      path === "/faq" ||
      path === "/preise" ||
      path === "/repertoire" ||
      path === "/ueber-mich" ||
      path === "/sitemap.xml" ||
      path === "/robots.txt";

    if (
      !user &&
      !isPublicPath &&
      !path.startsWith("/auth") &&
      (path.startsWith("/dashboard") || path.startsWith("/protected"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
