import Dashboard from "@/components/Dashboard/Dashboard";
import useLoggedIn from "@/hook/useLoggedIn";

const Page = async () => {
  const user = await useLoggedIn();
  console.log("user", user);
  return "<div>hello</div>";
  return <Dashboard user={user} />;
};

export default Page;
