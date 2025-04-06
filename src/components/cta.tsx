import { Link } from "react-aria-components";

export type CtaProps = {
  to: string;
  text: string;
  primary?: boolean;
  Icon?: React.ElementType;
};

export default function Cta({ to, text, primary = false, Icon }: CtaProps) {
  return (
    <Link
      href={to}
      className={`tw:px-4 tw:py-2 tw:border tw:border-lime-600 tw:dark:border-lime-400 tw:transition-colors tw:rounded-full tw:flex tw:items-center tw:gap-2 tw:focus
        ${
          primary
            ? "tw:bg-lime-600 tw:hover:bg-lime-700 tw:dark:bg-lime-400 tw:dark:hover:bg-lime-300 tw:text-lime-50 tw:dark:text-lime-950"
            : "tw:hover:bg-lime-100 tw:dark:bg-neutral-900 tw:dark:hover:bg-lime-900 tw:text-lime-600 tw:dark:text-lime-400"
        }
        `}
    >
      {Icon && <Icon className="tw:size-6" />}
      {text}
    </Link>
  );
}
