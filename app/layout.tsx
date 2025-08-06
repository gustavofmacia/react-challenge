// Config
import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
// Components
import Header from "@/ui/layout/header";
import Footer from "@/ui/layout/footer";
// React
import { Suspense } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const metadata: Metadata = {
  title: "Music Admin",
  description:
    "Manage and organize your music collection in the cloud with Music Admin.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <Suspense fallback={<Loading />}>
          <main>
            {modal}
            {children}
          </main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}

function Loading() {
  return (
    <>
      <div className="flex h-dvh w-full items-center justify-center pb-72">
        <AiOutlineLoading3Quarters className="size-28 animate-spin text-primary" />
      </div>
      <span className="sr-only">Loading web site</span>
    </>
  );
}
