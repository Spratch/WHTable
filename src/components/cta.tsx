import { Link } from "react-aria-components";

export type CtaProps = {
  to: string;
  text: string;
  primary?: boolean;
  Icon?: React.ElementType;
  isNav?: boolean;
};

export default function Cta({
  to,
  text,
  primary = false,
  Icon,
  isNav = false
}: CtaProps) {
  return (
    <Link
      href={to}
      className={`${
        isNav ? "aria-current:hidden" : ""
      } px-4 py-2 border border-lime-600 dark:border-lime-400 transition-colors rounded-full flex items-center gap-2 focus
        ${
          primary
            ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-300 text-lime-50 dark:text-lime-950"
            : "hover:bg-lime-100 dark:bg-neutral-900 dark:hover:bg-lime-900 text-lime-600 dark:text-lime-400"
        }
        `}
    >
      {Icon && <Icon className="size-6" />}
      {text}
    </Link>
  );
}
