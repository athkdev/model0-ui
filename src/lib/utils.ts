import { clsx, type ClassValue } from "clsx";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const primaryFont = localFont({
  src: "../../public/cdn/fonts/Switzer-Variable.woff2",
});

export const headerFont = localFont({
  src: "../../public/cdn/fonts/Tanker-Regular.woff2",
});
