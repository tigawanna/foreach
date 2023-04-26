import { ClientSuspense, Head, Layout } from "rakkasjs";
import '../styles/tailwind.css'
import { ReactProgress } from "../shared/loaders/ReactProgress";
import { useIsNavigating } from "../shared/loaders/hooks/useIsNavigating";
import { MantineProvider, ColorSchemeProvider, } from '@mantine/core';


import { ThemeToggle } from "../shared/wrappers/ThemeToggle";
import { useMantineColorTheme } from "../shared/loaders/hooks/useMantineColorTheme";

const layout:Layout = ({ children })=>{
const is_navigating = useIsNavigating()  
const {colorScheme,toggleColorScheme,dark} = useMantineColorTheme({})
return (
  <>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <ThemeToggle dark={dark} toggleColorScheme={toggleColorScheme}/>

     <Head title="foreach">
        <html lang="en" />
      <link rel="icon" type="image/svg+xml" href="/loop.svg" />
      </Head>

      <header className="w-full h-12 p-2 z-30 sticky top-0 bg-slate-900 bg-opacity-20 text-slate-800 ">
        <ClientSuspense fallback="">
         <ReactProgress isAnimating={is_navigating} />
        </ClientSuspense>
      </header>

      <section className={" h-full w-full "}>{children}</section>

      <footer className="footer flex flex-col md:flex-row items-center justify-center p-2">
  
      </footer>
    </MantineProvider>
    </ColorSchemeProvider>
    </>
);
}

export default layout;
