export type Page<T> = {
  items: T[];
  page: number;
  totalPages: number;
};

export function paginate<T>(allItems: T[], page: number, pageSize: number): Page<T> {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.max(1, Math.ceil(allItems.length / safePageSize));
  const safePage = Math.min(totalPages, Math.max(1, Math.floor(page)));

  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;
  return {
    items: allItems.slice(start, end),
    page: safePage,
    totalPages
  };
}

