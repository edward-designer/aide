import { Dispatch, useEffect, useState } from "react";
import { Input } from "../ui/input";

interface TPageInput {
  setCurPage: Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  curPage: number;
}

const PageInput = ({ setCurPage, totalPages, curPage }: TPageInput) => {
  const [inputPage, setInputPage] = useState<number>(1);
  const handleInput = () => {
    if (!inputPage || typeof inputPage !== "number" || inputPage < 1) {
      setInputPage(1);
      setCurPage(1);
      return;
    }
    if (inputPage > totalPages) {
      setInputPage(totalPages);
      setCurPage(totalPages);
      return;
    }
    setCurPage(inputPage);
  };

  useEffect(() => {
    setInputPage(curPage);
  }, [curPage]);

  return (
    <Input
      className="w-xl h-lg text-center no-input-arrows"
      value={inputPage}
      onChange={(e) => {
        let input: number = Number(e.target.value);
        if (Number.isNaN(input)) input = 1;
        setInputPage(input);
      }}
      onFocus={(e) => e.target.select()}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        handleInput();
      }}
    />
  );
};

export default PageInput;
