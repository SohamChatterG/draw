import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";

// Load the custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Go-Draw",
  description: "A collaborative drawing app built with Convex and Next.js",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap content with ConvexClientProvider and Toaster */}
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
