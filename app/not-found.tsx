import { Button } from "@/shadcn/button";
import { MdHome } from "react-icons/md";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-2">
      <h1 className="mb-2 text-center text-xl font-bold sm:text-2xl">
        Page not found
      </h1>
      <Button
        variant="link"
        className="flex h-auto p-0 text-lg sm:text-xl"
        asChild
      >
        <Link href="/" prefetch={false}>
          <MdHome className="size-5! sm:size-6!" />
          Go to home page
        </Link>
      </Button>
    </section>
  );
}
