'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/Navs/MainNav";
import StoreProvider from "@/redux/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        <StoreProvider>
          <header>
            <MainNav />
          </header>
          <main className='flex pt-[100px] items-start max-w-[1280px] justify-center mx-auto'>
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
