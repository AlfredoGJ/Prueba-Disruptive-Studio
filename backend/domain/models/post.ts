import { ContentType } from "./contentType";
import { Topic } from "./topic";

export interface Post {
  type: ContentType;
  topic: Topic;
  title: string;
  author: string;
  content: any;
}
