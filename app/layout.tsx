import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ivy Lee — Portfolio',
  description: 'Engineering, product, growth, and leadership work by Ivy Lee.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
