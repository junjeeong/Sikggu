import { PRODUCT_CATEGORY_LABEL, type ProductResponse } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductDescriptionProps {
  info: ProductResponse;
  onReserve?: () => void;
  className?: string;
}

/**
 * Displays detailed information about a product, including price, discount, deadline, quantity, and description.
 *
 * @component
 */
const ProductDescription = ({
  info,
  onReserve,
  className,
}: ProductDescriptionProps) => {
  const handleReserve = () => {
    if (onReserve) {
      onReserve();
    } else {
      alert("🛠️ 서비스 개발중...");
    }
  };

  // 할인율 계산
  const discountRate = Math.round(
    ((info.originalPrice - info.salePrice) / info.originalPrice) * 100
  );

  return (
    <section
      className={cn("flex flex-col p-5 bg-white dark:bg-gray-900 pb-28", className)}
    >
      {/* 상단 정보 섹션 */}
      <div className="flex flex-col gap-3 pb-4 border-gray-100 dark:border-gray-800">
        {/* 1. 카테고리 & 날짜 (밀착 배치) */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[11px] font-bold text-green-700 bg-green-50 border border-green-100 rounded-md dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
            {PRODUCT_CATEGORY_LABEL[info.ProductCategory] || "기타"}
          </span>
          <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
            {info.createdAt.split("T")[0]}
          </span>
        </div>

        {/* 2. 상품명 & 가격 (동일 선상 배치) */}
        <div className="flex items-start justify-between gap-4 pr-8">
          <h3 className="flex-1 text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 break-keep">
            {info.name}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-lg font-bold text-red-500 dark:text-red-400">
                {discountRate}%
              </span>
              <span className="text-xs text-gray-300 line-through decoration-gray-200 dark:text-gray-600 dark:decoration-gray-600">
                {info.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-gray-100">
              {info.salePrice.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 핵심 정보 박스 (마감기한, 수량) */}
      <div className="flex flex-col gap-2 p-4 mb-8 border rounded-2xl bg-gray-50 border-gray-100/50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <ClockIcon className="w-5 h-5 text-gray-300 dark:text-gray-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
              판매 기한
            </span>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
              {info.saleDeadline.replace("T", " ")} 까지
            </span>
          </div>
        </div>
        <div className="w-full h-px my-1 bg-gray-200/60 dark:bg-gray-700" />
        <div className="flex items-center gap-3">
          <BoxIcon className="w-5 h-5 text-gray-300 dark:text-gray-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
              남은 수량
            </span>
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
              {info.quantity}개 남음
            </span>
          </div>
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="mb-8">
        <h4 className="mb-3 text-sm font-black tracking-widest text-gray-400 uppercase dark:text-gray-500">
          상품 설명
        </h4>
        <p className="text-[15px] leading-relaxed text-gray-600 whitespace-pre-wrap dark:text-gray-300">
          {info.description}
        </p>
      </div>

      {/* CTA 버튼 */}
      <button
        className="w-full py-4 text-lg font-bold text-white transition-all rounded-2xl bg-sikggu-primary hover:bg-sikggu-primary/80 active:scale-[0.98] shadow-xl shadow-green-100/50 dark:shadow-none"
        onClick={handleReserve}
      >
        예약하기
      </button>
    </section>
  );
};

// 인라인 아이콘 컴포넌트
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BoxIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export default ProductDescription;
