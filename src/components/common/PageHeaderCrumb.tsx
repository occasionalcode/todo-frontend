import type { ReactNode } from "react";

type Props = { children: ReactNode };

export const PageHeaderCrumb = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-4  text-lg font-semibold text-[#CE9BFE]">
      <span>/</span>
      {children}
    </div>
  );
};
