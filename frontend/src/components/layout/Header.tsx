import { cn } from "@/utils/cn";
import { GoBell } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

/**
 * Top navigation header with logo and action icons.
 *
 * @component
 */
const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50 flex items-center justify-between w-full h-14",
        "bg-white dark:bg-gray-900",
        "border-b border-transparent dark:border-gray-800",
        className
      )}
    >
      <Link to="/">
        <img
          src="/icons/logo.png"
          alt="식구"
          width={120}
          className="p-4 object-contain"
        />
      </Link>
      <div className="flex gap-2 pr-4">
        <button className="p-2 text-gray-900 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          <IoSearchOutline size={24} />
        </button>
        <button className="p-2 text-gray-900 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          <GoBell size={24} />
        </button>
        <button className="p-2 text-gray-900 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          <LiaShoppingBagSolid size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
