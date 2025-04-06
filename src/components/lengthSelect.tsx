import { ChevronDownIcon } from "@sanity/icons";
import {
  Button,
  FieldError,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectProps,
  SelectValue,
  ValidationResult
} from "react-aria-components";

interface LengthSelectProps<T extends object> extends SelectProps<T> {
  options: string[];
  totalItems: number;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export default function LengthSelect<T extends object>({
  options,
  totalItems,
  errorMessage = "Please select an option",
  ...props
}: LengthSelectProps<T>) {
  return (
    <Select
      className="tw:flex tw:flex-col tw:gap-1 tw:text-nowrap"
      aria-label="Select page length"
      {...props}
    >
      <Button className="tw:bg-white tw:dark:bg-neutral-800 tw:border tw:border-neutral-200 tw:focus:border-neutral-300 tw:dark:border-neutral-700 tw:dark:focus:border-neutral-500 tw:p-2 tw:rounded-md tw:focus tw:appearance-none tw:flex tw:items-center tw:relative tw:group tw:pr-8">
        <SelectValue className=""></SelectValue>
        <span className="tw:opacity-50 tw:px-2">/ {totalItems}</span>
        <ChevronDownIcon className="tw:absolute tw:right-0 tw:top-0 tw:m-1.25 tw:group-pressed:-rotate-180 tw:transition-transform tw:size-8" />
      </Button>
      <FieldError>{errorMessage}</FieldError>
      <Popover
        className="tw:overflow-auto tw:rounded-lg tw:border tw:border-neutral-200 tw:dark:border-neutral-700 tw:bg-white tw:dark:bg-neutral-800 "
        maxHeight={320}
        style={{ width: "var(--trigger-width)" }}
      >
        <ListBox className="tw:py-2 tw:text-neutral-900 tw:dark:text-neutral-100 tw:outline-0">
          {options.map((option, index) => {
            return (
              <ListBoxItem
                key={index}
                id={option}
                className="tw:pl-3 tw:pr-5 tw:py-1 tw:focus:bg-neutral-100 tw:dark:focus:bg-neutral-700 tw:hover:bg-neutral-100 tw:dark:hover:bg-neutral-700 tw:selected:bg-lime-200 tw:dark:selected:bg-lime-700 tw:outline-none"
              >
                {option}
              </ListBoxItem>
            );
          })}
        </ListBox>
      </Popover>
    </Select>
  );
}
