export interface RequiredProfileFormFields {
    avatar: string;
    displayname: string;
    accessToken: string;
}

export interface RequiredNewPostFormFields {
    title?: string;
    body?: string;
    media?: File;
    user: string;
}

export interface Mutationprops {
    collection: string;
    payload: FormData;
}
