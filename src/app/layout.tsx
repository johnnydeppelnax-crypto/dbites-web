import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F97316",
};

export const metadata: Metadata = {
  title: "D-Bites | Premium Dehydrated Fruits & Tropical Snacks",
  description:
    "D-Bites is a mobile social hub designed to elevate the street-side dining experience. We specialize in premium dehydrated fruits and gourmet snacks, bringing tropical sunshine to every bite.",
  keywords: [
    "D-Bites",
    "dehydrated fruits",
    "dried fruits",
    "gourmet snacks",
    "premium snacks",
    "healthy snacks",
    "mobile lounge",
    "tropical fruits",
  ],
  authors: [{ name: "D-Bites" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/dbites-logo.png",
    apple: "/dbites-logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "D-Bites",
  },
  openGraph: {
    title: "D-Bites | Taste The Tropical Sunshine",
    description:
      "The best taste in premium dehydrated fruits and gourmet tropical snacks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/dbites-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
