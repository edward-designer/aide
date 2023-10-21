import { NextApiRequest, NextApiResponse } from "next";
import { utapi } from "@/server/uploadthing";
import { db } from "@/db";

export async function DELETE(request: Request) {
  const res = await request.json();

  const fileDBEntry = await db.file.findFirst({
    where: {
      userId: res.userId,
      key: res.key,
    },
  });

  if (!fileDBEntry)
    return new Response("Unauthorized access detected", {
      status: 401,
    });

  await utapi.deleteFiles(res.key);

  return Response.json({ success: true });
}
