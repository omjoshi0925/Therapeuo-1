import './globals.css';
import localFont from 'next/font/local';

const zodiak = localFont({
  src: [
    {
      path: '../public/fonts/Zodiak-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Zodiak-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const archivo = localFont({
  src: [
    {
      path: '../public/fonts/Archivo-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Archivo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Therapeuo — Smart Weight-Bearing Insole',
  description:
    'A wearable pressure sensor system for physical therapy patients. Real-time weight-bearing feedback. No guesswork. No delay.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${zodiak.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
