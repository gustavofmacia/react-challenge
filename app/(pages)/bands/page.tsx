// Server actions
import { fetchBands } from "@/server-actions/bands-server-actions";
// Next
import { Metadata } from "next";
// Components
import { PaginationList } from "@/components/ui/pages/pagination-list";
import BandsTable from "@/ui/pages/bands/bands-table";
import BandsFilterMenu from "@/components/ui/pages/bands/bands-filter-menu";

export const metadata: Metadata = {
  title: "Bands",
};

type Props = {
  searchParams?: Promise<SearchParams & BandSearchParams>;
};

export default async function BandsPage(props: Props) {
  const searchParams = (await props.searchParams) || {};

  const { country, genre, limit, order, page, query, sort, year } =
    searchParams;

  const response: { data: Band[]; pagination: Pagination } | null =
    await fetchBands(country, genre, limit, order, page, query, sort, year);

  return (
    <>
      <BandsFilterMenu />

      {response?.data.length ? (
        <>
          <div className="rounded-md border">
            <BandsTable bands={response.data} />
          </div>

          {response?.pagination && (
            <PaginationList
              pagination={response.pagination}
              searchParams={searchParams}
            />
          )}
        </>
      ) : (
        <div className="mt-10 text-lg">No bands found.</div>
      )}
    </>
  );
}
