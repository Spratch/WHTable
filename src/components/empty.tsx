import { EmptyIcon } from "@sanity/icons";
import Cta, { CtaProps } from "./cta";
import { JSX } from "react";

type Props = {
  Icon?: React.ElementType;
  title: string;
  description?: JSX.Element | string;
  cta?: CtaProps;
  isLoading?: boolean;
};

export default function EmptyList({
  Icon = EmptyIcon,
  title,
  description,
  cta,
  isLoading = false
}: Props) {
  return (
    <section className="flex-grow flex flex-col items-center justify-center gap-6 w-full max-w-7xl mx-auto py-5 md:py-12">
      <Icon
        className={`size-24 text-neutral-300 dark:text-neutral-600 ${
          isLoading ? "animate-spin" : ""
        }`}
      />
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="text-3xl">{title}</h2>
        {description && (
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>

      {cta && (
        <Cta
          text={cta.text}
          to={cta.to}
          primary={cta.primary}
          Icon={cta.Icon}
        />
      )}
    </section>
  );
}
