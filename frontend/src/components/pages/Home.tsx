import React from "react";
import {UserBanner} from "../molecules/UserBanner/UserBanner";
import { UserType } from "../../types/types";
import Admin from "./Admin";

interface HomeProps {
  title?: string;
  description?: string;
}

export const Home: React.FC<HomeProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <UserBanner
        user={{
          name: "John Doe",
          email: "johndoe@outlook.com",
          type: UserType.ADMIN,
        }}
      />
      <Admin />
    </div>
  );
};

export default Home;
