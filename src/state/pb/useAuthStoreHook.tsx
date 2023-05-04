import { useEffect } from "react";
import { pb } from "./config";
import { logNormal } from "@/src/utils/general";





export function useAuthStateHook(){
    
    useEffect(() => {
        pb.authStore.onChange(() => {
            const auth_store = pb.authStore.exportToCookie({ httpOnly: false })
            console.log("auth changed")
            logNormal(auth_store)
            document.cookie = auth_store; // make sure to export with httpOnly: false also on the node client
        });
    })

}
