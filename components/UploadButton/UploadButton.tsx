"use client";

import { useCallback, useState } from "react";
import DropZone, { useDropzone } from "react-dropzone";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v) => {
          if (!v) setIsOpen(v);
        }}
      >
        <DialogTrigger asChild onClick={() => setIsOpen(true)}>
          <Button variant="default">
            Upload a file <Upload className="w-md h-md ml-sm" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <UploadDropZone />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadButton;

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState(true);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) setIsUploading(true);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border h-64 m-4 border-dashed rounded-lg"
    >
      <div className="flex-centered h-full w-full">
        <label
          htmlFor="dropzone-file"
          className={cn([
            "flex-centered flex-col w-full h-full rounded-lg cursor-pointer hover:bg-primary/30",
            isDragActive
              ? "bg-primary/70 text-white"
              : " bg-primary/10 text-text",
          ])}
        >
          <input {...getInputProps()} accept="application/pdf" />
          <div className="flex-centered flex-col py-lg text-center">
            <Upload className="w-lg h-lg mb-md text-primary/100" />
            <p>
              <strong>Drag & Drop</strong> OR <strong>Click</strong> to Upload
              <br />
              (a PDF file up to 4MB)
            </p>
          </div>
          {isUploading && (
            <div className="max-w-xs bg-primary-foreground flex-centered rounded-md overflow-hidden outline outline-primary/5 divide-x">
              Uploading
            </div>
          )}
        </label>
      </div>
    </div>
  );
};
