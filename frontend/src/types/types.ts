interface ContentType {
  name: string;
  description: string;
  count?: number;
}
export enum UserType {
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
  CREATOR = "CREATOR",
}

export interface Topic {
  name: string;
  cover: {contentType: string; data: any};
  allowedContent: string[];
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
