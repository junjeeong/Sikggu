import { cn } from "@/utils/cn";

interface GoogleIconProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Circular Google login button icon.
 *
 * @component
 */
const GoogleIcon = ({ onClick, className }: GoogleIconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center transition bg-white rounded-full shadow-sm cursor-pointer size-10 hover:shadow-md hover:scale-105",
        "border border-gray-100 dark:border-gray-700 dark:bg-gray-800",
        className
      )}
      type="button"
      aria-label="Google Login"
    >
      <img
        src="/icons/google.svg"
        width={24}
        height={24}
        alt="구글 간편 로그인"
      />
    </button>
  );
};

export default GoogleIcon;
