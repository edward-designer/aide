import ChatWrapper from "@/components/Chatter/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer/PdfRenderer";
import { db } from "@/db";
import useLoggedIn from "@/hook/useLoggedIn";
import { notFound } from "next/navigation";

interface TPage {
  params: { fileId: string };
}

const Page = async ({ params }: TPage) => {
  const { fileId } = params;

  const user = await useLoggedIn(`dashboard/${fileId}`);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <main className="flex-1 justify-between flex flex-col">
      <section className="mx-auto w-full max-w-8xl grow lg:flex xl:px-sm">
        <div className="flex-1 xl:flex">
          <div className="px-md py-md sm:px-lg lg:pl-lg xl:flex-1 xl:pl-lg">
            <PdfRenderer />
          </div>
        </div>
        <div className="shrink-0 flex-[0.75] border-t lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </section>
    </main>
  );
};

export default Page;