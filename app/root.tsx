import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";

import styles from "~/tailwind.css";
import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
  type Theme,
} from "~/utils/themeProvider";
import { getThemeSession } from "~/utils/theme.server";
import { Navbar } from "~/components/Navbar";

export type LoaderData = {
  theme: Theme | null;
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }: LoaderArgs) => {
  const themeSession = await getThemeSession(request);

  return json({
    theme: themeSession.getTheme(),
  });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const [theme] = useTheme();
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className={theme ?? ""}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="dark:bg-zinc-900">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <LiveReload />
      </body>
    </html>
  );
}
