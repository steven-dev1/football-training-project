'use client'
import { Montserrat } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/Navs/MainNav";
import { Providers } from "@/redux/providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${montserrat.className}`}>
        <Providers>
          <header>
            <MainNav />
          </header>
          <main className='flex pt-[125px] items-start max-w-[1280px] justify-center mx-auto'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
