import { Loader2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="min-h-[100vh] w-full flex-centered">
      <Loader2 aria-hidden className="h-lg w-lg text-accent/100" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
