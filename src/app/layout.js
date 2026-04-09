import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  title: 'The Grand Experience',
  description: 'An evening unlike any other',
};

export default function RootLayout({ children }) {
  const fontClasses = `${cinzel.variable} ${cormorant.variable} ${jost.variable}`;
  
  return (
    <html lang="en" className={fontClasses}>
      <body className={`min-h-full flex flex-col ${fontClasses}`}>
        {children}
      </body>
    </html>
  );
}