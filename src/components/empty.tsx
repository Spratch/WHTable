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
    <section className="tw:flex-grow tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-6 tw:w-full tw:max-w-7xl tw:mx-auto tw:py-5 tw:md:py-12">
      <Icon
        className={`tw:size-24 tw:text-neutral-300 tw:dark:text-neutral-600 ${
          isLoading ? "tw:animate-spin" : ""
        }`}
      />
      <div className="tw:flex tw:flex-col tw:gap-2 tw:items-center tw:text-center">
        <h2 className="tw:text-3xl">{title}</h2>
        {description && (
          <p className="tw:text-lg tw:text-neutral-500 tw:dark:text-neutral-400">
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
