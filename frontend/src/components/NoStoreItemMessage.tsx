import { cn } from "@/utils/cn";

interface NoStoreItemMessageProps {
  message?: string;
  subMessage?: string;
  icon?: string;
  imageSrc?: string;
  className?: string;
}

/**
 * Component to display a message when no store items are available.
 * Supports an emoji icon or an image.
 *
 * @component
 * @example
 * <NoStoreItemMessage message="No items found" icon="🔍" />
 */
const NoStoreItemMessage = ({
  message = "등록된 상품이 없습니다.",
  subMessage,
  icon = "🛒",
  imageSrc,
  className,
}: NoStoreItemMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500",
        className
      )}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={message}
          className="object-contain w-16 h-16 mb-4 opacity-80"
        />
      ) : (
        <span className="mb-4 text-4xl" role="img" aria-label="알림 아이콘">
          {icon}
        </span>
      )}
      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        {message}
      </p>
      {subMessage && (
        <p className="text-sm text-gray-400 dark:text-gray-500">{subMessage}</p>
      )}
    </div>
  );
};

export default NoStoreItemMessage;
