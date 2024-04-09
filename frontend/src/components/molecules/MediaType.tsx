import React from "react";
import { Surface } from "../atoms/Surface/Surface";

interface MediaTypeProps {
  title: string;
  description: string;
  Icon?: React.ReactNode;
  count?: number;
}

const MediaType: React.FC<MediaTypeProps> = ({ title, description, Icon }) => {
  return (
    <Surface>
      <div className="flex items-center p-3 text-purple-400">{Icon}</div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl">{title}</h3>
        <p>{description}</p>
      </div>
    </Surface>
  );
};

export default MediaType;
