import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.NODE_ENV === "production")
    return `https://aideuk.vercel.app/${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export type SupportedFileTypes = "pdf" | "word" | "text";

export function getFileType(filename: string): SupportedFileTypes {
  const extension = filename.substring(
    filename.lastIndexOf(".") + 1,
    filename.length
  );
  switch (extension) {
    case "pdf":
      return "pdf";
    case "doc":
    case "docx":
      return "word";
    case "txt":
    case "rtf":
      return "text";
  }
  throw new Error("File type not supported");
}
