import { Page, usePageContext} from "rakkasjs";


const card: Page = ({}) => {
const pagectx =  usePageContext()
 
  return (
    <main className="h-full min-h-screen w-full flex flex-col items-center justify-center gap-5 ">
    <h2 className="text-2xl font-bold p-5">Card.tsx</h2>
  <h1 className="text-5xl font bold ">
        {pagectx.locals.auth?.email}
  </h1>
 


    </main>
  );
}

export default card
