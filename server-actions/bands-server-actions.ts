"use server";

import { extractPages } from "@/lib/utils";
import { ALLOWED_LIMITS, DEFAULT_LIMIT } from "@/config/constants";

const pageUrl =
  "https://my-json-server.typicode.com/gustavofmacia/react-challenge/bands/";

export async function fetchBands(
  country: string = "",
  genre: string = "",
  limit: string = DEFAULT_LIMIT,
  order: string = "",
  page: string = "1",
  query: string = "",
  sort: string = "",
  year: string = ""
) {
  try {
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber <= 0) return null;

    const limitChecked = ALLOWED_LIMITS.includes(Number(limit))
      ? limit
      : DEFAULT_LIMIT;

    const url = new URL(pageUrl);
    const params = new URLSearchParams({
      _limit: limitChecked,
      _order: order,
      _page: page,
      _sort: sort,
      q: query,
    });

    if (country) params.append("country", country);
    if (genre) params.append("genreCode", genre);
    if (year) params.append("year", year);

    url.search = params.toString();

    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `HTTP error fetchBands()! Status: ${response.status} - ${response.statusText}. Response body: ${errorBody}`
      );
      return null;
    }

    const linkHeaders = response.headers.get("Link");
    const paginationLinks: Pagination = extractPages(linkHeaders);
    const data: Band[] = await response.json();

    const bands = {
      data,
      pagination: {
        ...paginationLinks,
        rowsPerPage: limitChecked,
        currentPage: pageNumber,
      },
    };

    return bands;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error fetchBands()";

    console.error(`Error fetchBands(): ${errorMessage}`);
    return null;
  }
}

export async function fetchBand(id: string) {
  try {
    const embedAlbumsPath = "/?_embed=albums";

    const response = await fetch(pageUrl + id + embedAlbumsPath);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `HTTP error fetchBand()! Status: ${response.status} - ${response.statusText}. Response body: ${errorBody}`
      );
      return null;
    }

    const data: Band = await response.json();

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error fetchBands()";

    console.error(`Error fetchBands(): ${errorMessage}`);
    return null;
  }
}
