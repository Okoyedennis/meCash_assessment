import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import usePagination from "./usePagination";
import useSorting from "./useSorting";
import useFiltering from "./useFiltering";

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  name: string;
  rowsPerPageOptions?: number[];
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  name,
  rowsPerPageOptions = [10, 1000, 5000, 10000],
}: DataTableProps<T>) => {
  const [filter, setFilter] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Paginate the data first
  const { paginatedData, totalPages } = usePagination(
    data,
    rowsPerPage,
    currentPage
  );

  // Filter the paginated data (only visible rows)
  const filteredPaginatedData = useFiltering(
    paginatedData,
    filter,
    columns[1].accessor
  );

  // Sort the filtered data
  const { sortedData, sortColumn, sortDirection, handleSort } = useSorting(
    filteredPaginatedData
  );

  const handleRowsPerPageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLoading(true); // Show loading indicator
    const newRowsPerPage = Number(event.target.value);

    // Simulate a delay for "fetching" (optional, for UX demonstration)
    setTimeout(() => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-8">
      <h3 className="text-[20px] md:text-[32px] font-medium leading-[34px] text-grayscalTitle mt-[1rem]">
        {name}
      </h3>
      <div className="bg-white h-fit rounded-[10px] py-[32px] px-[20px] md:px-[42px] mt-[2rem] shadow-shadow2">
        {loading ? (
          <div className="flex items-center justify-center flex-col gap-[2rem] mt-[10rem]">
            <svg
              className="animate-spin h-[8rem] w-[8rem] mr-3 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        ) : (
          <>
            <div className="flex justify-end w-full">
              <div className="flex items-center border border-gray200 rounded-[2px] p-[8px] gap-[8px] w-[300px] ">
                <BiSearch className="text-gray400" />
                <input
                  type="text"
                  className="outline-none text-sm font-normal leading-[20px] flex-1"
                  placeholder="Filter by Name..."
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            {sortedData.length === 0 ? (
              <h3 className="flex items-center justify-center text-lg mt-[1rem]">
                No Record
              </h3>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="mt-4 md:w-[900px] lg:w-full table-fixed border-collapse border border-gray-300">
                    <thead className="bg-grayScale">
                      <tr className="text-base leading-[16px] h-[40px] rounded-sm py-[8px]">
                        {columns.map((col) => (
                          <th
                            key={col.accessor}
                            onClick={() => handleSort(col.accessor)}
                            className="text-center text-sm font-medium border border-gray-300 px-2 truncate">
                            {col.header}
                            {sortColumn === col.accessor &&
                              (sortDirection === "asc" ? " 🔼" : " 🔽")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((row: any, rowIndex: number) => (
                        <tr
                          key={rowIndex}
                          className="h-[40px] even:bg-claret border border-gray-300">
                          {columns.map((col) => (
                            <td
                              key={col.accessor}
                              className="text-center text-sm font-normal leading-[16.76px] border border-gray-300 px-2 truncate">
                              {row[col.accessor]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="bg-gray200 h-[24px] w-[24px] p-[4px] rounded-[2px]">
                      <MdKeyboardArrowRight className="rotate-180 text-gray500" />
                    </button>
                    <div className="flex items-center text-sm">
                      <p className="">Page</p>
                      <span className="flex items-center justify-center h-8 rounded-full mx-[.3rem]">
                        {currentPage}
                      </span>
                      of
                      <span className="flex items-center justify-center h-8 rounded-full mx-[.3rem]">
                        {totalPages}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="bg-gray200 h-[24px] w-[24px] p-[4px] rounded-[2px]">
                      <MdKeyboardArrowRight className="text-gray500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      className="border border-gray-300 rounded-md p-2">
                      {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DataTable;
