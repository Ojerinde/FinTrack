import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction, FilterState, PaginationState } from "@/types";
import { mockTransactions } from "@/store/data/mockData";

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filter: FilterState;
  pagination: PaginationState;
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: mockTransactions,
  filteredTransactions: mockTransactions,
  filter: {
    sortBy: null,
    sortOrder: "asc",
    filters: {},
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: mockTransactions.length,
  },
  loading: false,
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setSortOrder: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>
    ) => {
      const { sortBy, sortOrder } = action.payload;
      state.filter.sortBy = sortBy;
      state.filter.sortOrder = sortOrder;

      const sorted = [...state.transactions].sort((a, b) => {
        const aVal = a[sortBy as keyof Transaction];
        const bVal = b[sortBy as keyof Transaction];

        // Handle number comparison
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        // Handle string comparison
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        // If the value is neither string nor number, return 0 (no sorting)
        return 0;
      });

      state.filteredTransactions = sorted;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const { setSortOrder, setCurrentPage } = transactionSlice.actions;
export default transactionSlice.reducer;
