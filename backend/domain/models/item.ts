import { ContentType } from "./contentType";
import { Topic } from "./topic";

export interface Item {
  type: ContentType;
  topic: Topic;
  value: any;
}
