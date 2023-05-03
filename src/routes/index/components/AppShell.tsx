import { Head, useLocation } from "rakkasjs";
import { NavBar } from "./NavBar";
import { IconWrapper } from "../../../components/shared/LucideIcon";
import { Menu } from "lucide-react";
import { useBackDrop } from "../../../hooks/useBackDrop";
import { ReactProgress } from "../../../components/shared/ReactProgress";
import { ScrollArea } from "@/src/components/ui/scroll-area";



interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { open, setOpen, is_mobile, slowlyCloseBackdrop } = useBackDrop();
  const location = useLocation();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Head title="Home" />
      

      {/* header */}
      <div className="h-14  w-full flex flex-col items-center justify-center sticky top-0 z-30 ">
        <div className="w-full  ">
        <ReactProgress isAnimating={location.pending?true:false} />
        </div>
        <div className="w-full p-2">
          <IconWrapper
            Icon={Menu}
            size={"30px"}
            className="hover:brightness-75"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/*  main body */}
      <div className="flex h-full w-full justify-between ">
        {/* SideNavBar */}

        {open && (
          <div
            onClick={slowlyCloseBackdrop}
            className="fixed top-10 z-40 flex h-full w-full flex-col animate-in slide-in-from-left 
            duration-300 md:sticky md:w-[15%] md:mt-6  "
          >
            <NavBar open={open} setOpen={setOpen} />
          </div>
        )}

        {/* app children */}
        <ScrollArea className="h-full w-full flex items-center justify-center">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
