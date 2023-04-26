import { Head, Layout } from "rakkasjs";


interface layoutProps {

}

const layout:Layout = ({ children })=>{
return (
  <>
    <Head title="User">
      <html lang="en" />
      <link rel="icon" type="image/svg+xml" href="/loop.svg" />
    </Head>
      <section className={" h-full w-full "}>{children}</section>
  </>
);
}

export default layout;
