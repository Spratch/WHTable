import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMemo } from "react";
import {
  setCurrentPage,
  setPageSize,
  setSortOrder
} from "../redux/features/pagination.slice";
import { SortDescriptor } from "react-aria-components";

export default function useTablePagination(items: Record<string, string>[]) {
  const dispatch = useDispatch();
  const pagination = useSelector((state: RootState) => state.pagination);

  const { currentPage, pageSize, sortColumn, sortDirection, searchTerm } =
    pagination;

  // Filter and sort data
  const processedData = useMemo(() => {
    // Filter data
    let filteredList = items;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredList = items.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(term);
          }
          return false;
        });
      });
    }

    // Sort data
    const sortedList = [...filteredList].sort((a, b) => {
      const first = a[sortColumn];
      const second = b[sortColumn];

      if (typeof first === "string" && typeof second === "string") {
        const result = first.localeCompare(second);
        return sortDirection === "ascending" ? result : -result;
      }
      return 0;
    });

    return sortedList;
  }, [items, sortColumn, sortDirection, searchTerm]);

  // Get paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, processedData]);

  // Get total pages
  const totalPages = Math.ceil(processedData.length / pageSize);

  // Pagination actions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const changePageSize = (size: number) => {
    dispatch(setPageSize(size));
  };

  const handleSortChange = (descriptor: SortDescriptor) => {
    if (descriptor.column) {
      dispatch(
        setSortOrder({
          column: descriptor.column,
          direction: descriptor.direction
        })
      );
    }
  };

  return {
    // Data
    currentPageData: paginatedData,
    allData: processedData,

    // Pagination
    currentPage,
    pageSize,
    totalPages,
    totalItems: processedData.length,

    // Actions
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
    changePageSize,

    // Sorting
    sortDescriptor: {
      column: sortColumn,
      direction: sortDirection
    },
    handleSortChange
  };
}
