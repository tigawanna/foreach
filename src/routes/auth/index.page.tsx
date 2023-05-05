import { LoginForm } from "@/src/components/form/LoginForm";
import { getUser, pb } from "@/src/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { Page} from "rakkasjs";

const auth: Page = ({}) => {


  // const query = useQuery('user',getUser)
  // console.log("query.data  == ",query.data)

  return (
    <main className="min-h-screen h-full w-full flex flex-col items-center justify-evenly gap-2 ">
      <LoginForm/>
    </main>
  );
}

export default auth
