import type { Metadata } from 'next';
// import AuthProvider from '@/providers/auth.provider';
// import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import AppLayout from '@/layouts/AppLayout';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AppexFlow',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='es' className={`${inter.variable}`}>
            <body className='antialiased'>
                {children}
                {/* <AppLayout>{children}</AppLayout> */}
                {/* <Suspense fallback={null}> */}
                    {/* <AuthProvider>{children}</AuthProvider> */}
                {/* </Suspense> */}
            </body>
        </html>
    );
}
