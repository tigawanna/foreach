import { Page } from "rakkasjs";
import { CardWithForm } from "./CardExample";
import { Bills } from "./Bills";
import { Tenants } from "./Tenants";

const card: Page = ({}) => {
  return (
    <main className="h-full min-h-screen w-full flex flex-col items-center justify-center ">
      {/* Add your page content here */}
      {/* <h1 className="underline scroll-m-25 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent">
        CARD EXAMPLE
      </h1>
      <h1 className="p-5 m-5"></h1>
      <div className="h-full ">
        
      <CardWithForm/>
      <Bills/>
      </div> */}
      <Tenants/>
    </main>
  );
}

export default card
