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
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    pageParamName?: string;
}

export function DataTablePagination({
    currentPage,
    totalPages,
    baseUrl,
    pageParamName = "page",
}: PaginationControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getHref = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(pageParamName, String(page));
        return `${baseUrl}?${params.toString()}`;
    };

    const updateURL = (page: number) => {
        router.push(getHref(page));
    };

    const createPages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pages = createPages();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={getHref(Math.max(1, currentPage - 1))}
                        onClick={(e) => {
                            e.preventDefault();
                            updateURL(Math.max(1, currentPage - 1));
                        }}
                    />
                </PaginationItem>

                {pages.map((page, i) =>
                    page === "..." ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={`page-${page}`}>
                            <PaginationLink
                                href={getHref(page)}
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateURL(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href={getHref(Math.min(totalPages, currentPage + 1))}
                        onClick={(e) => {
                            e.preventDefault();
                            updateURL(Math.min(totalPages, currentPage + 1));
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
