import type { StoreResponse } from "@/types/store";
import { cn } from "@/utils/cn";
import { CiPhone } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";

interface StoreInformationCardProps {
  info: StoreResponse;
  className?: string;
}

/**
 * Card component displaying summary information for a store.
 *
 * @component
 * @example
 * <StoreInformationCard info={storeData} />
 */
const StoreInformationCard = ({ info, className }: StoreInformationCardProps) => {
  const DEFAULT_IMAGE = "/images/logo_mini.png";

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  return (
    <Link to={`/stores/${info.id}/products`} className="group block">
      <article
        className={cn(
          "flex w-full h-40 gap-2 border-b-2 border-gray-50 transition-colors duration-200",
          "group-hover:bg-sikggu-primary-50",
          "dark:border-gray-800 dark:bg-gray-900 dark:group-hover:bg-gray-800",
          className
        )}
      >
        <figure className="flex-shrink-0 h-full overflow-hidden border-gray-50 w-44 dark:border-gray-800">
          <img
            src={info.imageUrl || DEFAULT_IMAGE}
            alt={info.storeName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.07]"
            onError={handleImgError}
          />
        </figure>

        <div className="flex flex-col flex-1 gap-2 p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {info.storeName}
          </h2>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <SlLocationPin size={16} />
            <span className="text-sm">{info.address}</span>
            <CiPhone size={16} className="ml-4" />
            <span className="text-sm">{info.storeContactNumber}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-500">
            {info.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default StoreInformationCard;
