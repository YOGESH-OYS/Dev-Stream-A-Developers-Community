import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


// FLOATING NAVBAR HOME
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

