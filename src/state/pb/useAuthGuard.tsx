import { useQuery } from "@tanstack/react-query"
import { Redirect } from "rakkasjs"
import { getUser } from "./config"

export function useAuthGuard(){
    const query = useQuery({ queryKey: ['user'], queryFn:()=>getUser()
 })
    const no_user = !query.data && query.isFetched && !query.isFetching

    if (no_user) {
        return <Redirect href="/auth" />
    }
}

