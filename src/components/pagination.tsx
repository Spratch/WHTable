import { ChevronLeftIcon, ChevronRightIcon } from "@sanity/icons";
import { Button } from "react-aria-components";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: Props) {
  // If no pages, no pagination
  if (totalPages <= 0) return null;

  const siblings = 2;

  // Pages to display
  const getPageNumbers = () => {
    const totalNumbers = siblings * 2 + 1; // Left + right + current page

    // If less pages than blocks, show all
    const totalBlocks = totalNumbers + 2; // 2 for the dots
    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Siblings indexes
    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

    // Display dots or not
    const shouldDisplayLeftDots = leftSiblingIndex >= 1 + siblings;
    const shouldDisplayRightDots =
      rightSiblingIndex < totalPages - siblings + 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Display left dots
    if (shouldDisplayLeftDots && !shouldDisplayRightDots) {
      const rightRange = Array.from(
        { length: totalNumbers },
        (_, i) => lastPageIndex - totalNumbers + i + 1
      );
      return [firstPageIndex, "…", ...rightRange];
    }

    // Display right dots
    if (!shouldDisplayLeftDots && shouldDisplayRightDots) {
      const leftRange = Array.from({ length: totalNumbers }, (_, i) => i + 1);
      return [...leftRange, "…", lastPageIndex];
    }

    // Display both dots
    if (shouldDisplayLeftDots && shouldDisplayRightDots) {
      const middleRange = Array.from(
        { length: totalNumbers },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "…", ...middleRange, "…", lastPageIndex];
    }

    return [];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-0.5 md:gap-1"
      aria-label="pagination"
    >
      <Button
        onPress={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        className="rounded-md text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-800 focus cursor-pointer"
      >
        <ChevronLeftIcon className="size-8" />
      </Button>
      {pageNumbers.map((page, index) =>
        page === "…" ? (
          <span
            key={`ellipsis-${index}`}
            className="text-neutral-600 dark:text-neutral-400"
          >
            …
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            onPress={() => onPageChange(page as number)}
            className={`px-3 py-1 rounded-md focus cursor-pointer ${
              currentPage === page
                ? "bg-lime-600 dark:bg-lime-400 text-white dark:text-lime-950"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
          >
            {page}
          </Button>
        )
      )}

      {/* Bouton suivant */}
      <Button
        onPress={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        className="rounded-md text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-800 focus cursor-pointer"
      >
        <ChevronRightIcon className="size-8" />
      </Button>
    </nav>
  );
}
