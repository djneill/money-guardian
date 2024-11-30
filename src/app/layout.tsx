import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const publicSans = localFont({
  src: [
    {
      path: '../../public/assets/fonts/PublicSans-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/PublicSans-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-public-sans',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Money Guardian",
  description: "Personal Finance App by DJ Neill",
  openGraph: {
    title: 'Money Guardian',
    description: 'Personal Finance App by DJ Neill',
    images: [
      {
        url: 'https://money-guardian.vercel.app/assets/images/MgMeta.png',
        width: 1200,
        height: 630,
        alt: 'Money Guardian',
      },
    ],
    siteName: 'Money Guardian',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Money Guardian',
    description: 'Personal Finance App by DJ Neill',
    images: ['https://money-guardian.vercel.app/assets/images/MgMeta.png'],
    creator: '@CodingGuitarist',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}