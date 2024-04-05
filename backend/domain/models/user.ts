type UserType = "ADMIN" | "VIEWER" | "CREATOR";

export interface User {
  name: string;
  email: string;
  type: UserType;
}

export type { UserType };
