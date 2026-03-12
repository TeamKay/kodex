import arcjet, { createMiddleware, detectBot } from "@arcjet/next";
import { env } from "./lib/env";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const aj = arcjet({
  key: env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
        "STRIPE_WEBHOOK" // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
  ],
});

 async function authMiddleware(request: NextRequest) {
 	const sessionCookie = getSessionCookie(request);

 	if (!sessionCookie) {
 		return NextResponse.redirect(new URL("/login", request.url));
 	}

 	return NextResponse.next();
 }

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export default createMiddleware(aj, async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);

	if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/dashboard")){
    if (!sessionCookie){
      return NextResponse.redirect(new URL("/login", request.url));
    }
		return authMiddleware(request);
	}

	return NextResponse.next();
});


export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.pathname;

  if (url.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.startsWith("/educator") && role !== "educator") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
