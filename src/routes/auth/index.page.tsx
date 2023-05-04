import { LoginForm } from "@/src/components/form/LoginForm";
import { pb } from "@/src/state/pb/config";
import { useAuthStateHook } from "@/src/state/pb/useAuthStoreHook";
import { useQuery } from "@tanstack/react-query";
import { Page, usePageContext } from "rakkasjs";

const auth: Page = ({}) => {
  // const {} = usePageContext()
  // useAuthStateHook();
  const query = useQuery({
    queryKey:['user'],
    queryFn:()=>pb.authStore.model,
  })
  return (
    <main className="min-h-screen w-full flex items-center justify-center ">
      {query.data?.user?.email && <h1 className="w-[50%] h-[505] flex items-center justify-center bg-green-700 ">
        {query.data?.user?.email}</h1>}
      {!query.data?.user?.email &&<LoginForm/>}
      <button className="w-[50%]  bg-red-700 p-2 rounded-lg"
      onClick={()=>pb.authStore.clear()}>
          LogOut
      </button>
    </main>
  );
}

export default auth
