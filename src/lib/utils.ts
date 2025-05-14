import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cleanString(input: string, toLowerCase: boolean = true) {
    if (typeof input !== "string") return input;

    const cleanedString = input.trim().replace(/\s+/g, " ");
    return toLowerCase ? cleanedString.toLowerCase() : cleanedString;
}
