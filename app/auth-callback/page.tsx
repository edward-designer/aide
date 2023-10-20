"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, error } = trpc.authCallback.useQuery(undefined);

  useEffect(() => {
    if (data?.success) {
      router.push(origin ? `/${origin}` : "/dashboard");
    }
  }, [data, origin, router]);

  useEffect(() => {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  }, [error, origin, router]);

  return (
    <div className="w-full min-h-[50vh] mt-lg flex-centered flex-col">
      <Loader2 className="h-lg w-lg animate-spin text-primary/100" />
      <h3 className="mt-lg font-semibold text-3xl">
        Setting up your account...
      </h3>
      <p className="mt-md text-sm">You will be redirected automatically.</p>
    </div>
  );
};

export default Page;
