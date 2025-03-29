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
      className="flex flex-col gap-1 text-nowrap"
      aria-label="Select page length"
      {...props}
    >
      <Button className="bg-white dark:bg-neutral-800 border border-neutral-200 focus:border-neutral-300 dark:border-neutral-700 dark:focus:border-neutral-500 p-2 rounded-md focus appearance-none flex items-center relative group pr-8">
        <SelectValue className=""></SelectValue>
        <span className="opacity-50 px-2">/ {totalItems}</span>
        <ChevronDownIcon className="absolute right-0 top-0 m-1.25 group-pressed:-rotate-180 transition-transform size-8" />
      </Button>
      <FieldError>{errorMessage}</FieldError>
      <Popover
        className="overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 "
        maxHeight={320}
        style={{ width: "var(--trigger-width)" }}
      >
        <ListBox className="py-2 text-neutral-900 dark:text-neutral-100 outline-0">
          {options.map((option, index) => {
            return (
              <ListBoxItem
                key={index}
                id={option}
                className="pl-3 pr-5 py-1 focus:bg-neutral-100 dark:focus:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 selected:bg-lime-200 dark:selected:bg-lime-700 outline-none"
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
