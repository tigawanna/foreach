import { ClientSuspense, Head, Layout } from "rakkasjs";
import { RouterTransition } from "../shared/Navprogress";
import '../styles/tailwind.css'

interface layoutProps {

}

const layout:Layout = ({ children })=>{
return (
  <>
     <Head title="foreach">
        <html lang="en" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <header className="w-full h-12 p-2 z-30 sticky top-0 bg-slate-900 bg-opacity-20 text-slate-800 ">
        <ClientSuspense fallback="">
            <RouterTransition />
        </ClientSuspense>
      </header>

      <section className={" h-full w-full "}>{children}</section>

      <footer className="footer flex flex-col md:flex-row items-center justify-center p-2">
  
      </footer>
    </>
);
}

export default layout;
