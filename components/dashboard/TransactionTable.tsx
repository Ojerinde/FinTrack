"use client";
import React from "react";
import TableRenderer from "../ui/TableRenderer";
import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHook";
import { setSortOrder, setCurrentPage } from "@/store/slices/transactionSlice";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { Transaction } from "@/types";

const TransactionTable: React.FC = () => {
  const { filteredTransactions, filter, pagination } = useAppSelector(
    (state) => state.transaction
  );
  const dispatch = useAppDispatch();
  console.log("Filtered Transactions:", filteredTransactions);

  const columns = [
    {
      columnName: "Date",
      accessor: (item: Transaction) => formatDate(item.date),
      sortKey: "date" as keyof Transaction,
      filterable: true,
      fit: false,
    },
    {
      columnName: "Remark",
      accessor: (item: Transaction) => item.remark,
      sortKey: "remark" as keyof Transaction,
      filterable: true,
      fit: true,
    },
    {
      columnName: "Amount",
      accessor: (item: Transaction) => {
        const formattedAmount = formatCurrency(item.amount, item.currency);
        return item.type === "Debit" ? `-${formattedAmount}` : formattedAmount;
      },
      sortKey: "amount" as keyof Transaction,
      filterable: true,
      fit: true,
    },
    {
      columnName: "Currency",
      accessor: (item: Transaction) => item.currency,
      sortKey: "currency" as keyof Transaction,
      filterable: true,
      fit: true,
    },
    {
      columnName: "Type",
      accessor: (item: Transaction) => (
        <div
          className="flex items-center gap-2 bg-card-bg rounded-full py-1 px-2"
          aria-label={`item type is ${item.type}`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              item.type === "Credit" ? "bg-dot-color" : "bg-error-color"
            }`}
          />
          <span className={`text-sm text-primary-dark font-semibold`}>
            {item.type}
          </span>
        </div>
      ),
      sortKey: "type" as keyof Transaction,
      filterable: true,
      fit: true,
    },
  ];

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  const paginatedData = filteredTransactions.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  return (
    <div>
      <TableRenderer
        tableData={paginatedData}
        tableDataIsLoading={false}
        tableColumns={columns}
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        onNext={() => dispatch(setCurrentPage(pagination.currentPage + 1))}
        onPrevious={() => dispatch(setCurrentPage(pagination.currentPage - 1))}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        onSort={(sortKey, sortOrder) =>
          dispatch(setSortOrder({ sortBy: sortKey, sortOrder }))
        }
        currentSort={{ key: filter.sortBy || "", order: filter.sortOrder }}
      />
    </div>
  );
};

export default TransactionTable;
