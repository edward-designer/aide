"use client";

import { useState } from "react";
import DropZone from "react-dropzone";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Upload } from "lucide-react";

import { UploadDropZone } from "./UploadDropZone";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <UploadDropZone />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadButton;
