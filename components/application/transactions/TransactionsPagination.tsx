"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type PaginationAction = "previous" | "next" | "list";

const TransactionsPagination = ({
  pagination,
}: {
  pagination: PaginationProps;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getPaginationPages(
    currentPage: number,
    totalPages: number,
  ): (number | null)[] {
    const delta = 1;

    const pages: (number | null)[] = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) {
      pages.push(null);
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push(null);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  const paginationLists = getPaginationPages(
    pagination.page,
    pagination.totalPages,
  );

  function handlePagination(type: PaginationAction, pageNumber?: number) {
    const params = new URLSearchParams(searchParams);

    const currentPage = Number(params.get("page") ?? 1);

    switch (type) {
      case "previous": {
        if (currentPage <= 1) {
          return `${pathname}?${params.toString()}`;
        }

        params.set("page", String(currentPage - 1));

        return `${pathname}?${params.toString()}`;
      }

      case "next": {
        if (currentPage >= pagination.totalPages) {
          return `${pathname}?${params.toString()}`;
        }

        params.set("page", String(currentPage + 1));

        return `${pathname}?${params.toString()}`;
      }

      case "list": {
        if (pageNumber) {
          params.set("page", String(pageNumber));
        }

        return `${pathname}?${params.toString()}`;
      }
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        {pagination.hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href={handlePagination("previous")} />
          </PaginationItem>
        )}

        {paginationLists.map((item, index) =>
          item === null ? (
            <PaginationEllipsis key={`ellipsis-${index}`} />
          ) : (
            <PaginationItem key={`page-${item}`}>
              <PaginationLink
                isActive={pagination.page === item}
                href={handlePagination("list", item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {pagination.hasNextPage && (
          <PaginationItem>
            <PaginationNext href={handlePagination("next")} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TransactionsPagination;
