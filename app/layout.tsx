import "./globals.css";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ReduxProviders } from "@/store/ReduxProviders";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinTrack Wallet Ledger",
  description: "Financial tracking dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} bg-background-main text-primary-dark px-8`}
      >
        <ReduxProviders>
          <Header />
          <div className="flex h-screen mt-2 ">
            <Sidebar />
            <main className={`flex-1 transition-all duration-300`}>
              {children}
            </main>
          </div>
        </ReduxProviders>
      </body>
    </html>
  );
}
