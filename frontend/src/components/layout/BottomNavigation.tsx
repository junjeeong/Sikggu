import { cn } from "@/utils/cn";
import { useState } from "react";
import { CiHeart, CiShoppingBasket } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { TfiHome } from "react-icons/tfi";

interface BottomNavigationProps {
  className?: string;
}

/**
 * Bottom navigation bar with fixed positioning.
 * Currently uses local state for demonstration.
 *
 * @component
 */
const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [currentPage, setCurrentPage] = useState("home");

  const commonButtonStyle =
    "flex flex-col items-center justify-center gap-1 transition-colors w-full h-full";
  const activeStyle = "text-sikggu-primary dark:text-sikggu-primary";
  const inactiveStyle = "text-gray-500 dark:text-gray-400";

  return (
    <nav
      className={cn(
        "fixed bottom-0 z-50 flex items-center justify-around h-[60px] w-full max-w-[600px]",
        "bg-white dark:bg-gray-900",
        "border-t border-gray-200 dark:border-gray-800",
        "rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <button
        onClick={() => setCurrentPage("home")}
        className={cn(
          commonButtonStyle,
          currentPage === "home" ? activeStyle : inactiveStyle,
          "hover:text-sikggu-primary dark:hover:text-sikggu-primary"
        )}
      >
        <TfiHome size={20} />
        <span className="text-xs font-medium">홈</span>
      </button>

      <button
        onClick={() => setCurrentPage("shop")}
        className={cn(
          commonButtonStyle,
          currentPage === "shop" ? activeStyle : inactiveStyle,
          "hover:text-sikggu-primary dark:hover:text-sikggu-primary"
        )}
      >
        <CiShoppingBasket size={24} />
        <span className="text-xs font-medium">주변 상품</span>
      </button>

      <button
        onClick={() => setCurrentPage("heart")}
        className={cn(
          commonButtonStyle,
          currentPage === "heart" ? activeStyle : inactiveStyle,
          "hover:text-sikggu-primary dark:hover:text-sikggu-primary"
        )}
      >
        <CiHeart size={24} />
        <span className="text-xs font-medium">자주 가는 상점</span>
      </button>

      <button
        onClick={() => setCurrentPage("profile")}
        className={cn(
          commonButtonStyle,
          currentPage === "profile" ? activeStyle : inactiveStyle,
          "hover:text-sikggu-primary dark:hover:text-sikggu-primary"
        )}
      >
        <IoPersonOutline size={24} />
        <span className="text-xs font-medium">내 정보</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
