"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";
import { useToast } from "../ui/use-toast";
import usePdfController from "./usePdfController";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface TPdfRenderer {
  url: string;
}

const PdfRenderer = ({ url }: TPdfRenderer) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  const { Menu, setTotalPages, curPage, scale, orientation } =
    usePdfController(url);

  return (
    <div className="w-full flex-centered flex-col bg-primary-foreground shadow">
      <div className="h-14 w-full border-b flex items-center justify-between">
        <Menu />
      </div>
      <div className="flex-1 w-full max-h-screen">
        <div
          ref={ref}
          className="w-full h-[calc(100vh-10rem)] max-w-full lg:w-[55vw] py-[1px] overflow-auto"
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
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
            file={url}
            className="max-h-full h-full"
          >
            <div className="flex-centered h-full">
              <Page
                width={width ? width : undefined}
                pageNumber={curPage}
                scale={scale}
                rotate={orientation}
                loading={
                  <div className="flex-centered">
                    <Loader2
                      aria-hidden
                      className="my-24 h-lg w-lg animate-spin"
                    />
                    <span className="sr-only">Loading</span>
                  </div>
                }
              />
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
