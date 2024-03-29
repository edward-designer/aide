import Dashboard from "@/components/Dashboard/Dashboard";
import useLoggedIn from "@/hook/useLoggedIn";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Page = async () => {
  const user = await useLoggedIn();
  const { isSubscribed } = await getUserSubscriptionPlan();

  return <Dashboard user={user} isSubscribed={isSubscribed} />;
};

export default Page;
