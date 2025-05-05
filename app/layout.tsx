import React from 'react';
import './globals.css';
import CustomCursor from './components/effects/CustomCursor';
import { MusicProvider } from '@/context/MusicContext'; // ✅ Import the provider

export const metadata = {
  title: 'BilyKy',
  description: 'Personal Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative z-0">
        <CustomCursor />
        <MusicProvider> {/* ✅ Wrap your entire app */}
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}



