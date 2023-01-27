export interface RequiredProfileFormFields {
    accesstoken: string;
    avatar: string;
    displayname: string;
    bio:string
    username:string
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

