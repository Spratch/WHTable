import { createSlice } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: "ascending" | "descending";
  searchTerm: string;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  sortColumn: "startDate",
  sortDirection: "descending",
  searchTerm: ""
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      // Reset the current page to 1 when the page size changes
      state.currentPage = 1;
    },
    setSortOrder: (state, action) => {
      state.sortColumn = action.payload.column;
      state.sortDirection = action.payload.direction;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Reset the current page to 1 when the search term changes
      state.currentPage = 1;
    }
  }
});

export const { setCurrentPage, setPageSize, setSortOrder, setSearchTerm } =
  paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
