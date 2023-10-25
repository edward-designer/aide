import { NextApiRequest, NextApiResponse } from "next";
import { utapi } from "@/server/uploadthing";
import { db } from "@/db";
import { pinecone } from "@/lib/pinecone";

export async function DELETE(request: Request) {
  const res = await request.json();

  /* STEP1: delete from uploadthing */
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

  /* STEP2: delete from Pinecone */
  try {
    const pineconeIndex = pinecone.Index("aide");
    const queryResponse = await pineconeIndex.query({
      vector: [
        0.72, 0.6, 0.79, 0.11, 0.81, 0.96, 0.61, 0.14, 0.06, 0.07, 0.93, 0.72,
        0.09, 0, 0.76, 0.5, 0.47, 0.8, 0.52, 0.13, 0.74, 0.36, 0.19, 0.83, 0.62,
        0.53, 0.88, 0.94, 0.14, 0.14, 0.7, 0.31, 0.43, 0.82, 0.79, 0.63, 0.43,
        0.41, 0.35, 0.62, 0.61, 0.15, 0.3, 0.19, 0.58, 0.08, 0.12, 0.13, 0.71,
        0.26, 0.54, 0.17, 0.86, 0.17, 0.43, 1, 0.37, 0.51, 0.62, 0.86, 0.88,
        0.38, 0.12, 0.4, 0.54, 0.22, 0.87, 0.46, 0.61, 0.43, 0.55, 0.99, 0.7,
        0.2, 0.16, 0.17, 0.1, 0.59, 0.6, 0.3, 0.41, 0.75, 0.41, 0.03, 0.19,
        0.56, 0.48, 0.72, 0.25, 0.69, 0.89, 0.16, 0.69, 0.59, 0.8, 0.31, 0.41,
        0.81, 0.64, 0.94, 0.84, 0.75, 0.53, 0.49, 0.36, 0.85, 0.3, 0.81, 0.06,
        0, 0.13, 0.59, 0.91, 0.26, 0.25, 0.33, 0.38, 0.59, 0.75, 0.19, 0.99,
        0.66, 0.24, 0.74, 0.76, 0.29, 0.47, 0.84, 0.19, 0.83, 0.64, 0.37, 0.43,
        0.76, 0.71, 0.97, 0.19, 0.92, 0.88, 0.24, 0.55, 0.13, 0.08, 0.24, 0.25,
        0.4, 0.46, 0.41, 0.32, 0.01, 0.97, 0.47, 0.51, 0.09, 0.29, 0.44, 0.61,
        0.88, 0.17, 0.85, 0.65, 0.24, 0.78, 0.66, 0.51, 0.78, 0.18, 0.51, 0.61,
        0.01, 0.97, 0.64, 0.7, 0.2, 0.04, 0.78, 0.27, 0.57, 0.87, 0.14, 0.46,
        0.09, 0.62, 0.19, 0.46, 0.75, 0.85, 0.61, 0.27, 0.05, 0.02, 0.7, 0.37,
        0.82, 0.35, 0.54, 0.28, 0.62, 0.34, 0.22, 0.34, 0.44, 0.06, 0.56, 0.1,
        0.09, 0.16, 0.18, 0.08, 0.2, 0.64, 0.52, 0.6, 0.7, 0.8, 0.92, 0.9, 0.05,
        0.97, 0.1, 0.53, 0.21, 0.88, 0.95, 0.66, 0.24, 0.71, 0.54, 0.92, 0.14,
        0.31, 0.75, 0.12, 0.51, 0.33, 0.93, 0.36, 0.87, 0.04, 0.61, 0.68, 0.62,
        0.04, 0.44, 0.21, 0.32, 0.38, 0.67, 0.38, 0.81, 0.87, 0.98, 0.52, 0.38,
        0.35, 0.47, 0.6, 0.68, 0.27, 0.48, 0.94, 0.35, 0.46, 0.84, 0.85, 0.66,
        0.23, 0.32, 0.69, 0, 0.92, 0.25, 0.52, 0.66, 0.27, 0.14, 0.92, 0.92,
        0.53, 0.12, 0.41, 0.84, 0.07, 0.38, 0.21, 0.12, 0.32, 0.78, 0.82, 0.25,
        0.03, 0.7, 0.69, 0.94, 0.49, 0.39, 0.81, 0.7, 0.98, 0.06, 0.67, 0.03,
        0.85, 0.84, 0.93, 0.32, 0.97, 0.8, 0.23, 0.2, 0.95, 0.25, 0.07, 0.42,
        0.18, 0.79, 0.22, 0.48, 0.9, 0.82, 0.35, 0.25, 0.1, 0.43, 0.12, 0.99,
        0.45, 0.66, 0.6, 0.83, 0.2, 0.84, 0.41, 0.8, 0.13, 0.93, 0.5, 0.98,
        0.42, 0.38, 0.26, 0.77, 0.3, 0.41, 0.24, 0.41, 0.09, 0.3, 0.79, 0.05,
        0.91, 0.39, 0.1, 0.26, 0.24, 0.1, 0.05, 0.83, 0.74, 0.62, 0.56, 0.44,
        0.06, 0.35, 0.67, 0.78, 0.17, 0.51, 0.27, 0.04, 0.66, 0.84, 0.3, 0.33,
        0.43, 0.99, 0.64, 0.13, 0.72, 0.09, 0.65, 0.4, 0.23, 0.72, 0.01, 0.14,
        0.3, 0.78, 0.35, 0.99, 0.31, 0.1, 0.02, 0.9, 0.69, 0.6, 0.6, 0, 0.23,
        0.87, 0.67, 0.34, 0.51, 0.84, 0.73, 0.29, 0.94, 0.55, 0.7, 0.76, 0.15,
        0.99, 0.11, 0.35, 0.64, 0.6, 0.45, 0.9, 0.19, 0.02, 0.92, 0.56, 0.9,
        0.58, 0.06, 0.5, 0.88, 0.43, 0.37, 0.47, 0.78, 0.3, 0.52, 0.92, 0.61,
        0.38, 0.9, 0.8, 0.11, 0.2, 0.31, 0.55, 0.7, 0.58, 0.13, 0.97, 0.45,
        0.08, 0.22, 0.69, 0.46, 0.82, 0.94, 0.81, 0.14, 0.28, 0.12, 0.18, 0.66,
        0.66, 0.05, 0.01, 0.97, 0.87, 0.01, 0.69, 0.32, 1, 0.63, 0.64, 0.74,
        0.92, 0.47, 0.79, 0.06, 0.29, 0.03, 0.24, 0.54, 0.19, 1, 0.11, 0.73,
        0.02, 0.59, 0.24, 0.18, 0.39, 0.32, 0.39, 0.12, 0.47, 0.6, 0.92, 0.57,
        0.25, 0.83, 0.61, 0.17, 0.94, 0.2, 0.23, 0.85, 0.13, 0.3, 0.89, 0.16,
        0.63, 0.22, 0.52, 0.51, 0.36, 0.29, 0.51, 0, 0.87, 0.69, 0.24, 0.52,
        0.95, 0.6, 0.26, 0.29, 0.97, 0.67, 0.46, 0.12, 0.62, 0.89, 0.5, 0.9,
        0.85, 0.03, 0.11, 0.12, 0.67, 0.46, 0.76, 0.45, 0.19, 0.89, 0.31, 0.28,
        0.34, 0.69, 0.36, 0.59, 0.62, 0.69, 0.79, 0.97, 0.36, 0.11, 0.89, 0.87,
        0.96, 0, 0.51, 0.5, 0.41, 0.52, 0.04, 0, 0.8, 0.51, 0.51, 0.33, 0.31,
        0.06, 0.85, 0.62, 1, 0.26, 0.56, 0.43, 0.58, 0.34, 0.85, 0.98, 0.67,
        0.32, 0.52, 0.27, 0.2, 0.35, 0.25, 0.05, 0.24, 0.91, 0.84, 0.29, 0.08,
        0.73, 0.28, 0.39, 0.92, 0.21, 0.89, 0.65, 0.22, 0.24, 0.8, 0.87, 0.96,
        0.26, 0.01, 0.96, 0.36, 0.92, 0.99, 0.68, 0.36, 0.95, 0.75, 0.09, 0.92,
        0.01, 0.41, 0.18, 0.78, 0.03, 0.54, 0.08, 0.97, 0.86, 0.69, 0.43, 0.92,
        0.53, 0, 0.82, 0.25, 0.7, 0.1, 0.29, 0.37, 0.3, 0.52, 0.92, 0.37, 0.49,
        0.64, 0.38, 0.8, 0.91, 0.67, 0.05, 0.03, 0.72, 0.39, 0.19, 0, 0.83,
        0.56, 0.73, 0.35, 0.71, 0.71, 0.86, 0.93, 0.73, 0.94, 0.86, 0.61, 0.03,
        0.14, 0.45, 0.77, 0.97, 0.76, 0.48, 0.57, 0.39, 0.88, 0.58, 0.45, 0.79,
        0.56, 0.99, 0.5, 0.89, 0.1, 0.51, 0.05, 0.28, 0.83, 0.38, 0.31, 0.53,
        0.51, 0.66, 0.36, 0.19, 0.64, 0.75, 0.19, 0.89, 0.56, 0.61, 0.99, 0.1,
        0.15, 0.1, 0.8, 0.87, 0.74, 0.47, 0.84, 0.71, 0.16, 0.45, 0.91, 0.74,
        0.79, 0.7, 0.73, 0.93, 0.21, 0.53, 0.89, 0.11, 0.7, 0.36, 0.27, 0.06,
        0.39, 0.53, 0.54, 0.93, 0.32, 0.93, 0.97, 0.7, 0.05, 0.34, 0.97, 0.39,
        0.09, 0.36, 0.4, 0.18, 0.12, 0.31, 0.15, 0.5, 0.1, 0.65, 0.64, 0.78,
        0.77, 0.62, 0.01, 0.39, 0.62, 0.09, 0.64, 0.97, 0.49, 0.42, 0.69, 0.6,
        0.26, 0.76, 0.21, 0.9, 0.87, 0.33, 0.27, 0.04, 0.91, 0.22, 0.11, 0.29,
        0.94, 0.55, 0.04, 0.91, 0.25, 0.02, 0.74, 0.34, 0.28, 0.32, 0.05, 0.74,
        0.78, 0.34, 0.82, 0.45, 0.96, 0.42, 0.83, 0.05, 0.12, 0.6, 0.99, 0.61,
        0.62, 0.62, 0.05, 0.25, 0.08, 0.8, 0.67, 0.9, 0.08, 0.86, 0.11, 0.43,
        0.15, 0.31, 0.74, 0.98, 0.09, 0.44, 0.29, 0.54, 0.5, 0.78, 0.47, 0.4,
        0.36, 0.71, 0.98, 0.07, 0.36, 0.22, 0.84, 0.48, 0.3, 0.86, 0.69, 0.49,
        0.99, 0.62, 0.32, 0.35, 0.24, 0.88, 0.29, 0.91, 0.4, 0.35, 0.54, 0.23,
        0.22, 0.99, 0.58, 0.69, 0.87, 0.17, 0.98, 0.5, 0.31, 0.48, 0.14, 0.1,
        0.28, 0.71, 0.77, 0.95, 0.03, 0.94, 0.77, 0.5, 0.14, 0.36, 0.29, 0.88,
        0.41, 0.31, 0.1, 0.04, 0.75, 0.06, 0.82, 0.18, 0.81, 0.72, 0.69, 0.02,
        0.1, 0.52, 0.37, 0.98, 0.9, 0.13, 0.11, 0.79, 0.71, 0.36, 0.92, 0.85,
        0.34, 0.09, 0.46, 0.1, 0.48, 0.08, 0.72, 0.24, 0.61, 0.2, 0.89, 0.4,
        0.92, 0.58, 0.36, 0.1, 0.72, 0.14, 0.7, 0.68, 0.54, 0.32, 0.19, 0.81,
        0.07, 0.01, 0.54, 0.75, 0.53, 0, 0.3, 0.84, 0.46, 0.24, 0.26, 0.26,
        0.16, 0.25, 0.94, 0.86, 0.42, 0.71, 0.57, 0.68, 0.86, 0.75, 0.14, 0.69,
        0.4, 0.37, 0.49, 0.49, 0.68, 0.17, 0.1, 0.91, 0.86, 0.32, 0.37, 0.75,
        0.4, 0.25, 0.09, 0.33, 0.12, 0.61, 0.13, 0.36, 0.99, 0.27, 0.24, 0.52,
        0.1, 0.22, 0.41, 0.11, 0.05, 0.34, 0.62, 0.98, 0.89, 0.09, 0.6, 0.2,
        0.44, 0.27, 0.16, 0.15, 0.8, 0.58, 0.95, 0.08, 0.19, 0.23, 0.82, 0.08,
        0.12, 0.4, 0.86, 0.91, 0.97, 0.27, 0.43, 0.77, 0.62, 0.39, 0.45, 0.73,
        0.88, 0.47, 0.45, 0.97, 0.59, 0.49, 0.76, 0.13, 0.31, 0.5, 0.22, 0.13,
        0.43, 0.95, 0.34, 0.35, 0.05, 0.1, 0.08, 0.08, 0.25, 0.4, 0.25, 0.43,
        0.71, 0.68, 0.17, 0.86, 0.72, 0.85, 0.02, 0.12, 0.1, 0.02, 0.26, 0.74,
        0.99, 0.81, 0.33, 0.57, 0.34, 0, 0.12, 0.47, 0.55, 0.9, 0.58, 0.82,
        0.29, 0.11, 0.98, 0.64, 0.59, 0.01, 0.09, 0.87, 0.23, 0.8, 0.15, 0.65,
        0.36, 0.39, 0.11, 0.53, 0.3, 0.47, 0.73, 0.99, 0.52, 0.47, 0.58, 0.3,
        0.58, 0.91, 0.49, 0.5, 0.32, 0.95, 0.95, 0.2, 0.99, 0.62, 0.56, 0.93,
        0.84, 0.08, 0.43, 0.26, 0.68, 0.72, 0.93, 0.04, 0.75, 0.39, 0.4, 0.2,
        0.2, 0.53, 0.11, 0.63, 0.13, 0.77, 0.54, 0.37, 0.03, 0.78, 0.82, 0.98,
        0.05, 0.39, 0.45, 0.9, 0.17, 0.94, 0.18, 0.42, 0.84, 0.26, 0.22, 0.16,
        0.79, 0.32, 0.31, 0.6, 0.67, 0.81, 0.28, 0.44, 0.74, 0.8, 0.29, 0.48,
        0.25, 0.52, 0.27, 0.09, 0.46, 0.42, 0.94, 0.95, 0.91, 0.54, 0.4, 0.18,
        0.86, 0.26, 0.76, 0.87, 0.08, 0.99, 0.06, 0.91, 0.79, 0.96, 0.15, 0.44,
        0.78, 0.6, 0.35, 0.28, 0.43, 0.99, 0.21, 0.94, 0.28, 0.42, 0.08, 0.14,
        0.59, 0.26, 0.05, 0.6, 0.43, 0.14, 0.86, 0.44, 0.12, 0.42, 0.49, 0.09,
        0.03, 0.96, 0.67, 0.94, 0.06, 0.14, 0.57, 0.39, 0.14, 0.51, 0.05, 0.7,
        0.76, 0.73, 0.04, 0.02, 0.67, 0.42, 0.87, 0.4, 0.44, 0.33, 0.05, 0.64,
        0.64, 0.47, 0.34, 0.48, 0.26, 0.82, 0.06, 0.38, 0.35, 0.59, 0.52, 0.62,
        0.45, 0.68, 0.29, 0.8, 0.3, 0.25, 0.38, 0.3, 0.92, 0.75, 0.59, 0.9,
        0.44, 0.16, 0.54, 0.36, 0.9, 0.14, 0.41, 0.91, 0.94, 0.97, 0.25, 0.74,
        0.15, 0.42, 0.42, 0.44, 0.97, 0.16, 0.25, 0.55, 0.21, 0.86, 0.17, 0.95,
        0.33, 0.15, 0.59, 0.46, 0.32, 0.72, 0.74, 0.78, 0.36, 0.66, 0.74, 0.01,
        0.94, 0.73, 0.34, 0.91, 0.86, 0.69, 0.19, 0.98, 0.53, 0.27, 0.39, 0.63,
        0.09, 0.89, 0.87, 0.05, 0.3, 0.96, 0.54, 0.03, 0.28, 0.63, 0.82, 0.14,
        0.35, 0.02, 0.89, 0.36, 0.76, 0.48, 0.44, 0.76, 0.6, 0.14, 0.64, 0.14,
        0.1, 0.67, 0.58, 0.75, 0.1, 0.48, 0.29, 0.65, 0.93, 0.23, 0.75, 0.52,
        0.31, 0.24, 0.58, 0.64, 0.08, 0.65, 0.88, 0.75, 0.57, 0.69, 0.64, 0.02,
        0.93, 0.85, 0.41, 0.76, 0.96, 0.98, 0.91, 0.75, 0.2, 0.29, 0.01, 0.17,
        0.18, 0.67, 0.16, 0.1, 0.5, 0.21, 0.29, 0.54, 0.7, 0.66, 0.43, 0.71,
        0.29, 0.68, 0.97, 0.25, 0.93, 0.25, 0.43, 0.08, 0.94, 0.93, 0.97, 0.15,
        0.71, 0.44, 0.49, 0.3, 0.09, 1, 0.3, 0.04, 0.97, 0.09, 0.52, 0.12, 0.89,
        0.66, 0.85, 0.99, 0.88, 0.95, 0.9, 0.87, 0.27, 0.86, 0.72, 0.29, 0.08,
        0.14, 0.09, 0.2, 0.88, 0.46, 0.87, 0.48, 0.04, 0.65, 0.24, 0.29, 0.11,
        0.5, 0.72, 0.09, 0.96, 0.87, 0.65, 0.28, 0.35, 0.23, 0.77, 0.19, 0.57,
        0.9, 0.43, 0.87, 0.45, 0.3, 0.75, 0.91, 0.1, 0.7, 0.14, 0.38, 0.19,
        0.87, 1, 0.66, 0.95, 0.27, 0.48, 0.52, 0.32, 0.37, 0.59, 0.65, 0.01,
        0.57, 0.48, 1, 0.91, 0.12, 0.98, 0.2, 0.8, 0.36, 0.82, 0.13, 0.37, 0.22,
        0.31, 0.46, 0.22, 1, 0.11, 0.49, 0.72, 0.29, 0.39, 0.06, 0.2, 0.33,
        0.34, 0.89, 0.08, 0.94, 0.04, 0.9, 0.19, 0.08, 0.81, 0.1, 0.38, 0.39,
        0.4, 0.78, 0.58, 0.29, 0.89, 0.32, 0.47, 0.93, 0, 0.75, 0.77, 0.55,
        0.24, 0.98, 0.15, 0.91, 0.57, 0.84, 0.63, 0.22, 0.13, 0.44, 0.18, 0.16,
        0.7, 0.7, 0.72, 0.96, 0.97, 0.83, 0.06, 0.52, 0.72, 0.16, 0.45, 0.33,
        0.26, 0.51, 0.26, 0.99, 0.06, 0.58, 0.95, 0.52, 0.19, 0.85, 0.62, 0.05,
        0.51, 0.91, 0.36, 0.89, 0.99, 0.34, 0.3, 0.31, 0.71, 0.23, 0.78, 0.96,
        0.93, 0.61, 0.05, 0.5, 0.66,
      ],
      topK: 100,
      filter: { fileId: fileDBEntry.id },
    });
    const ids = queryResponse.matches.map((response) => response.id);
    await pineconeIndex.deleteMany(ids);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log(e);
    }
  }

  return Response.json({ success: true });
}
