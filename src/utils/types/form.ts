export interface RequiredProfileFormFields {
    avatar: string;
    displayname: string;
    accessToken: string;
    bio:string
}

export interface RequiredNewPostFormFields {
    body?: string;
    media?: File;
    user: string;
}

export interface Mutationprops {
    // user,body,media
    basepayload: FormData;
}

export interface RequiredReplyFields {
    user: string;
    post: string;
    body: string;
    depth: number;
    parent?: string;
}

