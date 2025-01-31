import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};

export default function Spinner({ className }: Props) {
  return (
    <div
      className={cn(
        "inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className,
      )}
      role="status"
    ></div>
  );
}
