import type { Metadata } from "next";
import "./globals.css";
import { CustomFontLoader } from "@/app/components/layout/CustomFontLoader";

export const metadata: Metadata = {
  title: "极光导航 - 您的个性化起始页",
  description: "极光导航 (Aurora Nav) - 一个简约、美观、可高度定制的浏览器起始页。",
  icons: {
    icon: '/icon.png',
  },
};

import { FontProvider } from '@/app/context/FontContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <FontProvider>
          <CustomFontLoader />
          {children}
        </FontProvider>
      </body>
    </html>
  );
}
