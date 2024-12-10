import React from 'react';
import TablePaginationClient from './TablePaginationClient';

interface TablePaginationProps {
  totalPages: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({ totalPages }) => {
  return (
    <div>
      <TablePaginationClient totalPages={totalPages} />
    </div>
  );
};

export default TablePagination;
