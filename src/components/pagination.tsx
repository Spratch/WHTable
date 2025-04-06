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
      className="tw:flex tw:items-center tw:justify-center tw:gap-0.5 tw:md:gap-1"
      aria-label="pagination"
    >
      {/* Prev button */}
      <Button
        onPress={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        className="tw:rounded-md tw:text-neutral-700 tw:dark:text-neutral-300 tw:disabled:opacity-40 tw:disabled:cursor-not-allowed tw:hover:bg-neutral-200 tw:dark:hover:bg-neutral-800 tw:focus tw:cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="tw:size-8" />
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        page === "…" ? (
          <span
            key={`ellipsis-${index}`}
            className="tw:text-neutral-600 tw:dark:text-neutral-400"
          >
            …
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            onPress={() => onPageChange(page as number)}
            className={`tw:px-3 tw:py-1 tw:rounded-md tw:focus tw:cursor-pointer ${
              currentPage === page
                ? "tw:bg-lime-600 tw:dark:bg-lime-400 tw:text-white tw:dark:text-lime-950"
                : "tw:text-neutral-700 tw:dark:text-neutral-300 tw:hover:bg-neutral-200 tw:dark:hover:bg-neutral-800"
            }`}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        onPress={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        className="tw:rounded-md tw:text-neutral-700 tw:dark:text-neutral-300 tw:disabled:opacity-40 tw:disabled:cursor-not-allowed tw:hover:bg-neutral-200 tw:dark:hover:bg-neutral-800 tw:focus tw:cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRightIcon className="tw:size-8" />
      </Button>
    </nav>
  );
}
