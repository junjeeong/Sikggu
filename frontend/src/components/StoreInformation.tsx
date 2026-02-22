import { cn } from "@/utils/cn";

interface StoreInformationProps {
  storeName: string;
  storeLocation?: string;
  profileImage?: string;
  className?: string;
}

/**
 * Displays store information including profile image, name, and location.
 *
 * @component
 * @example
 * <StoreInformation storeName="My Store" storeLocation="Seoul, Korea" />
 */
const StoreInformation = ({
  storeName,
  storeLocation = "위치 정보 없음",
  profileImage,
  className,
}: StoreInformationProps) => {
  return (
    <div
      className={cn(
        "flex items-center w-full p-4 h-14 bg-white dark:bg-gray-900",
        className
      )}
    >
      {profileImage ? (
        <figure className="flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full size-12 shrink-0 overflow-hidden">
          <img
            src={profileImage}
            alt={`${storeName} 사장님 프로필`}
            className="w-full h-full object-cover"
          />
        </figure>
      ) : (
        <img
          src="/images/profile.png"
          alt="기본 프로필"
          width={48}
          height={48}
          className="shrink-0"
        />
      )}
      <div className="flex flex-col flex-1 pl-4 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
          {storeName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {storeLocation}
        </p>
      </div>
    </div>
  );
};

export default StoreInformation;
