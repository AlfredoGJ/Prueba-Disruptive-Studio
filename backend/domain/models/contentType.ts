export enum validContentTypes {
  VIDEO = "Video",
  IMAGE = "Image",
  TEXT = "Text",
}

export interface ContentType {
  type: validContentTypes;
  name: string;
  description: string;
}
