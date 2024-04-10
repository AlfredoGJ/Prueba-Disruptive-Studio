import { Post } from "../../domain/models";

export interface IPostRepository {
  //   getTopicByName(name: string): Promise<Topic>;
  //   getTopicById(id: string): Promise<Topic>;
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
  //   getAllTopics(): Promise<Topic[]>;
  //   existTopic(name: string): Promise<Boolean>;
  //   getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]>;
}
