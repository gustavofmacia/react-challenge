type Props = { band: Band };

export default function BandContent({ band }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-0.5">
        <h3>
          <span className="font-medium">Genre:</span> {band.genreCode}
        </h3>
        <h3>
          <span className="font-medium">Country:</span> {band.country}
        </h3>
        <h3>
          <span className="font-medium">Year:</span> {band.year}
        </h3>
      </div>

      <div>
        <h3 className="font-medium">Members</h3>
        <ul className="grid list-disc grid-cols-2 gap-x-5 pl-5">
          {band.members.map((member) => (
            <li key={member.name}>{member.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-medium">Albums</h3>
        <ul className="grid list-disc grid-cols-2 gap-x-5 pl-5">
          {band.albums.map((album) => (
            <li key={album.name}>{album.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
