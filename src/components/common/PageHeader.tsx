import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

type Props = ComponentProps<"header">;

export const PageHeader = ({ className, ...props }: Props) => {
  return (
    <header
      className={cn(
        "flex flex-wrap items-end gap-4 text-4xl font-bold hero-gradient pb-1",
        className
      )}
      {...props}
    ></header>
  );
};
