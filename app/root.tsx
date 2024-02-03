import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useNonce } from './routes/utils/nonce-provider';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

function Document({
  children,
  nonce,
  env = {},
}: {
  children: React.ReactNode;
  nonce: string;
  env?: Record<string, string>;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body>
        {children}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const nonce = useNonce();

  return (
    <Document nonce={nonce}>
      <Outlet />
    </Document>
    // <html lang="en">
    //   <head>
    //     <meta charSet="utf-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <Meta />
    //     <Links />
    //   </head>
    //   <body>
    //     <Outlet />
    //     <ScrollRestoration />
    //     <Scripts />
    //     <LiveReload />
    //   </body>
    // </html>
  );
}
