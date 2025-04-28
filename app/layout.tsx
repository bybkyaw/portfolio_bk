
import React from 'react';
import './globals.css';
import CustomCursor from './components/effects/CustomCursor';

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
      <body className="bg-black text-white relative z-0">
        <CustomCursor /> 
        {children}
      </body>
    </html>
  );
}

