import Modal from "@/ui/pages/modal";
import { fetchBand } from "@/server-actions/bands-server-actions";
import BandContent from "@/ui/pages/bands/band-content";
import { Metadata } from "next";

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

export default async function BandModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const bandId = (await params).id;

  const band: Band | null = await fetchBand(bandId);

  console.log(band);

  if (!band) {
    return <Modal title="band">Band not found.</Modal>;
  }

  return (
    <Modal title={band.name}>
      <BandContent band={band} />
    </Modal>
  );
}
