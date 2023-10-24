"use client";

import { useState } from "react";

import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { UploadDropZone } from "./UploadDropZone";

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
