import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractPages(linkHeader: string | null): Pagination {
  const defaultPages = { first: 1, prev: 1, next: 1, last: 1 };

  if (!linkHeader) return defaultPages;

  const pages = Object.fromEntries(
    linkHeader
      .split(", ")
      .map((link) => link.match(/_page=(\d+)[^>]*>\s*;\s*rel="(\w+)"/))
      .filter((match): match is RegExpMatchArray => match !== null)
      .map(([, page, rel]) => [rel, parseInt(page, 10)])
  );

  return Object.keys(pages).length > 0 ? pages : defaultPages;
}
