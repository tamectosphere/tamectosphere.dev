/* eslint-disable @typescript-eslint/no-explicit-any */
import { cssBundleHref } from '@remix-run/css-bundle';
import { type LinksFunction, type MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import tailwindStyleSheetUrl from './styles/tailwind.css';
import { useNonce } from './utils/nonce-provider';
import { GeneralErrorBoundary } from './components/common/GeneralErrorBoundary';
import { Footer } from './components/layouts/Footer';
import { NavbarMenu } from './components/layouts/Navbar';

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', href: tailwindStyleSheetUrl, as: 'style' },
    cssBundleHref ? { rel: 'preload', href: cssBundleHref, as: 'style' } : null,
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: tailwindStyleSheetUrl },
    cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : null,
  ].filter(Boolean) as [];
};

export const meta: MetaFunction = () => {
  return [
    { title: 'TamEctosphere - Software Developer Portfolio' },
    {
      name: 'description',
      content: `Experience. innovation and creativity with my portfolio website, where I showcase my extensive skills as a seasoned software developer. From web applications to mobile development, my expertise in various programming languages and frameworks will elevate your project to the next level. Explore my portfolio today and let's turn your ideas into reality.`,
    },
    {
      name: 'author',
      content: 'Pattadon Sa-ngasri',
    },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, user-scalable=no' },
    {
      name: 'og:author',
      content: 'Pattadon Sa-ngasri',
    },
    { property: 'og:title', content: 'TamEctosphere' },
    {
      property: 'og:description',
      content: `Experience. innovation and creativity with my portfolio website, where I showcase my extensive skills as a seasoned software developer. From web applications to mobile development, my expertise in various programming languages and frameworks will elevate your project to the next level. Explore my portfolio today and let's turn your ideas into reality.`,
    },
    {
      name: 'og:type',
      content: 'website',
    },
    {
      property: 'og:image',
      content:
        'https://lh3.googleusercontent.com/pw/ABLVV866RvIWw4HRk60H7gAkgKbq0Jszc90xSwNoF0OOrfbrnKpnHt75Q_-Wf3m3P9hlaiQI_4X6zTjUpavD-gvwE7xN2n1XtCOrKbMEu2QX5RbiiW9xzP9QGTa1iaXRYHGA_ZDu699MUFgvQRGZjlKicAc=w574-h88-s-no-gm',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ];
};

export async function loader() {
  const currentYear = new Date().getFullYear();

  return { currentYear };
}

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
    <html
      lang="en"
      className={`dark min-h-screen overflow-x-hidden font-ectopic`}
    >
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body className="bg-background text-foreground">
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
  const { currentYear } = useLoaderData<typeof loader>();
  const nonce = useNonce();

  return (
    <Document nonce={nonce}>
      <NavbarMenu />
      <Outlet />
      <Footer year={currentYear} />
    </Document>
  );
}

export function ErrorBoundary() {
  const nonce = useNonce();

  return (
    <Document nonce={nonce}>
      <GeneralErrorBoundary />
    </Document>
  );
}
