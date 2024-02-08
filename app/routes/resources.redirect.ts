import { type LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url) as any;
  const redirectUrl = url.searchParams.get('redirectUrl');
  return redirect(redirectUrl);
}
