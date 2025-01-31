// Config
import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
// Components
import Header from "@/ui/layout/header";

export const metadata: Metadata = {
  title: "React challenge",
  description: "React challenge",
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
