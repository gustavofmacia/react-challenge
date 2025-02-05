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
      <DialogContent className="!w-[30rem] !max-w-[92%] rounded-lg p-10 [&_svg]:size-5">
        <DialogHeader>
          <DialogTitle className="z-0 text-left text-1.2xl font-bold text-primary md:text-2xl 2xl:text-2.6xl">
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
