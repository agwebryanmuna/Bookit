import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookit App | Book a Room",
  description: "Book a meeting or conference room for your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${inter.variable} antialiased`}
    >
      <Header/>
      <main className={'mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'}>
        {children}
      </main>
      <ToastContainer />
    <Footer/>
    </body>
    </html>
  );
}
