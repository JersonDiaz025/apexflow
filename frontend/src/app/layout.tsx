import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sileo';
import { ModalProvider } from '@/providers/modal.provider';

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
                <Toaster position='top-right' />
                <ModalProvider />
                {children}
            </body>
        </html>
    );
}
