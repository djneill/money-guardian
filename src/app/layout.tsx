import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import {
//   ClerkProvider,
// SignInButton,
// SignedIn,
// SignedOut,
// UserButton
// } from '@clerk/nextjs'

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
  description: "Personal Finance App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body
        className={`${publicSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SignedOut>
            <div className="">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        {children}
      </body>
    </html>
    // </ClerkProvider>
  );
}