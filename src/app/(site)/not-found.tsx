import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | ALC Trading',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main className="sm:flex items-center">
          <p className="text-4xl font-extrabold text-brand-primary sm:text-6xl border-brand-light sm:border-r-[6px] sm:pr-6">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-transparent sm:pl-6 text-center sm:text-left">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl uppercase">Page not found</h1>
              <p className="mt-2 text-lg text-slate-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-8 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6 justify-center sm:justify-start">
              <Link href="/" className="inline-flex items-center px-8 py-4 border border-slate-200 text-sm font-bold text-white bg-gradient-to-b from-brand-light to-brand-primary hover:from-white hover:to-white hover:text-brand-primary hover:border-brand-primary transition-colors uppercase tracking-widest shadow-lg">
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
