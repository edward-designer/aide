"use client";

import { getUserSubscriptionPlan } from "@/lib/stripe";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { PLANS } from "@/config/stripe";

interface TBillingForm {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const BillingForm = ({ subscriptionPlan }: TBillingForm) => {
  const { toast } = useToast();

  const { mutate: createStripeSession, isLoading } =
    trpc.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (!url)
          return toast({
            title: "Sorry, Something Went Wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
        window.location.href = url;
      },
    });
  return (
    <MaxWidthWrapper className="max-w-5xl">
      <form
        className="mt-lg"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Subscription</CardTitle>
            <CardDescription>
              You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
              plan.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col items-start space-y-sm md:flex-row md:justify-between md:space-x-0">
            <Button type="submit" onClick={() => void createStripeSession()}>
              {isLoading ? (
                <Loader2 className="mr-md h-md w-md animate-spin" />
              ) : null}
              {subscriptionPlan.isSubscribed
                ? "Manage Subscriptions"
                : `Upgrade to PRO for £${
                    PLANS.find((plan) => plan.slug === "pro")?.price.amount
                  }/month`}
            </Button>

            {subscriptionPlan.isSubscribed ? (
              <p className="rounded-full text-xs font-medium">
                {subscriptionPlan.isCanceled
                  ? "Your plan will be cancelled on "
                  : "Your plan renews on "}
                {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}
              </p>
            ) : null}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
