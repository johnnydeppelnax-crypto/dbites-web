import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "D-Bites | Premium Dehydrated Fruits & Gourmet Snacks",
  description:
    "D-Bites is a mobile social hub designed to elevate the street-side dining experience. We specialize in premium dehydrated fruits and gourmet snacks, bringing sophistication to every bite.",
  keywords: [
    "D-Bites",
    "dehydrated fruits",
    "dried fruits",
    "gourmet snacks",
    "premium snacks",
    "healthy snacks",
    "mobile lounge",
  ],
  authors: [{ name: "D-Bites" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "D-Bites | Premium Dehydrated Fruits",
    description:
      "The best taste in premium dehydrated fruits and gourmet snacks.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
