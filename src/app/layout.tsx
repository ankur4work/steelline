import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SteelLine Logistics - Reliable Freight & Trucking Services",
  description: "India's trusted logistics partner. Book trucks, track shipments, and manage freight with ease. Pan-India coverage with professional drivers.",
  keywords: "logistics, trucking, freight, cargo transport, India, steellinelogistics.in",
  metadataBase: new URL("https://steellinelogistics.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#080c14]`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
