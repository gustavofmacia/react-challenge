import SortTableHead from "@/components/ui/table/sort-table-head";
import { InfoButton } from "@/ui/table/actions/info-button";
import { fetchBands } from "@/server-actions/bands-server-actions";
import { PaginationList } from "../pagination-list";
import { Button } from "@/shadcn/button";
import Link from "next/link";
import { MdRestartAlt } from "react-icons/md";
// Shadcn
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/shadcn/table";

type Props = {
  searchParams: SearchParams & BandSearchParams;
};

export default async function BandsTable({ searchParams }: Props) {
  const { country, genre, limit, order, page, query, sort, year } =
    searchParams;

  const response: { data: Band[]; pagination: Pagination } | null =
    await fetchBands(country, genre, limit, order, page, query, sort, year);

  const bands = response?.data;

  if (!bands?.length) {
    return <NoBandsFound />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <SortTableHead searchParamKey="name"> Name</SortTableHead>
              <SortTableHead searchParamKey="genreCode">Genre</SortTableHead>
              <SortTableHead searchParamKey="country">Country</SortTableHead>
              <SortTableHead searchParamKey="year">Year</SortTableHead>
              <TableHead className="w-12 sm:w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bands.map((band) => (
              <TableRow key={band.id} className="*:whitespace-normal">
                <TableCell className="font-medium">{band.name}</TableCell>
                <TableCell>{band.genreCode}</TableCell>
                <TableCell className="">{band.country}</TableCell>
                <TableCell>{band.year}</TableCell>
                <TableCell className="w-12 sm:w-20">
                  <InfoButton href={`/bands/${band.id}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {response?.pagination && (
        <PaginationList
          pagination={response.pagination}
          searchParams={searchParams}
        />
      )}
    </>
  );
}

function NoBandsFound() {
  return (
    <>
      <div className="mt-10 mb-14 text-lg">No bands found.</div>
      <div>
        <Button
          variant="link"
          className="flex h-auto p-0 text-lg sm:text-xl"
          asChild
        >
          <Link href="/bands" prefetch={false}>
            <MdRestartAlt className="size-6!" />
            Reset filters
          </Link>
        </Button>
      </div>
    </>
  );
}
