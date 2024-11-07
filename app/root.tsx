import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  PrefetchPageLinks,
} from "@remix-run/react";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import "~/styles/tailwind.css";

export default function App() {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <Meta />
        <Links />
        <PrefetchPageLinks page="/posts" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
