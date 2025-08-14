import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/tooltip";

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
    <Tooltip delayDuration={delay}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {message && (
        <TooltipContent sideOffset={5} className="pointer-events-none">
          <div className={className}>{message}</div>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
