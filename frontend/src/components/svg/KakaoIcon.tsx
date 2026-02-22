import { cn } from "@/utils/cn";

interface KakaoIconProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Circular Kakao login button icon.
 *
 * @component
 */
const KakaoIcon = ({ onClick, className }: KakaoIconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center transition bg-[#F5E14B] rounded-full shadow-sm cursor-pointer size-10 hover:shadow-md hover:scale-105",
        "border border-transparent dark:border-yellow-500",
        className
      )}
      type="button"
      aria-label="Kakao Login"
    >
      <img
        src="/icons/kakaotalk.svg"
        width={24}
        height={24}
        alt="카카오톡 간편 로그인"
      />
    </button>
  );
};

export default KakaoIcon;
