import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { AppHeader } from "@/components/layout/app-header";
import "./globals.css";

// Google & Apple modern UI font stack
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Production Control Dashboard",
  description: "Internal factory operations and production control system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
        <AppHeader />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
