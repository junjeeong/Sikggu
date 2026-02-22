import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * This ensures that class conflicts are resolved correctly (e.g., 'bg-red-500' overrides 'bg-blue-500').
 *
 * @param inputs - List of classes or conditional class objects.
 * @returns Merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
