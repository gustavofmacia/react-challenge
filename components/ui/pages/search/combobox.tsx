"use client";

// Next
import { useRouter, useSearchParams } from "next/navigation";
// React
import { useEffect, useState } from "react";
// Icons
import { ChevronDown, CheckIcon, X } from "lucide-react";
// Utils
import { cn } from "@/lib/utils";
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
import { ScrollArea } from "@/shadcn/scroll-area";
// Components
import TooltipCustom from "@/ui/pages/tool-tip-custom";

type Props = {
  className?: string;
  commandInput?: boolean;
  searchParamKey: string;
  placeholder: string;
  values: Set<string>;
};

export default function Combobox({
  className = "",
  commandInput = true,
  searchParamKey,
  placeholder,
  values,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedValue, setSelectedValue] = useState<string>(
    searchParams.get(searchParamKey) || ""
  );

  const params = new URLSearchParams(searchParams);

  // const isHydrated = useHydration();

  useEffect(() => {
    const paramValue = searchParams.get(searchParamKey);

    setSelectedValue(paramValue ? paramValue : "");
  }, [searchParams, searchParamKey]);

  function handleOnSelect(currentValue: string) {
    setSelectedValue(values.has(currentValue) ? "" : currentValue);
    setOpen(false);

    if (currentValue !== selectedValue) {
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
        <TooltipCustom
          message={values.has(selectedValue) ? selectedValue : placeholder}
        >
          <PopoverTrigger asChild>
            <Button
              data-state={open ? "open" : "closed"}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                // "hidden justify-between px-3 font-normal [&[data-state=open]_svg]:rotate-180",
                "inline-flex justify-between px-3 font-normal [&[data-state=open]_svg]:rotate-180",
                className,
                // isHydrated && "inline-flex",
                !selectedValue && "text-muted-foreground"
              )}
            >
              <span className="truncate font-medium">
                {values.has(selectedValue) ? selectedValue : placeholder}
              </span>

              <div className="flex h-full items-center justify-between">
                {selectedValue && (
                  <>
                    <X
                      className="text-muted-foreground hover:text-accent-foreground !pointer-events-auto mx-2 size-4 cursor-pointer"
                      onClick={handleClearSelection}
                    />
                    <Separator
                      orientation="vertical"
                      className="flex h-full min-h-6"
                    />
                  </>
                )}

                <ChevronDown className="ml-2 !size-3.5 shrink-0 opacity-80 transition-transform duration-200" />
              </div>
            </Button>
          </PopoverTrigger>
        </TooltipCustom>
        <PopoverContent className="popover-content w-auto p-0" align="start">
          <Command>
            {commandInput && (
              <div className="hidden sm:block">
                <CommandInput placeholder="Search..." className="h-9" />
                <CommandEmpty className="px-1 py-4 text-center text-sm">
                  No results found.
                </CommandEmpty>
              </div>
            )}
            <CommandList>
              <ScrollArea className="flex max-h-52 flex-col" type="auto">
                <CommandGroup>
                  {[...values].map((value) => (
                    <CommandItem
                      className="flex cursor-pointer justify-between space-x-2"
                      key={value}
                      value={value}
                      onSelect={handleOnSelect}
                    >
                      <span>{value}</span>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === selectedValue ? "opacity-100" : "opacity-0"
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
