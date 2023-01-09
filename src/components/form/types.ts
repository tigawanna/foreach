export interface RequiredProfileFormFields {
    avatar: string;
    displayname: string;
    accessToken: string;
}

export interface RequiredNewPostFormFields {
     body?: string;
    media?: File;
    user: string;
}

export interface Mutationprops {
    collection: string;
    payload: FormData;
}
