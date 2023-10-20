import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const useLoggedIn = async (origin = "dashboard") => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const redirectUrl = `/auth-callback?origin=${origin}`;

  if (!user || !user.id) redirect(redirectUrl);

  const dbUser = await db.user.findFirst({
    where: { id: user.id },
  });

  if (!dbUser) redirect(redirectUrl);

  return dbUser;
};

export default useLoggedIn;
