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

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type PaginationAction = "previous" | "next" | "list";

const PagePagination = ({ pagination }: { pagination: PaginationProps }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  function getPaginationUrl(type: PaginationAction, pageNumber?: number) {
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
  function navigateTo(url: string) {
    startTransition(() => {
      router.push(url);
    });
  }

  return (
    <Pagination>
      <PaginationContent
        className={`${isPending ? "opacity-50 pointer-events-none" : ""}`}
      >
        {pagination.hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                navigateTo(getPaginationUrl("previous"));
              }}
              href={getPaginationUrl("previous")}
            />
          </PaginationItem>
        )}

        {paginationLists.map((item, index) =>
          item === null ? (
            <PaginationEllipsis key={`ellipsis-${index}`} />
          ) : (
            <PaginationItem key={`page-${item}`}>
              <PaginationLink
                isActive={pagination.page === item}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(getPaginationUrl("list", item));
                }}
                href={getPaginationUrl("list", item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {pagination.hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                navigateTo(getPaginationUrl("next"));
              }}
              href={getPaginationUrl("next")}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
