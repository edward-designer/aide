import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { fileType } from "@prisma/client";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { pinecone } from "@/lib/pinecone";
import { z } from "zod";
import mammoth from "mammoth";

const f = createUploadthing();

export const ourFileRouter = {
  docUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    "application/msword": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    text: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ fileType: z.string() }))
    .middleware(async ({ input }) => {
      const { getUser } = getKindeServerSession();
      const user = getUser();

      if (!user || !user.id) throw new Error("Unauthenticated");

      return { userId: user.id, fileType: input.fileType };
    })
    .onUploadComplete(({ metadata, file }) => {
      //onUploadComplete must NOT use async function on Vercel
      let thisFileType: fileType = fileType.PDF;
      switch (metadata.fileType) {
        case "application/pdf":
          break;
        case "text/plain":
        case "application/rtf": {
          thisFileType = fileType.TEXT;
          break;
        }
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/msword": {
          thisFileType = fileType.WORD;
          break;
        }
        default:
          throw new Error("Unknown file type");
      }

      const handleFile = async () => {
        const createdFile = await db.file.create({
          data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: `https://utfs.io/f/${file.key}`,
            uploadStatus: "PROCESSING",
            fileType: thisFileType,
          },
        });

        try {
          const response = await fetch(`https://utfs.io/f/${file.key}`);
          console.warn("fetch");
          let loader: PDFLoader | TextLoader | DocxLoader;
          switch (metadata.fileType) {
            case "application/pdf": {
              const blob = await response.blob();
              loader = new PDFLoader(blob);
              break;
            }
            case "text/plain":
            case "application/rtf": {
              const blob = await response.blob();
              loader = new TextLoader(blob);
              break;
            }
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/msword": {
              const arrayBuffer = await response.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              // mammoth needs buffer input, arrayBuffer will fail silently
              const result = await mammoth.extractRawText({
                buffer,
              });
              const str = result.value;
              const blob = new Blob([str], { type: "plain/text" });
              loader = new TextLoader(blob);
              break;
            }
            default:
              throw new Error("Unknown file type:" + metadata.fileType);
          }

          const pageLevelDocs = await loader.loadAndSplit();
          const pagesAmt = pageLevelDocs.length;
          const pineconeIndex = pinecone.Index("aide");

          // add metadata
          for (const doc of pageLevelDocs) {
            doc.metadata = {
              ...doc.metadata,
              fileId: createdFile.id,
              userId: metadata.userId,
            };
          }

          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_SECRET_KEY,
          });

          await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
            pineconeIndex,
          });

          await db.file.update({
            data: {
              uploadStatus: "SUCCESS",
            },
            where: {
              id: createdFile.id,
            },
          });
        } catch (err) {
          console.warn(err);
          await db.file.update({
            data: {
              uploadStatus: "FAILED",
            },
            where: {
              id: createdFile.id,
            },
          });
        }
      };
      handleFile().catch((err) => console.warn(err));
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
