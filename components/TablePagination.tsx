import React from "react";
import TablePaginationClient from "./TablePaginationClient";

interface TablePaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div>
      <TablePaginationClient
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TablePagination;
