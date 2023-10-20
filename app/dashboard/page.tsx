import Dashboard from "@/components/Dashboard";
import useLoggedIn from "@/hook/useLoggedIn";

const Page = async () => {
  const user = await useLoggedIn();
  return <Dashboard user={user} />;
};

export default Page;
