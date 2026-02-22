import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Primary action button component.
 *
 * @component
 * @example
 * <PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>
 */
const PrimaryButton = ({
  children,
  className,
  type = "button",
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full rounded-lg py-3 font-bold text-white transition-colors duration-200",
        "bg-sikggu-primary hover:bg-sikggu-primary/80",
        "dark:bg-orange-600 dark:hover:bg-orange-700",
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
