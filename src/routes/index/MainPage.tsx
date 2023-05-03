import { Home } from "lucide-react";
import { IconWrapper } from "../../components/shared/LucideIcon";

interface MainPageProps {}

export function MainPage({}: MainPageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-accent font-bold text-6xl">Massive</div>
      <IconWrapper Icon={Home} size={"100px"} />
    </div>
  );
}
