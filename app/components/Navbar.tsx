import { Link } from '@remix-run/react';

export function NavbarMenu() {
  return (
    <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4 sm:px-6 lg:px-8 ">
      <Link className="text-quicksand font-bold " to="/">
        <img
          src="/images/logo.png"
          className="w-48 md:w-52 lg:w-56 xl:w-60 2xl:w-64 3xl:w-64"
          alt="Tametosphere Logo"
        />
      </Link>
    </div>
  );
}
