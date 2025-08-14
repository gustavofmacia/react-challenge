"use client";

//Components
import TooltipCustom from "@/ui/pages/tool-tip-custom";
// Shadcn
import { Button } from "@/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/popover";
import { Separator } from "@/shadcn/separator";
// utils
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/shadcn/scroll-area";
import NumberHelper from "@/lib/number-helper";
// Hooks
import { useHydrated } from "@/hooks/useHydrated";
// Next
import { useRouter, useSearchParams } from "next/navigation";
// React
import { useEffect, useState } from "react";
// Icons
import { ChevronDown, CheckIcon, X } from "lucide-react";

type Props = {
  className?: string;
  commandInput?: boolean;
  endYear?: number;
  startYear?: number;
};

export default function ComboboxYear({
  className = "",
  commandInput = true,
  endYear = new Date().getFullYear(),
  startYear = 1900,
}: Props) {
  const [open, setOpen] = useState(false);
  const isHydrated = useHydrated();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamKey = "year";

  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get(searchParamKey) || ""
  );

  const params = new URLSearchParams(searchParams);

  const years: string[] = NumberHelper.getRangeDescending(
    startYear,
    endYear
  ).map((year) => year.toString());

  useEffect(() => {
    const paramValue = searchParams.get(searchParamKey);

    setSelectedYear(paramValue ? paramValue : "");
  }, [searchParams]);

  function handleYearSelect(currentValue: string) {
    setSelectedYear(currentValue === selectedYear ? "" : currentValue);
    setOpen(false);

    if (currentValue !== selectedYear) {
      params.set(searchParamKey, currentValue);
      params.set("page", "1");
    } else {
      params.delete(searchParamKey);
      params.delete("page");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }

  function handleClearSelection(event: React.MouseEvent) {
    event.stopPropagation();
    const params = new URLSearchParams(searchParams);
    params.delete(searchParamKey);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipCustom message={selectedYear ? selectedYear : "Year"}>
          <PopoverTrigger asChild>
            <Button
              data-state={open ? "open" : "closed"}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "inline-flex cursor-pointer justify-between px-3 font-normal [&[data-state=open]_svg]:rotate-180",
                className,
                !isHydrated && "animate-pulse cursor-default hover:bg-white",
                !selectedYear && "text-muted-foreground"
              )}
            >
              <span className="truncate font-medium">
                {selectedYear ? selectedYear : "Year"}
              </span>

              <div className="flex h-full items-center justify-between">
                {selectedYear && (
                  <>
                    <X
                      className="text-muted-foreground hover:text-accent-foreground pointer-events-auto! mx-2 size-4! cursor-pointer"
                      onClick={handleClearSelection}
                    />

                    <Separator
                      orientation="vertical"
                      className="flex h-full min-h-6"
                    />
                  </>
                )}

                <ChevronDown className="ml-2 size-3.5! shrink-0 opacity-80 transition-transform duration-200" />
              </div>
            </Button>
          </PopoverTrigger>
        </TooltipCustom>
        <PopoverContent className="popover-content w-auto p-0" align="start">
          <Command>
            {commandInput && (
              <div className="hidden sm:block [&_svg]:size-3.5">
                <CommandInput placeholder="Search..." className="h-9" />
                <CommandEmpty className="px-1 py-4 text-center text-sm">
                  No results found.
                </CommandEmpty>
              </div>
            )}

            <CommandList>
              <ScrollArea className="flex max-h-52 flex-col" type="auto">
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      className="cursor-pointer"
                      key={year}
                      value={year}
                      onSelect={handleYearSelect}
                    >
                      <span>{year}</span>
                      <CheckIcon
                        className={cn(
                          "ml-auto size-3!",
                          selectedYear === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
