"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp, RotateCw, Search } from "lucide-react";
import { Button } from "../ui/button";
import PageInput from "./PageInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import PdfFullscreen from "./PdfFullscreen";

const usePdfController = (url: string) => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [scale, setScale] = useState(1);
  const [orientation, setOrientation] = useState(0);

  const Menu = () => (
    <div className="px-md flex items-center gap-md justify-between flex-1">
      <div className="flex">
        <Button
          onClick={() => {
            if (curPage <= 1) return;
            setCurPage(curPage - 1);
          }}
          variant="ghost"
          aria-label="previous page"
          disabled={curPage <= 1}
        >
          <ChevronDown className="h-md w-md" />
        </Button>

        <div className="flex items-center gap-sm">
          <PageInput
            curPage={curPage}
            setCurPage={setCurPage}
            totalPages={totalPages}
          />
          <p className="text-text text-sm space-x-sm">
            <span>/ {totalPages}</span>
          </p>
        </div>

        <Button
          onClick={() => {
            if (curPage >= totalPages) return;
            setCurPage(curPage + 1);
          }}
          variant="ghost"
          aria-label="next page"
          disabled={curPage >= totalPages}
        >
          <ChevronUp className="h-md w-md" />
        </Button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-1.5" variant="ghost" aria-label="zoom">
              <Search className="h-md w-md" />
              {scale * 100}% <ChevronDown className="h-sm w-sm opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[1, 1.5, 2, 2.5].map((zoom) => (
              <DropdownMenuItem key={zoom} onClick={() => setScale(zoom)}>
                {zoom * 100}%
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() => setOrientation(orientation + 90)}
          variant="ghost"
          aria-label={`rotate 90 degrees`}
        >
          <RotateCw className="h-md w-md" />
        </Button>
        <PdfFullscreen
          url={url}
          setTotalPages={setTotalPages}
          curPage={curPage}
          orientation={orientation}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
  return { Menu, setTotalPages, scale, curPage, orientation };
};

export default usePdfController;
