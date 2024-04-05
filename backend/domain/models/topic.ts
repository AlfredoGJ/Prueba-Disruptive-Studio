import { ContentType } from "./contentType";

export interface Topic {
  name: string;
  cover: { data: Buffer; contentType: String };
  allowedContent: ContentType[];
}
