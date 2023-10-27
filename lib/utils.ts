import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
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

export function constructMetadata({
  title = "AIDe - AI Document Chat Service",
  description = "AIDe is your 24/7 personal assistant, allowing you to chat with any documents using latest AI technology. Simply upload your file and start asking questions right away!",
  image = "/preview.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@edwebdeveloper",
    },
    icons,
    metadataBase: new URL("https://aideuk.vercel.app"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
