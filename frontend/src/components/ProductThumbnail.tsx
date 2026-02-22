import { cn } from "@/utils/cn";

interface ProductThumbnailProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

/**
 * Displays a product image thumbnail with consistent styling.
 *
 * @component
 * @example
 * <ProductThumbnail imageUrl="/path/to/image.jpg" />
 */
const ProductThumbnail = ({
  imageUrl,
  alt = "상품 이미지",
  className,
}: ProductThumbnailProps) => {
  return (
    <figure className={cn("w-full h-[440px] p-4 dark:bg-gray-950", className)}>
      <img
        src={imageUrl}
        alt={alt}
        className="object-cover w-full h-full rounded-xl bg-gray-100 dark:bg-gray-800"
      />
    </figure>
  );
};

export default ProductThumbnail;
