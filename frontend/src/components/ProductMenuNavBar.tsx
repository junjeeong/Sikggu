import { PRODUCT_CATEGORY_LABEL, type ProductCategory } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductMenuNavBarProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  className?: string;
}

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  ALL: "/icons/category_all.png",
  VEGETABLE: "/icons/category_vegetable.png",
  FRUIT: "/icons/category_fruit.png",
  MEAT_EGG: "/icons/category_meat_egg.png",
  SEAFOOD: "/icons/category_seafood.png",
  GRAIN: "/icons/category_grain.png",
  MEAL_KIT: "/icons/category_meal_kit.png",
  DAIRY_CHEESE: "/icons/category_dairy_cheese.png",
  PROCESSED: "/icons/category_processed.png",
  FROZEN_REFRIGERATED: "/icons/category_frozen.svg",
};

/**
 * Horizontal scrollable navigation bar for product categories.
 *
 * @component
 * @example
 * <ProductMenuNavBar selectedCategory="ALL" onSelectCategory={handleSelect} />
 */
const ProductMenuNavBar = ({
  selectedCategory,
  onSelectCategory,
  className,
}: ProductMenuNavBarProps) => {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-800",
        className
      )}
    >
      <ul className="flex items-center w-full gap-4 px-4 py-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {(
          Object.entries(PRODUCT_CATEGORY_LABEL) as [ProductCategory, string][]
        ).map(([key, label]) => {
          const isSelected = selectedCategory === key;
          return (
            <li
              key={key}
              className="flex-shrink-0 flex flex-col justify-center items-center gap-2.5 cursor-pointer group"
              onClick={() => onSelectCategory(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectCategory(key);
              }}
            >
              <div
                className={cn(
                  "w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-200",
                  isSelected
                    ? "bg-sikggu-primary/10 border-sikggu-primary shadow-sm scale-105 dark:bg-sikggu-primary/20"
                    : "bg-gray-50 border-transparent group-hover:bg-gray-100 dark:bg-gray-800 dark:group-hover:bg-gray-700"
                )}
              >
                <img
                  src={CATEGORY_ICONS[key]}
                  alt={label}
                  className={cn(
                    "w-8 h-8 transition-all",
                    isSelected
                      ? "opacity-100 scale-110"
                      : "opacity-60 group-hover:opacity-80 dark:opacity-50 dark:group-hover:opacity-80"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[11px] transition-colors",
                  isSelected
                    ? "font-bold text-gray-900 dark:text-gray-100"
                    : "font-medium text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductMenuNavBar;
