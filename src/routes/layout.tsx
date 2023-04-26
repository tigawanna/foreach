import { Head, Layout } from "rakkasjs";
import { MainLayoout } from "../components/navigation/MainLayoout";
import '../styles/tailwind.css'





const layout: Layout = ({ children }) => {
  return (
    <div className="h-screen w-full flex ">
      <Head title="foreach">
        <html lang="en" />
        <link rel="icon" type="image/svg+xml" href="/loop.svg" />
      </Head>

    <MainLayoout>{children}</MainLayoout>
</div>
  );
}

export default layout;
