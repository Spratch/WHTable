import { Key } from "react-aria-components";
import useTablePagination from "../hooks/useTablePagination";
import LengthSelect from "./lengthSelect";
import SearchBox from "./searchBox";
import WHTable from "./table";
import { useDispatch } from "react-redux";
import { setPageSize, setSearchTerm } from "../redux/features/pagination.slice";
import EmptyList from "./empty";
import {
  AddUserIcon,
  EnvelopeIcon,
  ErrorOutlineIcon,
  SpinnerIcon
} from "@sanity/icons";

export type TableSectionProps = {
  itemsStatus: "idle" | "loading" | "succeeded" | "failed";
  itemsMessage: string;
  items: Record<string, string>[];
  itemsName?: { singular: string; plural: string };
  newItemLink?: string;
  lengthOptions?: string[];
  columnsTitles: { id: string; title: string }[];
  emailAddress?: string;
};

export function TableSection({
  itemsStatus,
  itemsMessage,
  items,
  itemsName = { singular: "item", plural: "items" },
  newItemLink,
  lengthOptions = ["10", "25", "50", "100"],
  columnsTitles,
  emailAddress
}: TableSectionProps) {
  const { totalItems, pageSize } = useTablePagination(items);

  const dispatch = useDispatch();

  const handlePageSizeChange = (value: Key | null) => {
    if (value !== null) {
      dispatch(setPageSize(parseInt(value.toString(), 10)));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <>
      {itemsStatus === "failed" ? (
        <EmptyList
          Icon={ErrorOutlineIcon}
          title="An error occurred."
          description={
            <>
              <span>
                There was an error while trying to fetch the {itemsName.plural}.
              </span>
              <br />
              <span className="tw:inline-block tw:mt-1.5 tw:text-red-600 tw:dark:text-red-400 tw:text-sm tw:font-mono tw:bg-red-50 tw:dark:bg-red-950 tw:py-2 tw:px-3 tw:rounded-md tw:border tw:border-red-200 tw:dark:border-red-700">
                {itemsMessage}
              </span>
            </>
          }
          cta={
            emailAddress
              ? {
                  text: "Contact support",
                  to: `mailto:${emailAddress}`,
                  Icon: EnvelopeIcon
                }
              : undefined
          }
        />
      ) : itemsStatus === "loading" ? (
        <EmptyList
          Icon={SpinnerIcon}
          title={`Loading ${itemsName.plural}...`}
          description={`Please wait while we fetch the ${itemsName.plural}.`}
          isLoading
        />
      ) : !items.length ? (
        <EmptyList
          title={`No ${itemsName.plural} found.`}
          description={`There are currently no ${itemsName.plural} in the system.`}
          cta={
            newItemLink
              ? {
                  text: `Create a new ${itemsName.singular}`,
                  to: newItemLink,
                  Icon: AddUserIcon
                }
              : undefined
          }
        />
      ) : (
        <section className="tw:flex-1 tw:max-h-full tw:min-h-0 tw:flex tw:flex-col tw:items-start tw:w-full tw:max-w-7xl tw:mx-auto tw:py-5 tw:gap-2 tw:md:gap-5">
          <div className="tw:flex tw:flex-row-reverse tw:md:flex-row tw:w-full tw:flex-wrap tw:justify-between tw:md:items-end tw:gap-2 tw:md:gap-5">
            <LengthSelect
              options={lengthOptions}
              totalItems={totalItems}
              selectedKey={pageSize.toString()}
              onSelectionChange={handlePageSizeChange}
            />
            <SearchBox handleSearchChange={handleSearchChange} />
          </div>
          <WHTable
            columnsTitles={columnsTitles}
            label={`List of ${itemsName.plural}`}
            items={items}
          />
        </section>
      )}
    </>
  );
}
