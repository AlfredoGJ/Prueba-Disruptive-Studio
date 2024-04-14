import { Post } from "../../domain/models";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  getAllPostsByType(): Promise<Post>;
  queryPosts(
    title: string,
    topic: string,
    type: string,
    pageNumber: number,
    itemsPerPage: number
  ): Promise<Post[]>;
  getAllPosts(): Promise<Post[]>;
  deletePost(id: string): Promise<Boolean>;
  updatePost(id: string, post: Post): Promise<any>;
  existPostById(id: string): Promise<Boolean>;
}
