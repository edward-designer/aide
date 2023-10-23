import { Dispatch, SetStateAction, useState } from "react";
import { Document, Page } from "react-pdf";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Expand, Loader2, X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useResizeDetector } from "react-resize-detector";

interface TPdfFullscreen {
  url: string;
  setTotalPages: Dispatch<SetStateAction<number>>;
  curPage: number;
  orientation: number;
  totalPages: number;
}

const PdfFullscreen = ({
  url,
  setTotalPages,
  curPage,
  orientation,
  totalPages,
}: TPdfFullscreen) => {
  const [isOpen, setIsOpen] = useState(false);
  const { width, ref } = useResizeDetector();
  const { toast } = useToast();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant="ghost"
          className="gap-1.5"
          aria-label="fullscreen"
        >
          <Expand className="h-md w-md" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full max-h-[calc(100vh-10rem)] overflow-hidden m-0 p-0">
        <div
          ref={ref}
          className="w-full h-[calc(100vh-10rem)] max-w-full py-[1px] overflow-auto"
        >
          <Document
            loading={
              <div className="flex-centered">
                <Loader2 aria-hidden className="my-24 h-lg w-lg animate-spin" />
                <span className="sr-only">Loading</span>
              </div>
            }
            onLoadError={() => {
              toast({
                title: "Error loading PDF",
                description: "Please try again later.",
                variant: "destructive",
              });
            }}
            file={url}
            className="max-h-full h-full"
          >
            <div className="flex-centered flex-col">
              {new Array(totalPages).fill(0).map((_, ind) => (
                <Page
                  key={ind}
                  width={width ? width : undefined}
                  pageNumber={ind + 1}
                  rotate={orientation}
                />
              ))}
            </div>
          </Document>
        </div>
        <DialogClose asChild>
          <button
            className="absolute top-md right-lg bg-white shadow-sm rounded-full z-50 p-sm hover:bg-accent/100 hover:text-white"
            aria-label="Close"
          >
            <X className="w-md h-md" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
