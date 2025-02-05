import { Info } from "lucide-react";

import { Button } from "@/shadcn/button";
import Link from "next/link";
import TooltipCustom from "../../pages/tool-tip-custom";

type Props = { href: string };

export function InfoButton({ href }: Props) {
  return (
    <TooltipCustom message="Click for more details">
      <Button
        tabIndex={0}
        asChild
        variant="ghost"
        size="icon"
        className="cursor-pointer"
      >
        <Link href={href}>
          <Info />
        </Link>
      </Button>
    </TooltipCustom>
  );
}
