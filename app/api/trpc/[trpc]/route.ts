import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: (opts) => {
      const { error } = opts;
      console.error("Error:", error);
    },
  });

export { handler as GET, handler as POST };
