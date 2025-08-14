// Next
import { Metadata } from "next";
// React
import { Suspense } from "react";
// Components
import BandsTable from "@/ui/pages/bands/bands-table";
import BandsFilterMenu from "@/components/ui/pages/bands/bands-filter-menu";
// Shadcn
import { Skeleton } from "@/shadcn/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/shadcn/table";

export const metadata: Metadata = {
  title: "Bands",
};

type Props = {
  searchParams?: Promise<SearchParams & BandSearchParams>;
};

export default async function BandsPage(props: Props) {
  const searchParams = (await props.searchParams) || {};
  const SuspenseKey = JSON.stringify(searchParams);

  return (
    <>
      <BandsFilterMenu />

      <Suspense key={SuspenseKey} fallback={<BandsTableSkeleton />}>
        <BandsTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function BandsTableSkeleton({ limit = 5 }: { limit?: number }) {
  return (
    <div className="opacity-70">
      {/* Table */}
      <div className="rounded-md border">
        <Table className="w-full table-fixed animate-pulse">
          <TableHeader>
            <TableRow className="*:pointer-events-none">
              <TableHead>Name</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="w-12 sm:w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="*:pointer-events-none">
            {[...Array(limit)].map((_, i) => (
              <TableRow key={i} className="*:py-3">
                <TableCell>
                  <Skeleton className="h-5 w-24 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12 rounded" />
                </TableCell>
                <TableCell className="w-12 sm:w-20">
                  <Skeleton className="mx-2 size-4 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-col items-end justify-end gap-4 sm:flex-row-reverse sm:justify-start sm:gap-7">
        <div className="flex items-center gap-2">
          <Skeleton className="flex h-8 w-[100px] items-center justify-center rounded text-sm font-medium" />
          <div className="flex items-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="flex size-8 rounded-md p-0" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <Skeleton className="h-8 w-24 rounded text-sm font-medium" />
          <Skeleton className="h-8 w-[58px] rounded" />
        </div>
      </div>
    </div>
  );
}
