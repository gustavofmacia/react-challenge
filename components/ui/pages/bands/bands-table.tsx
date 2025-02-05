import SortTableHead from "@/components/ui/table/sort-table-head";
import { InfoButton } from "@/ui/table/actions/info-button";
// Shadcn
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/shadcn/table";

type Props = { bands: Band[] };

export default function BandsTable({ bands }: Props) {
  return (
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
          <TableRow key={band.id}>
            <TableCell className="font-medium">{band.name}</TableCell>
            <TableCell>{band.genreCode}</TableCell>
            <TableCell className="">{band.country}</TableCell>
            <TableCell>{band.year}</TableCell>
            <TableCell className="w-12 sm:w-20">
              <InfoButton href={`/bands/${band.id}`} />
              {/* <Link href={`/bands/${band.id}`}>Details</Link> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
