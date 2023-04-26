import { ReactProgress } from "../../shared/loaders/ReactProgress";
import { useIsNavigating } from "../../shared/hooks/useIsNavigating";

interface RootHeaderProps {

}

export function RootHeader({}:RootHeaderProps){
const is_navigating = useIsNavigating()
return (
    <header className="w-full  z-30  bg-slate-900 bg-opacity-20 text-slate-800 ">
        <ReactProgress isAnimating={is_navigating} />
    </header>
);
}
