import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading } = trpc.authCallback.useQuery(undefined);

  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : "/dashboard");
    }
  }, [data, origin, router]);
};

export default Page;
