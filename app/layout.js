import './globals.css';

export const metadata = {
  title: 'Therapeuo — Smart Weight-Bearing Insole',
  description:
    'A wearable pressure sensor system for physical therapy patients. Real-time weight-bearing feedback. No guesswork. No delay.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
