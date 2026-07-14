import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import BrandTitle from "@/components/BrandTitle";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI超级单词表",
  description: "使用AI生成主题相关的英语单词表",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-16 sm:pt-24">
          <div className="pointer-events-auto">
            <BrandTitle />
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
