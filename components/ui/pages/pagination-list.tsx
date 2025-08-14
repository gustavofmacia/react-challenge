"use client";

// Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { Button } from "@/shadcn/button";
// Next
import { useRouter } from "next/navigation";
import Link from "next/link";
// Constants
import { ALLOWED_LIMITS } from "@/config/constants";
// Icons
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  pagination: Pagination;
  searchParams: SearchParams;
};

export function PaginationList({ pagination, searchParams }: Props) {
  const router = useRouter();

  const { currentPage, first, prev, next, last, rowsPerPage } = pagination;

  const createPageURL = (pageNumber?: number, limit?: string) => {
    const params = new URLSearchParams(searchParams);

    if (!pageNumber && !limit) return "?";

    if (pageNumber) params.set("page", pageNumber.toString());
    if (limit) params.set("limit", limit);

    return "?" + params.toString();
  };

  const isFirstPage = currentPage === first;
  const isLastPage = currentPage === last;

  return (
    <div className="mt-8 flex flex-col items-end justify-end gap-4 sm:flex-row-reverse sm:justify-start sm:gap-7">
      <div className="flex items-center gap-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {last}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isFirstPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isFirstPage}
            aria-label="Go to first page"
          >
            <Link tabIndex={isFirstPage ? -1 : 0} href={createPageURL(1)}>
              <ChevronsLeft />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isFirstPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isFirstPage}
            aria-label="Go to previous page"
          >
            <Link tabIndex={isFirstPage ? -1 : 0} href={createPageURL(prev)}>
              <ChevronLeft />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isLastPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isLastPage}
            aria-label="Go to next page"
          >
            <Link tabIndex={isLastPage ? -1 : 0} href={createPageURL(next)}>
              <ChevronRight />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isLastPage ? "pointer-events-none opacity-50" : ""}`}
            disabled={isLastPage}
            aria-disabled={isLastPage}
            aria-label="Go to last page"
          >
            <Link tabIndex={isLastPage ? -1 : 0} href={createPageURL(last)}>
              <ChevronsRight />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={rowsPerPage}
          onValueChange={(value) => {
            router.push(createPageURL(1, value));
          }}
        >
          <SelectTrigger
            size="sm"
            className="!mr-0 min-w-[58px] cursor-pointer"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {ALLOWED_LIMITS.map((pageSize) => (
              <SelectItem
                className="cursor-pointer"
                key={pageSize}
                value={`${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
