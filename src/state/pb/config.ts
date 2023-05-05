import { QueryClient } from '@tanstack/react-query';
import PocketBase,{Record} from 'PocketBase'
import { PageContext } from 'rakkasjs';



export const pb_url = import.meta.env.RAKKAS_UTILS_PROD_URL
export const pb = new PocketBase(pb_url);


export async function getUser(cookie?:string) {
    // pb.authStore.loadFromCookie(document.cookie)
    pb.authStore.loadFromCookie(cookie??document.cookie)
    return pb.authStore.model
}

//  get awiated type of the retunr type of getUser
export type AppUser = Awaited<ReturnType<typeof getUser>>

export function logOutUser(pgc: PageContext) {
    pb.authStore.clear()
    pgc.locals.tan_queryClient.invalidateQueries({ queryKey: ['user'] })
     location.reload()
}

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        return await pb.collection('staff').authWithPassword(email, password);
    } catch (error) {
        throw error;
    }

}

export interface Oauthproviders {
    provider: "github" | "google"
}
export async function oauthSignIn(provider: Oauthproviders['provider']) {
    try {
        // This method initializes a one-off realtime subscription and will
        // open a popup window with the OAuth2 vendor page to authenticate.
        //
        // Once the external OAuth2 sign-in/sign-up flow is completed, the popup
        // window will be automatically closed and the OAuth2 data sent back
        // to the user through the previously established realtime connection.
        const authData = await pb.collection('users').authWithOAuth2({ provider });
        return authData
    } catch (error) {
        throw error
    }
}

export async function getOauthProviders(){
    try {
        const result  = await pb.collection('devs').listAuthMethods();
        return result
    } catch (error) {
        throw error
        
    }
}






