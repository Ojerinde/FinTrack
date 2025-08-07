export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: "Credit" | "Debit";
}

export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
}

export interface SidebarState {
  isOpen: boolean;
}

export interface ModalState {
  shareModal: boolean;
  cardActionModal: boolean;
  cardActionPosition: { x: number; y: number } | null;
}

export interface TableColumn<T> {
  columnName: string;
  accessor: (item: T, index: number) => React.ReactNode;
  sortKey?: keyof T;
  filterable?: boolean;
  fit?: boolean;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface FilterState {
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  filters: Record<string, any>;
}
