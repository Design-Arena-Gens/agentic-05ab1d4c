import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orange Blossom Alliance ? Track Impact",
  description:
    "Donation tracker to visualize impact for Orange Blossom Alliance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <header className="border-b border-gray-200">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-full bg-oba-primary" />
              <span className="font-semibold">Orange Blossom Alliance</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link className="hover:text-oba-primary" href="/">Dashboard</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-12">
          <div className="container py-6 text-sm text-gray-500">
            ? {new Date().getFullYear()} Orange Blossom Alliance
          </div>
        </footer>
      </body>
    </html>
  );
}
