'use client';

import { AuthLayoutProps } from '@/interfaces/auth-layout.interface';

export function AuthLayout({
    children,
    footerActionText,
    footerLinkText,
    footerHref,
}: AuthLayoutProps) {
    return (
        <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans antialiased'>
            <main className='w-full max-w-sm z-10 animate-in fade-in slide-in-from-bottom-4 duration-300'>
                {children}
                <footer className='mt-12 text-center space-y-4'>
                    <p className='text-sm'>
                        {footerActionText}
                        <a
                            href={footerHref}
                            className='font-semibold text-primary transition-colors ml-1'
                        >
                            {footerLinkText}
                        </a>
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default AuthLayout;
