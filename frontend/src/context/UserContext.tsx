import React, { createContext, useState } from "react";
import { User } from "../types/types";

// Create a new context for the user
export const UserContext = createContext<
  [User | null, (newUSer: User) => void]
>([null, () => {}]);

// Create a UserProvider component to wrap your app
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={[user, updateUser]}>
      {children}
    </UserContext.Provider>
  );
};
