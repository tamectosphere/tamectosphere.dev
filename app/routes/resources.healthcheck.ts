import { type LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');

  const protocol = new URL(request.url).protocol;

  try {
    await fetch(`${protocol}${host}`, {
      method: 'HEAD',
      headers: { 'X-Healthcheck': 'true' },
    });

    return new Response('OK');
  } catch (error: unknown) {
    console.log('healthcheck ❌', { error });
    return new Response('ERROR', { status: 500 });
  }
}
