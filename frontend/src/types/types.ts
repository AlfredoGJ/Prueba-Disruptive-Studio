export enum ContentTypesEnum {
  VIDEO = "Video",
  TEXT = "Text",
  IMAGE = "Image",
}

interface ContentType {
  _id: string;
  type: ContentTypesEnum;
  name: string;
  description: string;
  count?: number;
  topics?: string[];
}
export enum UserType {
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
  CREATOR = "CREATOR",
}

export interface Topic {
  _id:string;
  name: string;
  cover: { contentType: string; data: any };
  allowedContent: string[];
}

export interface Post {
  type: ContentTypesEnum;
  topic: string;
  title: string;
  author: string;
  textContent: string;
  imageContent: { data: Buffer; contentType: String };
}

type TabData = {
  title: string;
  tabUI: React.ReactNode;
  panelUI: React.ReactNode;
};

export interface User {
  name: string;
  email: string;
  type: UserType;
}

type Option = {
  id: number | string;
  name: string;
};

export type { ContentType, Option, TabData };
