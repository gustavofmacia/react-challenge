import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn/tooltip";

type Props = {
  children: React.ReactNode;
  message: string | null;
  delay?: number;
  className?: string;
};

export default function TooltipCustom({
  children,
  message,
  delay = 700,
  className = "",
}: Props) {
  return (
    <TooltipProvider delayDuration={delay} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {message && (
          <TooltipContent sideOffset={5}>
            <div className={className}>{message}</div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
