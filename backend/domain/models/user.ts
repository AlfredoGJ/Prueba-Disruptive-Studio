enum UserType {
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
  CREATOR = "CREATOR",
}

export interface User {
  name: string;
  email: string;
  type: UserType;
}

export { UserType };
