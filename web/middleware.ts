export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/actor",
    "/dataset",
    "/endpoint",
    "/group",
    "/infrastructure",
    "/presentation",
    "/product",
    "/project",
    "/service",
    "/software",
    "/technology",
    "/timeline",
    "/studio",
    "/actor/:path*",
    "/dataset/:path*",
    "/endpoint/:path*",
    "/group/:path*",
    "/infrastructure/:path*",
    "/presentation/:path*",
    "/product/:path*",
    "/project/:path*",
    "/service/:path*",
    "/software/:path*",
    "/technology/:path*",
    "/timeline/:path*",
    "/studio/:path*",
  ]
}