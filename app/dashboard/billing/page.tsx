import BillingForm from "@/components/BillingForm/BillingForm";
import useLoggedIn from "@/hook/useLoggedIn";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Page = async () => {
  await useLoggedIn("dashboard/billing");
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <BillingForm subscriptionPlan={subscriptionPlan} />;
};

export default Page;
