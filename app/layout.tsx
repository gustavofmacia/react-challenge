// Config
import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
// Components
import Header from "@/ui/layout/header";

export const metadata: Metadata = {
  title: "Cloud Music",
  description: "Cloud Music is a music streaming service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
