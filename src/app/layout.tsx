import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { primaryFont } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.className} antialiased`}>{children}</body>
    </html>
  );
}
