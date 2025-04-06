import { CloseIcon, SearchIcon } from "@sanity/icons";
import { Button, Input, SearchField } from "react-aria-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBox({ handleSearchChange }: Props) {
  const searchTerm = useSelector(
    (state: RootState) => state.pagination.searchTerm
  );

  return (
    <SearchField
      aria-label="Find employees"
      autoFocus
      onClear={() =>
        handleSearchChange({
          target: { value: "" }
        } as React.ChangeEvent<HTMLInputElement>)
      }
      className="tw:group tw:flex tw:items-center tw:bg-white tw:dark:bg-neutral-800 tw:border tw:border-neutral-200 tw:has-focus:border-neutral-300 tw:dark:border-neutral-700 tw:dark:has-focus:border-neutral-500 tw:p-2 tw:rounded-md tw:has-focus tw:shrink"
    >
      <SearchIcon
        aria-hidden
        className="tw:size-6 tw:opacity-50"
      />
      <Input
        onChange={handleSearchChange}
        placeholder="Find employees"
        value={searchTerm}
        className="tw:ml-2 tw:outline-none tw:[&::-webkit-search-cancel-button]:hidden tw:max-md:max-w-30"
      />
      <Button
        type="reset"
        className="tw:rounded-full tw:p-1 tw:bg-neutral-100 tw:dark:bg-neutral-700 tw:hover:bg-neutral-200 tw:dark:hover:bg-neutral-600 tw:transition-colors tw:group-empty:invisible"
      >
        <CloseIcon
          aria-hidden
          className="tw:size-4"
        />
      </Button>
    </SearchField>
  );
}
