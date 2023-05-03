// This is the main layout of our app. It renders the header and the footer.

import { Layout } from "rakkasjs";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import { AppShell } from "./index/components/AppShell";
import { RakkasErrorBoundary } from "../components/shared/wrappers/RakkasError";


const MainLayout: Layout = ({ children }) => (
<RakkasErrorBoundary>
    <AppShell children={children} />
</RakkasErrorBoundary>
);
export default MainLayout;
