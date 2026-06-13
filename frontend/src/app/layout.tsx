import type { Metadata } from 'next';
import AppLayout from '@/layouts/AppLayout';
import { Inter } from 'next/font/google';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
                <AppLayout>{children}</AppLayout>
            </body>
        </html>
    );
}
