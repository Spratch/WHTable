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
      className="group flex items-center bg-white dark:bg-neutral-800 border border-neutral-200 has-focus:border-neutral-300 dark:border-neutral-700 dark:has-focus:border-neutral-500 p-2 rounded-md has-focus shrink"
    >
      <SearchIcon
        aria-hidden
        className="size-6 opacity-50"
      />
      <Input
        onChange={handleSearchChange}
        placeholder="Find employees"
        value={searchTerm}
        className="ml-2 outline-none [&::-webkit-search-cancel-button]:hidden max-md:max-w-30"
      />
      <Button
        type="reset"
        className="rounded-full p-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors group-empty:invisible"
      >
        <CloseIcon
          aria-hidden
          className="size-4"
        />
      </Button>
    </SearchField>
  );
}
