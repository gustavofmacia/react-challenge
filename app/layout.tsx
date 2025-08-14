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
      <body className={`${roboto.className} min-h-dvh antialiased`}>
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            {modal}
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Loading() {
  return (
    <>
      <div className="container-main mt-44 flex justify-center">
        <AiOutlineLoading3Quarters className="text-primary size-28 animate-spin" />
      </div>
      <span className="sr-only">Loading web site</span>
    </>
  );
}
