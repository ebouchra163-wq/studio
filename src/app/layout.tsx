import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Aplicació Global Cargo Care',
  description: "El vostre soci de confiança per a solucions globals d'enviament i logística.",
  icons: {
    icon: '/Logo_Bouchra__2_-removebg-preview.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="h-full">
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="relative flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
