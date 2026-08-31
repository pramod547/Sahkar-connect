import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SahakarConnect — Cooperative On-Demand Services',
  description: 'Fair, transparent, cooperative-owned household services platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FBF7EF] text-[#2B2B2B] font-sans antialiased min-h-screen">
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-md relative">
          {children}
        </main>
      </body>
    </html>
  );
}
