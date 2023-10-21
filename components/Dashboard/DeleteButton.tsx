"use client";

import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface TDeleteButton {
  callback: () => void;
}

const DeleteButton = ({ callback }: TDeleteButton) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Button
      onClick={() => {
        setIsClicked(true);
        callback();
      }}
      size="sm"
      className="w-lg h-lg rounded-full p-0 hover:bg-destructive-foreground hover:text-destructive"
      variant="destructive"
    >
      {isClicked ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DeleteButton;
