"use server";

import { utapi } from "@/server/uploadthing";

export async function deleteServerFile(fileKey: string) {
  await utapi.deleteFiles(fileKey);
  
  return { success: true };
}
