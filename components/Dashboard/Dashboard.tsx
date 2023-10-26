"use client";

import { trpc } from "@/app/_trpc/client";
import { User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { MessageSquare, Plus, Bot } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import DeleteButton from "./DeleteButton";
import UploadButton from "../UploadButton/UploadButton";
import Message from "../others/Message";
import { toast } from "../ui/use-toast";

interface TDashboard {
  user: User;
  isSubscribed?: boolean;
}

const Dashboard = ({ user, isSubscribed = false }: TDashboard) => {
  const utils = trpc.useUtils();
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate: deleteDBEntry } = trpc.deleteFile.useMutation({
    onSuccess: () => utils.getUserFiles.invalidate(),
  });

  const deleteFileHandler = async (fileId: string, fileKey: string) => {
    /* STEP1: delete from UploadThing & pinecone DB */
    /* this requires the experimental Server Functions 
        await deleteServerFile(fileKey);*/

    /* this uses traditional Next API route */
    const deleteServerFile = await fetch("/api/uploadthing/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, key: fileKey }),
    });
    const { success } = await deleteServerFile.json();
    if (!success) {
      return toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    /* STEIP2: delete from database */
    deleteDBEntry({ id: fileId, fileId });
  };

  return (
    <main className="flex flex-col flex-1 mx-auto max-w-7xl p-sm md:p-lg w-full pt-lg">
      <div className="w-full mx-auto flex flex-col items-start justify-between gap-sm border-b-2 border-dotted border-accent/50 pb-sm sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-md font-extralight text-5xl text-text">
          MY fil
          <span className="relative inline-block -top-[0.2em] -mr-[3px]">
            e
          </span>
          s
        </h1>
        <UploadButton isSubscribed={isSubscribed} />
      </div>
      {/* display user files */}
      {files && files.length !== 0 ? (
        <ul className="mt-lg grid grid-cols-1 gap-md divide-y md:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <li
              key={file.id}
              className="col-span-1 divide-y divide-text/20 bg-primary-foreground shadow transition hover:shadow-lg rounded-br-3xl"
            >
              <Link
                href={`/dashboard/${file.id}`}
                className="flex flex-col gap-xs p-md"
              >
                <div className="pt-xs px-xs flex w-full items-center justify-between space-x-md">
                  <div
                    className="flex-centered overflow-hidden h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-accent/50 to-primary/50"
                    aria-hidden
                  >
                    <span className="-ml-4 mt-2 font-extrabold text-5xl text-white/70 mix-blend-hard-light">
                      {file.name.at(0)}
                    </span>
                  </div>

                  <div className="flex-1 truncate">
                    <h3 className="font-bold">{file.name}</h3>
                  </div>
                </div>
              </Link>
              <div className="px-md flex place-items-center py-2 gap-6 text-xs text-text">
                <div className="flex flex-1 items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {formatRelative(new Date(file.createdAt), new Date())}
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {file._count.Message}
                </div>
                <DeleteButton
                  callback={() => deleteFileHandler(file.id, file.key)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : isLoading ? (
        <div className="flex [&>*]:flex-1 gap-md mt-lg">
          <Skeleton height={120} className="mb-md" count={2} />
          <Skeleton height={120} className="mb-md" count={2} />
          <Skeleton height={120} className="mb-md" count={2} />
        </div>
      ) : (
        <Message
          icon={<Bot className="h-xl w-xl text-accent/90" />}
          heading="Can't Wait to Chat with U..."
          text="Get started by uploading your first document now!"
        />
      )}
    </main>
  );
};

export default Dashboard;
