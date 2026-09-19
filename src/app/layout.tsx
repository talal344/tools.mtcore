import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tools.MTCore | Premium Utility Platform",
  description: "A high-end, professional suite of online utility tools including PDF converters, EDI processors, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="bg-gradient-mesh" />
        {children}
      </body>
    </html>
  );
}
