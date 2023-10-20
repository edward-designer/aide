"use client";

import { trpc } from "@/app/_trpc/client";
import { User } from "@prisma/client";
import { formatRelative } from "date-fns";
import { MessageSquare, Plus, Scan } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import DeleteButton from "./Dashboard/DeleteButton";
import UploadButton from "./UploadButton/UploadButton";
import Message from "./others/Message";

interface TDashboard {
  user?: User;
}

const Dashboard = ({ user }: TDashboard) => {
  const utils = trpc.useUtils();
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => utils.getUserFiles.invalidate(),
  });

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
        <UploadButton />
      </div>
      {/* display user files */}
      {files && files.length !== 0 ? (
        <ul className="mt-lg grid grid-cols-1 gap-md divide-y md:grid-cols-2 xl:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-text/20 bg-primary-foreground shadow transition hover:shadow-lg rounded-br-3xl"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-xs p-md"
                >
                  <div className="pt-xs px-xs flex w-full items-center justify-between space-x-md">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-accent/50 to-primary/50" />

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
                    mocked
                  </div>
                  <DeleteButton callback={() => deleteFile({ id: file.id })} />
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={6} />
      ) : (
        <Message
          icon={<Scan className="h-xl w-xl text-accent/80" />}
          heading="Nothing here..."
          text="Get started by uploading your first document now!"
        />
      )}
    </main>
  );
};

export default Dashboard;
