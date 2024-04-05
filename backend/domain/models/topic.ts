import { ContentType } from "./contentType";

export interface Topic {
  name: string;
  cover: ImageBitmap;
  allowedContent: ContentType[];
}
