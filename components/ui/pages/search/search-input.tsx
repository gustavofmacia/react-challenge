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

  const [value, setValue] = useState<string | null>(
    searchParams.get(searchParamKey)
  );

  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const params = new URLSearchParams(searchParams);

  // const isHydrated = useHydration();

  useEffect(() => {
    const paramValue = searchParams.get(searchParamKey);
    setValue(paramValue ? paramValue : "");

    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [searchParams, searchParamKey]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value;
    setValue(currentValue);

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    timeOut.current = setTimeout(() => {
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

    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

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
            className={cn("truncate pr-9 text-sm font-medium")}
            placeholder={placeholder}
          />

          {value ? (
            <X
              onClick={handleClear}
              className="absolute right-3 top-2.5 size-4 cursor-pointer text-muted-foreground hover:text-accent-foreground"
            />
          ) : (
            <MdSearch
              onClick={() => inputRef.current?.focus()}
              className="absolute right-3 top-2.5 size-4 cursor-text text-muted-foreground"
            />
          )}
        </div>
      </TooltipCustom>
    </>
  );
}
