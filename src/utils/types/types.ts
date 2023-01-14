import { Record, Admin } from "pocketbase";


export type PBUser = Record | Admin | null | undefined;

export interface CustomPostType {
    creator_id: string;
    creator_name: string;
    creator_image: string;
    post_id: string;
    post_body: string;
    post_media: string;
    created_at: string;
    likes: number;
    mylike: "yes" | "no" | "virgin";
    myreply: string | "virgin";
    replies: number;
    reaction_id: string;
}

export interface ReactionMutationResponse {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    liked: "yes" | "no";
    post: string;
    updated: string;
    user: string;
    expand: {};
}

export interface CustomRepliesType {
    creator_id:    string;
    creator_name:  string;
    creator_image: string;
    reply_id:    string;
    reply_body:    string;
    reply_media:   string;
    replied_at:    Date;
    reply_depth:   string;
    replying_to:   string;
    likes:         number;
    mylike:        string;
    reaction_id:   string;
    replies:       number;
    myreply:       string;
}



export interface RepliesType {
    body: string;
    collectionId: string;
    collectionName: string;
    created: string;
    depth: number;
    expand: Expand;
    id: string;
    media: string;
    parent: string;
    post: string;
    updated: string;
    user: string;
}

export interface Expand {
    post: Post;
    user: User;
    parent?:RepliesType
}

export interface Post {
    body: string;
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    media: string;
    title: string;
    updated: string;
    user: string;
    expand: {};
}

export interface User {
    accessToken: string;
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    displayname: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    updated: string;
    username: string;
    verified: boolean;
    expand: {};
}

