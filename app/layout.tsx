import NextAuthProvider from './providers/NextAuthProvider';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Run Club App',
  description: 'A web application for managing run clubs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <NextAuthProvider>
          {/* You can add global components here, like Header and Footer */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
