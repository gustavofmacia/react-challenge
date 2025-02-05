/* eslint-disable @typescript-eslint/no-unused-vars */
type Pagination = {
  currentPage?: number;
  first?: number;
  last?: number;
  next?: number;
  prev?: number;
  rowsPerPage?: string;
};

type SearchParams = {
  limit?: string;
  order?: string;
  page?: string;
  query?: string;
  sort?: string;
};
