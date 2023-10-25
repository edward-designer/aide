import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="p-lg flex [&>*]:flex-1 [&>*:first-child]:flex-grow-[3] [&>*:last-child]:flex-grow-[2] gap-lg mt-lg">
      <Skeleton height={600} count={1} />
      <Skeleton height={600} count={1} />
    </div>
  );
}
