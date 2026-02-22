import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  className?: string;
  role?: "자취생" | "사장님";
  signInOrSignup?: "로그인" | "회원가입";
}

/**
 * Layout for authentication pages (Sign In / Sign Up).
 * Centers the content and provides a consistent width.
 *
 * @component
 */
const AuthPageLayout = ({
  children,
  className,
  role,
  signInOrSignup,
}: AuthPageLayoutProps) => {
  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-white dark:bg-gray-950">
      <div
        className={cn(
          "h-full min-h-screen p-8 w-full max-w-[640px] flex flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-xl",
          className
        )}
      >
        {signInOrSignup && (
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {role && <span className="text-sikggu-primary mr-1">{role}</span>}
              {signInOrSignup}
            </h2>
          </header>
        )}
        {children}
      </div>
    </main>
  );
};

export default AuthPageLayout;
