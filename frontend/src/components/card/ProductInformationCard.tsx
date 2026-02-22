import { Link } from "react-router-dom";
import type { ProductResponse } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductInformationCardProps {
  info: ProductResponse;
  storeId: number;
  className?: string;
}

/**
 * Card component displaying summary information for a product.
 *
 * @component
 * @example
 * <ProductInformationCard info={productData} storeId={1} />
 */
const ProductInformationCard = ({
  info,
  storeId,
  className,
}: ProductInformationCardProps) => {
  return (
    <Link to={`/stores/${storeId}/products/${info.id}`} className="group block">
      <article
        className={cn(
          "flex w-full h-32 gap-2 border-b-2 border-gray-50 transition-colors duration-200",
          "group-hover:bg-sikggu-primary-50",
          "dark:border-gray-800 dark:bg-gray-900 dark:group-hover:bg-gray-800",
          className
        )}
      >
        <figure className="flex-shrink-0 w-40 h-full overflow-hidden border-gray-50 dark:border-gray-800">
          <img
            src={info.imageUrl}
            alt={info.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.07]"
          />
        </figure>

        <div className="flex flex-col justify-between flex-1 p-3">
          <div>
            {/* 상품명 */}
            <h2 className="text-xl font-bold text-gray-800 line-clamp-1 dark:text-gray-100">
              {info.name}
            </h2>

            {/* 가격 영역 */}
            <div className="flex flex-col mt-1">
              <span className="text-sm text-gray-400 line-through decoration-1 dark:text-gray-500">
                {info.originalPrice.toLocaleString()}원
              </span>
              <span className="text-xl font-extrabold text-red-500 dark:text-red-400">
                {info.salePrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* 하단 정보 (매장명 & 마감시간) */}
          <div className="flex justify-between text-xs text-gray-500 gap-0.5 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {info.store}
              </span>
            </div>
            <div className="flex items-center pr-4 font-semibold text-orange-600 dark:text-orange-400">
              <span className="bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 dark:bg-orange-900/20 dark:border-orange-800">
                {info.saleDeadline}까지
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductInformationCard;
