import React from "react";

interface MediaTypeProps {
  title: string;
  subtitle: string;
  Icon?: React.ReactNode;
}

const MediaType: React.FC<MediaTypeProps> = ({ title, subtitle, Icon }) => {
  return (
    <div className="flex p-2 border-2 border-purple-100 bg-purple-50 rounded-md">
      <div className="flex items-center p-3 text-purple-400">{Icon}</div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl">{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default MediaType;
