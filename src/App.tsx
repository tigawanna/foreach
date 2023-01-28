import "./App.css";
import { RouterProvider } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryStateWrapper } from "./shared/wrappers/QueryStateWrapper";
import { LoaderElipse } from "./shared/loaders/Loaders";
import { appRoutes } from "./routes";
import { getUser } from "./utils/pb/config";
import { Notification } from "./components/index/Notification";
import { CustomPostType } from "./utils/types/types";

function App() {
    const query = useQuery(["user"], getUser);
    const qc =  useQueryClient()
    const user = query.data;
    // interface CustomPostDataShape {
    //     pages: CustomPostType[][]
    //     pageParams: any[]
    // }

    // //no-console("notification in App === ",notificationSignal.value.message)
    return (
        <QueryStateWrapper query={query} loader={<LoaderElipse />}>
            <div className=" dark:bg-slate-900 h-full dark:text-white dark:shadow-white ">
                <RouterProvider router={appRoutes(user,qc)} />
            </div>
            <div className="w-full fixed bottom-3 flex items-center justify-center">
                <Notification />
            </div>
        </QueryStateWrapper>
    );
}

export default App;


