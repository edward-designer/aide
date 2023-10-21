import { NextApiRequest, NextApiResponse } from "next";
import { utapi } from "@/server/uploadthing";

export async function DELETE(request: Request) {
  const res = await request.json();
  await utapi.deleteFiles(res.key);
  return Response.json({ success: true });
}
