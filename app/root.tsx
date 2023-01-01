import React from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

import { Navbar } from "./components/Navbar";
import { ThemeContext } from "~/contexts/ThemeContext";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { darkMode } = React.useContext(ThemeContext) || {};
  console.log("darkMode: ", darkMode);
  return (
    <html className={`${darkMode ? "dark" : ""}`} lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-zinc-900">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
