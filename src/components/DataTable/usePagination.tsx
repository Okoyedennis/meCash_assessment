import { useMemo } from "react";

interface UsePaginationResult<T> {
  paginatedData: T[];
  totalPages: number;
}

const usePagination = <T,>(
  data: T[],
  rowsPerPage: number,
  currentPage: number
): UsePaginationResult<T> => {
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, rowsPerPage, currentPage]);

  return { paginatedData, totalPages };
};

export default usePagination;
