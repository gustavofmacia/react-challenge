import SearchInput from "@/components/ui/pages/search/search-input";
import ComboboxYear from "@/components/ui/pages/search/combobox-year";
import Combobox from "@/components/ui/pages/search/combobox";

export default function BandsFilterMenu() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:flex">
      <SearchInput
        placeholder="Key words"
        searchParamKey="query"
        className="md:w-full md:min-w-32"
      />

      <Combobox
        values={genres}
        placeholder="Genre"
        searchParamKey="genre"
        className="md:w-full"
      />

      <Combobox
        values={countries}
        placeholder="Country"
        searchParamKey="country"
        className="md:w-full"
      />

      <ComboboxYear
        startYear={1968}
        endYear={2000}
        commandInput
        className="md:w-full"
      />
    </div>
  );
}

const countries = new Set([
  "United States",
  "United Kingdom",
  "Australia",
  "Sweden",
  "Netherlands",
  "Germany",
]);

const genres = new Set([
  "hard-rock",
  "power-metal",
  "heavy-metal",
  "rock",
  "grunge",
]);
