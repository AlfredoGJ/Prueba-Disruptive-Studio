import React from "react";
import { inherits } from "util";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  // Define your props here
}

export const Surface: React.FC<SurfaceProps> = ({ children, className }) => {
  // Component logic goes here

  return (
    // JSX markup goes here
    <div
      className={`${className} flex p-2 border-2 border-purple-100 bg-purple-50 rounded-md`}
    >
      {children}
    </div>
  );
};
