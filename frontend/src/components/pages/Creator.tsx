import React from "react";
import Feed from "../organisms/Feed";
import FeedPage from "./Feedpage";

interface CreatorProps {
  name?: string;
  age?: number;
  email?: string;
}

const Creator: React.FC<CreatorProps> = ({ name, age, email }) => {
  return <FeedPage />;
};

export default Creator;
