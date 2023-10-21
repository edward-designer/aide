import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

interface TProgressBar {
  className?: string;
  completed?: boolean;
}

const ProgressBar = ({ className, completed = false }: TProgressBar) => {
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadPercentage((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + ((95 - prev) / 95) * 5;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (completed) setUploadPercentage(100);
  }, [completed]);

  return <Progress value={uploadPercentage} className={className} />;
};

export default ProgressBar;
