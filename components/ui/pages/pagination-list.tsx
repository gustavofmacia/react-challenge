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

  const { first, prev, next, last, rowsPerPage } = pagination;

  const createPageURL = (pageNumber?: number, limit?: string) => {
    const params = new URLSearchParams(searchParams);

    if (!pageNumber && !limit) return "?";

    if (pageNumber) params.set("page", pageNumber.toString());
    if (limit) params.set("limit", limit);

    return "?" + params.toString();
  };

  const isPrevPage = first === pagination.currentPage;
  const isNextPage = last === pagination.currentPage;

  return (
    <div className="mt-8 flex flex-col items-end justify-end gap-4 sm:flex-row-reverse sm:justify-start sm:gap-7">
      <div className="flex items-center gap-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.currentPage} of {last}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isPrevPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isPrevPage}
            aria-label="Go to first page"
          >
            <Link tabIndex={isPrevPage ? -1 : 0} href={createPageURL(1)}>
              <ChevronsLeft />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isPrevPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isPrevPage}
            aria-label="Go to previous page"
          >
            <Link tabIndex={isPrevPage ? -1 : 0} href={createPageURL(prev)}>
              <ChevronLeft />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isNextPage ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={isNextPage}
            aria-label="Go to next page"
          >
            <Link tabIndex={isNextPage ? -1 : 0} href={createPageURL(next)}>
              <ChevronRight />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className={`flex size-8 p-0 ${isNextPage ? "pointer-events-none opacity-50" : ""}`}
            disabled={isNextPage}
            aria-disabled={isNextPage}
            aria-label="Go to last page"
          >
            <Link tabIndex={isNextPage ? -1 : 0} href={createPageURL(last)}>
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
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={rowsPerPage} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 30].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
