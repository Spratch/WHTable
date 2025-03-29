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

export type Props = {
  itemsStatus: "idle" | "loading" | "succeeded" | "failed";
  itemsMessage: string;
  items: Record<string, string>[];
  itemsName?: { singular: string; plural: string };
  newItemLink?: string;
  lengthOptions?: string[];
  columnsTitles: { id: string; title: string }[];
  emailAddress?: string;
};

/**
 * TableSection component
 * @param itemsStatus - Status of the items (idle, loading, succeeded, failed)
 * @param itemsMessage - Message to display in case of error
 * @param items - Array of items to display in the table
 * @param itemsName - Object containing singular and plural names for the items
 * @param newItemLink - Link to create a new item
 * @param lengthOptions - Array of options for the number of items per page
 * @param columnsTitles - Array of objects containing id and title for each column
 * @param emailAddress - Email address for support contact
 */
export function TableSection({
  itemsStatus,
  itemsMessage,
  items,
  itemsName = { singular: "item", plural: "items" },
  newItemLink,
  lengthOptions = ["10", "25", "50", "100"],
  columnsTitles,
  emailAddress
}: Props) {
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
              <span className="inline-block mt-1.5 text-red-600 dark:text-red-400 text-sm font-mono bg-red-50 dark:bg-red-950 py-2 px-3 rounded-md border border-red-200 dark:border-red-700">
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
        <section className="flex-1 max-h-full min-h-0 flex flex-col items-start w-full max-w-7xl mx-auto py-5 gap-2 md:gap-5">
          <div className="flex flex-row-reverse md:flex-row w-full flex-wrap justify-between md:items-end gap-2 md:gap-5">
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
