import Dashboard from "@/components/Dashboard/Dashboard";
import useLoggedIn from "@/hook/useLoggedIn";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Page = async () => {
  const user = await useLoggedIn();

  return <Dashboard user={user} />;
};

export default Page;
