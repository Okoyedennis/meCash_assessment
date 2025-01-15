import { useState, useMemo } from "react";

interface UseSortingResult<T> {
  sortedData: T[];
  sortColumn: keyof T | null;
  sortDirection: "asc" | "desc" | null;
  handleSort: (column: keyof T) => void;
}

const useSorting = <T extends Record<string, any>>(
  data: T[]
): UseSortingResult<T> => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // If both values are strings and contain numbers, extract and compare the numeric parts
      if (typeof aValue === "string" && typeof bValue === "string") {
        const aNum = parseInt(aValue.match(/\d+/)?.[0] || "0", 10);
        const bNum = parseInt(bValue.match(/\d+/)?.[0] || "0", 10);

        if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
          return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
        }
      }

      // For standard string comparison (case-insensitive)
      const aNormalized =
        typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      const bNormalized =
        typeof bValue === "string" ? bValue.toLowerCase() : bValue;

      if (aNormalized < bNormalized) return sortDirection === "asc" ? -1 : 1;
      if (aNormalized > bNormalized) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return { sortedData, sortColumn, sortDirection, handleSort };
};

export default useSorting;
