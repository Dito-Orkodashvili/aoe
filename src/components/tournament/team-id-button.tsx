import { cn } from "@/lib/utils";
import * as React from "react";
import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "h-10 w-10 inline-flex items-center cursor-pointer justify-center " +
    "rounded-sm border border-border px-3 py-1 font-bold " +
    "shadow-md shadow-gray-600/50 " +
    "hover:shadow-lg active:translate-y-[2px] active:shadow-md active:shadow-gray-600/50" +
    "transition-all duration-100 shrink-0 outline-none " +
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      value: {
        1: "text-blue-600",
        2: "text-red-600",
        3: "text-green-600",
        4: "text-yellow-300",
        5: "text-cyan-300",
        6: "text-purple-600",
        7: "text-gray-400",
        8: "text-orange-400",
      },
    },
    defaultVariants: {
      value: 1,
    },
  },
);

export type TeamIdButtonValueType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type TeamIdButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    onClick: (nextValue: TeamIdButtonValueType) => void;
  };

export const TeamIdButton = ({
  value = 1,
  onClick,
  className,
  ...rest
}: TeamIdButtonProps) => {
  const handleLeftClick = () => {
    const resolvedValue = value === 8 ? 1 : value + 1;
    onClick(resolvedValue as TeamIdButtonValueType);
  };

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const resolvedValue = value === 1 ? 8 : value - 1;
    onClick(resolvedValue as TeamIdButtonValueType);
  };

  return (
    <button
      type="button"
      className={cn(buttonVariants({ value, className }))}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      {...rest}
    >
      {value}
    </button>
  );
};
