import { LucideIcon,Home,User,X,Settings, LogOut, CreditCard, UserPlus } from "lucide-react";
import { Link, StyledLink, usePageContext } from "rakkasjs";
import { useDarkTheme } from "../../../hooks/useDarkTheme";
import { IconWrapper } from "../../../components/shared/LucideIcon";
import { AppLogo } from "../../../components/shared/AppLogo";
import { logOutUser } from "@/src/state/pb/config";


interface NavBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const links: { label: string; url: string; RouteIcon:LucideIcon }[] = [
  { label: "Home", url: "/", RouteIcon: Home },
  { label: "profile", url: "/profile", RouteIcon: User },
  { label: "card", url: "/card", RouteIcon: CreditCard },
  { label: "auth", url: "/auth", RouteIcon:UserPlus },
];

export function NavBar({ open, setOpen }: NavBarProps) {
  const { modeIcon, theme, toggleTheme } = useDarkTheme();
  const pgc = usePageContext()
  return (
    <div
      className="fixed flex h-full w-[80%] flex-col items-center 
      border shadow-2xl bg-secondary
       md:static md:w-[100%] "
    >
      
      <div className="absolute right-1 top-1 m-2 md:hidden ">
        <IconWrapper
          Icon={X}
          size={"25px"}
          className="hover:brightness-75"
          onClick={() => setOpen(false)}
        />
      </div>

      <Link href="/" className="w-full h-[10%] flex  items-center justify-center 
      hover:bg-slate-300 dark:hover:bg-slate-700
      p-2 border-b shadow-lg ">
        <AppLogo width="80px" height="80px" />
      </Link>

      <nav className="flex max-h-[60%] w-[90%] flex-grow flex-col  gap-3 pt-5 ">
        {links.map((link) => (
          <NavLink key={link.label} {...link} />
        ))}
      </nav>

      <div className=" flex h-[20%] flex-col gap-5">
        <IconWrapper Icon={Settings} size={"25px"} className="hover:brightness-75 hover:text-accent" />
        {pgc.locals.auth&&<div className="text-lg">USER</div>}
        <IconWrapper
          Icon={LogOut}
          onClick={() => { logOutUser(pgc) }}
          size={"25px"}
          className="hover:brightness-75"
        />

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconWrapper
            Icon={modeIcon}
            size={"25px"}
            className="hover:brightness-75"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  label: string;
  url: string;
  RouteIcon: LucideIcon;
}

function NavLink({ label, url, RouteIcon }: NavLinkProps) {
  return (
    <div className="flex w-full items-center justify-center gap-5 hover:brightness-90 
       dark:hover:brightness-150">
      <StyledLink
        href={url}
        className="flex h-full w-full items-center justify-center gap-5 rounded p-3 
        hover:bg-slate-300 dark:hover:bg-slate-900 text-lg font-semibold"
        activeClass="shadow-accent shadow text-accent-foreground"
      >
        <IconWrapper Icon={RouteIcon} size={"20px"} />

        {label}
      </StyledLink>
    </div>
  );
}
