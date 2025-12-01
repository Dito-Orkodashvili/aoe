import { ReactNode } from "react";

export const FieldError = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-primary">{children}</p>;
};
