"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/dialog";

type Props = { children: React.ReactNode; title: string };

export default function Modal({ children, title }: Props) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="w-120! max-w-[92%]! rounded-lg p-10 [&_button]:cursor-pointer [&_svg]:size-5">
        <DialogHeader>
          <DialogTitle className="text-1.2xl text-primary 2xl:text-2.6xl z-0 text-left font-bold md:text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {`Details about ${title}.`}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
