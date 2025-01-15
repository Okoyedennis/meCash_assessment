import { useMemo } from "react";

const useFiltering = <T extends Record<string, any>>(
  data: T[],
  filter: string,
  filterColumn: keyof T
): T[] => {
  return useMemo(() => {
    if (!filter) return data; // Return all data if no filter is applied

    return data.filter((row) => {
      const value = row[filterColumn]; // Get the column value
      if (value === null || value === undefined) return false; // Skip null/undefined
      return value.toString().toLowerCase().includes(filter.toLowerCase());
    });
  }, [data, filter, filterColumn]);
};

export default useFiltering;
