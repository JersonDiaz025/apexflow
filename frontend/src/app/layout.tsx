import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sileo';

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
                {children}
                {/* <AppLayout>{children}</AppLayout> */}
                {/* <Suspense fallback={null}> */}
                {/* <AuthProvider>{children}</AuthProvider> */}
                {/* </Suspense> */}
            </body>
        </html>
    );
}
