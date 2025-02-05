"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shadcn/button";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import { TableHead } from "@/shadcn/table";
import { useState, useEffect } from "react";
import { cn } from "@//lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  searchParamKey: string;
};

export default function SortTableHead({
  className,
  children,
  searchParamKey,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const currentSort = searchParams.get("sort");
    const currentOrder = searchParams.get("order");

    if (currentSort === searchParamKey) {
      setSortOrder(currentOrder === "asc" ? "asc" : "desc");
    } else {
      setSortOrder("");
    }
  }, [searchParams, searchParamKey]);

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);

    if (sortOrder === "") {
      params.set("sort", searchParamKey);
      params.set("order", "asc");
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      params.set("order", "desc");
      setSortOrder("desc");
    } else {
      params.delete("sort");
      params.delete("order");
      setSortOrder("");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <TableHead className={cn(className, "")}>
      <Button className="-ml-3 px-3" variant="ghost" onClick={handleSort}>
        {children}
        {sortOrder === "asc" ? (
          <ArrowUp />
        ) : sortOrder === "desc" ? (
          <ArrowDown />
        ) : (
          <ArrowUpDown />
        )}
      </Button>
    </TableHead>
  );
}
