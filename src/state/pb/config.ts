import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import PocketBase from 'PocketBase'


export const pb_url = import.meta.env.RAKKAS_UTILS_PROD_URL


export const pb = new PocketBase(pb_url);



export async function getUser() {
    return pb.authStore.model 
}

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        return await pb.collection('staff').authWithPassword(email, password);
    } catch (error) {
        throw error;
    }

}


export async function oauthSignIn() {
    try {
        // This method initializes a one-off realtime subscription and will
        // open a popup window with the OAuth2 vendor page to authenticate.
        //
        // Once the external OAuth2 sign-in/sign-up flow is completed, the popup
        // window will be automatically closed and the OAuth2 data sent back
        // to the user through the previously established realtime connection.
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        return authData
    } catch (error) {
        throw error
    }
}

export async function getOauthProviders(){
    try {
        const result  = await pb.collection('users').listAuthMethods();
        return result
    } catch (error) {
        throw error
        
    }
}

export async function getAllRecords(table: "bills" | "tenants" | "shops") {
    try {
        const records = await pb.collection(table).getFullList({

        })
        return records
    } catch (error) {
        throw error
    }
}


export interface ITenant {
    collectionId: string
    collectionName: string
    contact: string
    created: string
    details: string
    email: string
    id: string
    name: string
    supa_id: string
    updated: string
    expand: {}
}

export async function getTenants(params: QueryFunctionContext<QueryKey,number>) {
    try {
        return pb.collection("tenants").getList<ITenant>(params.pageParam,5)
    } catch (error) {
        throw error
    }
}



