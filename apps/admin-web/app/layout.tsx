import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SahakarConnect Admin — Society & Federation Dashboard',
  description: 'Cooperative Society and Federation Governance Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-[#2B2B2B] font-sans antialiased min-h-screen">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
