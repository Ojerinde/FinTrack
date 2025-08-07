"use client";
import React from "react";
import Loading from "./Loading";
import TablePagination from "./TablePagination";
import { ArrowDownIcon } from "@/public/icons/svg-components";

interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: "Credit" | "Debit";
}

interface TableRendererProps<T extends Transaction> {
  tableData: T[];
  tableDataIsLoading: boolean;
  tableColumns: {
    columnName: string;
    accessor: (item: T) => React.ReactNode;
    sortKey?: keyof T;
    filterable?: boolean;
    fit?: boolean;
  }[];
  noDataErrorMessage?: string;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
  rowClickHandler?: (rowData: T) => void;
  onSort?: (sortKey: string, sortOrder: "asc" | "desc") => void;
  currentSort?: { key: string; order: "asc" | "desc" };
}

const TableRenderer = <T extends Transaction>({
  tableData,
  tableDataIsLoading,
  tableColumns,
  noDataErrorMessage,
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
  rowClickHandler,
  onSort,
  currentSort,
}: TableRendererProps<T>) => {
  const handleSort = (sortKey: string) => {
    if (!onSort) return;
    const isCurrentSort = currentSort?.key === sortKey;
    const newOrder =
      isCurrentSort && currentSort.order === "asc" ? "desc" : "asc";
    onSort(sortKey, newOrder);
  };

  return (
    <section className="w-full">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table
          className="w-full overflow-hidden border-separate min-w-[600px]"
          style={{ borderSpacing: "15px 0" }}
        >
          <thead>
            <tr className="text-left">
              {tableColumns.map((column, index) => (
                <th
                  key={index}
                  className={`py-2 text-sm font-medium text-primary-grey ${
                    column.sortKey ? "cursor-pointer" : ""
                  }`}
                  style={{
                    width: column.fit ? "1px" : "auto",
                    minWidth: column.fit ? "auto" : "150px",
                  }}
                  onClick={() =>
                    column.sortKey && handleSort(column.sortKey as string)
                  }
                >
                  <div className="flex items-center">
                    <span className={column.fit ? "whitespace-nowrap" : ""}>
                      {column.columnName}
                    </span>
                    {column.sortKey && (
                      <div className="flex flex-col ml-2">
                        <ArrowDownIcon
                          fill={
                            currentSort?.key === column.sortKey
                              ? "#6D787C"
                              : "#6D787C"
                          }
                          className={
                            currentSort?.key === column.sortKey &&
                            currentSort.order === "desc"
                              ? ""
                              : "rotate-180"
                          }
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDataIsLoading ? (
              <tr>
                <td colSpan={tableColumns.length}>
                  <div className="w-full py-8 flex justify-center items-center">
                    <Loading />
                  </div>
                </td>
              </tr>
            ) : tableData?.length === 0 ? (
              <tr>
                <td colSpan={tableColumns.length} className="text-center py-8">
                  <div className="bg-gray-100 text-gray-600 flex items-center justify-center rounded-lg h-24">
                    {noDataErrorMessage || "No data available at the moment"}
                  </div>
                </td>
              </tr>
            ) : (
              tableData?.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white hover:bg-gray-50 transition-colors ${
                    rowClickHandler ? "cursor-pointer" : ""
                  }`}
                  onClick={() => rowClickHandler && rowClickHandler(item)}
                >
                  {tableColumns.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`py-3 px-2 text-sm text-primary-dark bg-white border-t-[1.5px]`}
                      style={{
                        width: column.fit ? "1px" : "auto",
                        minWidth: column.fit ? "auto" : "150px",
                      }}
                    >
                      <div className={column.fit ? "whitespace-nowrap" : ""}>
                        {column.accessor(item)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View  */}
      <div className="block sm:hidden space-y-4">
        {tableDataIsLoading ? (
          <div className="w-full py-8 flex justify-center items-center">
            <Loading />
          </div>
        ) : tableData?.length === 0 ? (
          <div className="bg-gray-100 text-gray-600 flex items-center justify-center rounded-lg h-24 text-center p-4">
            {noDataErrorMessage || "No data available at the moment"}
          </div>
        ) : (
          tableData?.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${
                rowClickHandler ? "cursor-pointer hover:bg-gray-50" : ""
              } transition-colors`}
              onClick={() => rowClickHandler && rowClickHandler(item)}
            >
              {tableColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium text-primary-grey min-w-[80px]">
                    {column.columnName}:
                  </span>
                  <div className="text-sm text-primary-dark text-right ">
                    {column.accessor(item)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination - Responsive */}
      {!tableDataIsLoading && totalPages > 1 && (
        <div className="mt-4">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>
      )}
    </section>
  );
};

export default TableRenderer;
