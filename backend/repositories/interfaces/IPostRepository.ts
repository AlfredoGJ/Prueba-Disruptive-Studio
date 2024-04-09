import { Post } from "../../domain/models";

export interface IPostRepository {
  //   getTopicByName(name: string): Promise<Topic>;
  //   getTopicById(id: string): Promise<Topic>;
  createPost(post: Post): Promise<Post>;
  //   getAllTopics(): Promise<Topic[]>;
  //   existTopic(name: string): Promise<Boolean>;
  //   getTopicsThatAcceptsContent(contentType: string): Promise<Topic[]>;
}
