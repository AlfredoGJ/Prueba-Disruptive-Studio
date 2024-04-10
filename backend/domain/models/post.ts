import { ContentType } from "./contentType";
import { Topic } from "./topic";

export interface Post {
  type: ContentType;
  topic: Topic;
  title: string;
  author: string;
  textContent: String;
  imageContent: { data: Buffer; contentType: String };
}
