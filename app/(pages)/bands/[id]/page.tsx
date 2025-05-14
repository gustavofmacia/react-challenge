import { fetchBand } from "@/server-actions/bands-server-actions";
import CardItem from "@/ui/pages/card-item";
import BandContent from "@/ui/pages/bands/band-content";
import type { Metadata } from "next";

type PropsMetadata = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PropsMetadata): Promise<Metadata> {
  const bandId = (await params).id;

  const band: Band | null = await fetchBand(bandId);

  return {
    title: band?.name || "Page not found",
  };
}

export default async function BandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const bandId = (await params).id;

  const band: Band | null = await fetchBand(bandId);

  if (!band) {
    return <p>Band not found</p>;
  }
  return (
    <CardItem title={band.name}>
      <BandContent band={band} />
    </CardItem>
  );
}
