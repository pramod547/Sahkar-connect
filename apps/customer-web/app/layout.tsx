import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/LanguageContext';
import { BottomNav } from '../components/BottomNav';

export const metadata: Metadata = {
  title: 'SahakarConnect — Cooperative On-Demand Services App',
  description: 'Fair, transparent, cooperative-owned household services platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FEFAF3] text-[#2B2B2B] font-sans antialiased min-h-screen">
        <LanguageProvider>
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl border-x border-[#1B5E4B]/10 relative pb-20">
            {children}
            <BottomNav />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
