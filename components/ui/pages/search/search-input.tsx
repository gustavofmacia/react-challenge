"use client";

// Shadcn
import { Input } from "@/shadcn/input";
// Components
import TooltipCustom from "@/ui/pages/tool-tip-custom";
// Utils
import { cn } from "@/lib/utils";
// Next
import { useRouter, useSearchParams } from "next/navigation";
// React
import { useEffect, useRef, useState } from "react";
// Icons
import { MdSearch } from "react-icons/md";
import { X } from "lucide-react";
// Hooks
import { useHydrated } from "@/hooks/useHydrated";

type Props = {
  className?: string;
  pathName?: string;
  placeholder: string;
  searchParamKey: string;
  tooltip?: boolean;
};

export default function SearchInput({
  className,
  pathName = "",
  placeholder,
  searchParamKey,
  tooltip = true,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<string>(
    searchParams.get(searchParamKey) ?? ""
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isHydrated = useHydrated();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const paramValue = searchParams.get(searchParamKey) ?? "";
    setValue(paramValue);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchParamKey, searchParams]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value;
    setValue(currentValue);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (currentValue) {
        params.set(searchParamKey, currentValue);
        params.set("page", "1");
      } else {
        params.delete(searchParamKey);
        params.delete("page");
      }
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    }, 600);
  }

  function handleClear() {
    params.delete(searchParamKey);
    params.delete("page");

    router.push(`?${params.toString()}`, {
      scroll: false,
    });

    setValue("");

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    inputRef.current?.focus();
  }

  return (
    <>
      <TooltipCustom message={tooltip ? value : null}>
        <div className={cn(className, "relative")}>
          <Input
            ref={inputRef}
            value={value ?? ""}
            onChange={handleOnChange}
            className={cn(
              "truncate pr-9 text-sm font-medium",
              !isHydrated &&
                "pointer-events-none animate-pulse *:pointer-events-none hover:bg-white"
            )}
            placeholder={placeholder}
          />

          {value ? (
            <X
              onClick={handleClear}
              className="text-muted-foreground hover:text-accent-foreground absolute top-2.5 right-3 size-4 cursor-pointer"
            />
          ) : (
            <MdSearch
              onClick={() => inputRef.current?.focus()}
              className="text-muted-foreground absolute top-2.5 right-3 size-4 cursor-text"
            />
          )}
        </div>
      </TooltipCustom>
    </>
  );
}
