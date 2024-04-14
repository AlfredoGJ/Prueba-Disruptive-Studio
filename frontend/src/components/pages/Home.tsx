import React, { useContext } from "react";
import { UserBanner } from "../molecules/UserBanner/UserBanner";
import { UserType } from "../../types/types";
import Admin from "./Admin";
import { UserContext } from "../../context/UserContext";
import Viewer from "./Viewer";
import Creator from "./Creator";

interface HomeProps {
  title?: string;
  description?: string;
}




export const Home: React.FC<HomeProps> = ({ title, description }) => {
  const [user] = useContext(UserContext);
  return (
    <div className="flex flex-col">
      <UserBanner user={user!} />
      {user?.type === UserType.ADMIN && <Admin />}
      {user?.type === UserType.VIEWER && <Viewer />}
      {user?.type === UserType.CREATOR && <Creator />}
    </div>
  );
};

export default Home;
