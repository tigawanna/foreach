// This is the main layout of our app. It renders the header and the footer.

import { Layout, Redirect } from "rakkasjs";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import { AppShell } from "./index/components/AppShell";
import { RakkasErrorBoundary } from "../components/shared/wrappers/RakkasError";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../state/pb/config";

const MainLayout: Layout = ({ children }) => {


return(

<RakkasErrorBoundary>
    <AppShell children={children} />
        <ReactQueryDevtools initialIsOpen={false} />
</RakkasErrorBoundary>
)};
export default MainLayout;
