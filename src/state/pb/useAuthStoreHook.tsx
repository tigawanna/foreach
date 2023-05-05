import { useEffect } from "react";
import { getUser,} from "./config";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "rakkasjs";





export function useAuthStateHook(){
    const query = useQuery({ queryKey: ['user'], queryFn: getUser })
    
    const location = useLocation()
    useEffect(() =>{
        
    },[query.data])

}
