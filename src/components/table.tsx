import {
  Cell,
  CellProps,
  Column,
  ColumnProps,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  Row,
  RowProps,
  Table,
  TableBody,
  TableHeader
} from "react-aria-components";
import { ArrowUpIcon } from "@sanity/icons";
import useTablePagination from "../hooks/useTablePagination";
import Pagination from "./pagination";

type WHTableProps = {
  columnsTitles: { id: string; title: string }[];
  label: string;
  items: Record<string, string>[];
};

export default function WHTable({ columnsTitles, label, items }: WHTableProps) {
  const {
    currentPageData,
    currentPage,
    totalPages,
    goToPage,
    sortDescriptor,
    handleSortChange
  } = useTablePagination(items);

  return (
    <>
      <ResizableTableContainer className="tw:w-full tw:overflow-auto tw:scroll-pt-8 tw:relative tw:rounded-lg tw:bg-white tw:text-neutral-600 tw:dark:bg-black tw:dark:text-neutral-50 tw:max-h-full tw:border tw:border-neutral-200 tw:dark:border-neutral-700">
        <Table
          aria-label={label}
          sortDescriptor={sortDescriptor}
          onSortChange={handleSortChange}
          className="tw:border-separate tw:border-spacing-0"
        >
          <TableHeader>
            {columnsTitles.map((column, index) => (
              <WHColumn
                key={index}
                isRowHeader={index === 0}
                defaultWidth={column.id === "zipCode" ? 100 : 150}
                allowsSorting
                id={column.id}
              >
                {column.title}
              </WHColumn>
            ))}
          </TableHeader>
          <TableBody>
            {currentPageData.map((item) => {
              return (
                <WHRow key={item.id}>
                  {columnsTitles.map((column, index) => (
                    <WHCell key={index}>{item[column.id]}</WHCell>
                  ))}
                </WHRow>
              );
            })}
          </TableBody>
        </Table>
      </ResizableTableContainer>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </>
  );
}

function WHColumn(props: ColumnProps & { children: string }) {
  return (
    <Column
      {...props}
      className="tw:sticky tw:top-0 tw:p-0 tw:border-0 tw:border-b tw:border-solid tw:border-neutral-300 tw:dark:border-neutral-700 tw:bg-neutral-200 tw:dark:bg-neutral-800 tw:font-light tw:pt-0.5 tw:tracking-wider tw:uppercase tw:text-xs tw:text-left tw:cursor-default tw:first-rounded-tl-lg tw:last-rounded-tr-lg tw:whitespace-nowrap tw:outline-hidden"
    >
      {({ allowsSorting, sortDirection }) => (
        <div className="tw:flex tw:items-center tw:pl-4 tw:py-1">
          <Group
            role="presentation"
            tabIndex={-1}
            className="tw:flex tw:flex-1 tw:items-center tw:overflow-hidden tw:outline-hidden tw:rounded-sm tw:focus-visible:ring-2 tw:ring-lime-600 tw:dark:ring-lime-400"
          >
            <span className="tw:flex-1 tw:truncate">{props.children}</span>
            {allowsSorting && (
              <span
                className={`tw:ml-1 tw:size-4 tw:flex tw:items-center tw:justify-center tw:transition ${
                  sortDirection === "descending" ? "tw:rotate-180" : ""
                }`}
              >
                {sortDirection && <ArrowUpIcon className="tw:size-4" />}
              </span>
            )}
          </Group>
          <ColumnResizer className="tw:w-4.25 tw:px-2 tw:py-0.5 tw:h-5 tw:bg-clip-content tw:bg-neutral-400 tw:dark:bg-neutral-600 tw:cursor-col-resize tw:rounded-sm tw:resizing:bg-neutral-800 tw:dark:resizing:bg-neutral-200 tw:resizing:w-4.5 tw:focus-visible:ring-2 tw:ring-neutral-600 tw:dark:ring-neutral-400 tw:ring-inset" />
        </div>
      )}
    </Column>
  );
}

function WHRow<T extends object>(props: RowProps<T>) {
  return (
    <Row
      {...props}
      className="tw:even:bg-neutral-100 tw:dark:even:bg-neutral-900 tw:selected:bg-neutral-600 tw:selected:text-white tw:cursor-default tw:group tw:outline-hidden tw:focus-visible:outline-2 tw:focus-visible:outline-neutral-600 tw:focus-visible:-outline-offset-4 tw:selected:focus-visible:outline-white"
    />
  );
}

function WHCell(props: CellProps) {
  return (
    <Cell
      {...props}
      className={`tw:px-4 tw:py-2 tw:truncate ${props.className} tw:focus-visible:outline-2 tw:focus-visible:outline-neutral-600 tw:focus-visible:-outline-offset-4 `}
    />
  );
}
