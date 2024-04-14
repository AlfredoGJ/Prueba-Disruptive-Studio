import React from "react";
import Feed from "../organisms/Feed";

interface CreatorProps {
  name?: string;
  age?: number;
  email?: string;
}

const Creator: React.FC<CreatorProps> = ({ name, age, email }) => {
  return <Feed />;
};

export default Creator;
