/* eslint-disable @typescript-eslint/no-unused-vars */
type Band = {
  id: number;
  name: string;
  genreCode: string;
  year: number;
  country: string;
  members: { name: string }[];
  albums: { name: string }[];
};

type BandSearchParams = {
  country?: string;
  genre?: string;
  year?: string;
};
