import { pb } from "../pb/config";

export interface IPost {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    body: string
    media: string
    user: string
    parent: string
    depth: number
}
export async function getPosts(){
try {
    // fetch a paginated records list
    const resultList = await pb.collection('posts').getList<IPost>(1, 50, {});
    return resultList

} catch (error) {
    throw error
}
}
