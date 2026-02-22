import BottomNavigation from "@/components/layout/BottomNavigation";
import Header from "@/components/layout/Header";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface HeaderAndBottomNavLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Layout component that includes a Header and BottomNavigation.
 * Used for main application pages.
 *
 * @component
 */
const HeaderAndBottomNavLayout = ({
  children,
  className,
}: HeaderAndBottomNavLayoutProps) => {
  return (
    <main className="flex justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-950">
      <div
        className={cn(
          "relative h-screen w-full max-w-[600px] flex flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl",
          className
        )}
      >
        <Header />
        <div className="flex-1 overflow-y-auto pb-[60px]">
          {children}
        </div>
        <BottomNavigation />
      </div>
    </main>
  );
};

export default HeaderAndBottomNavLayout;
