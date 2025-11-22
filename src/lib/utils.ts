import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}







/* Usage Example:
import { cn } from "@/lib/utils";
export default function MyComponent() {
  return (
    <div className={cn("p-4", "bg-blue-500", { "text-white": true })}>  
      Hello, World!
    </div>
  );
} */  









  // end