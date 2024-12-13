"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TablePaginationClientProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePaginationClient: React.FC<TablePaginationClientProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(1); // Default active page is 1

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setActivePage(page); // Update the active page
      onPageChange(page);
    }
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink
          href="#"
          isActive={i === activePage}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(i);
          }}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage > 1) {
                handlePageChange(activePage - 1);
              }
            }}
          />
        </PaginationItem>
        {paginationItems}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage < totalPages) {
                handlePageChange(activePage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePaginationClient;
