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
    replies:number;
    reaction_id: string;
}
