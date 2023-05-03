import { getAllRecords } from "@/src/state/pb/config";
import { useQuery } from "@tanstack/react-query";
import { Page, usePageContext } from "rakkasjs";
import { Suspense } from "react";

const about: Page = ({}) => {
  const pageContext = usePageContext()
  const query = useQuery({queryKey:['about'],
  queryFn:()=>{
   return getAllRecords("tenants")
  }
});
const data = query.data
  return (
    <Suspense fallback="loading...">
      <main className="h-full w-full flex items-center justify-center ">
       {data && (
       <div className="w-full flex flex-col items-center justify-center gap-5">
        {data.map((item) => (
          <div className="border-2 shadow-lg p-4"
          key={item.id}>{item.id}</div>
        ))}
        </div>)}
      </main>
    </Suspense>

  );
}

export default about
