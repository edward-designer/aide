export const runtime = "edge";

import { openAi } from "@/lib/openAi";
import { pinecone } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: NextRequest) => {
  // AI
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_SECRET_KEY,
  });
  const pineconeIndex = pinecone.Index("aide");

  // Request
  const body = await req.json();
  const { userId, fileId, message, formattedPrevMessages } =
    SendMessageValidator.parse(body);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    filter: { fileId, userId },
  });
  const results = await vectorStore.similaritySearch(message, 4);

  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.1, // 0 - 2 higher more random answers
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
  \n----------------\n

  PREVIOUS CONVERSATION:
  ${formattedPrevMessages?.map((message) => {
    if (message.role === "user") return `User: ${message.content}\n`;
    return `Assistant: ${message.content}\n`;
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${results.map((r) => r.pageContent).join("\n\n")}
  
  USER INPUT: ${message}`,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
