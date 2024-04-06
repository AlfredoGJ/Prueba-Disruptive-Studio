import React from "react";
import { inherits } from "util";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  // Define your props here
}

const Surface: React.FC<SurfaceProps> = ({ children }) => {
  // Component logic goes here

  return (
    // JSX markup goes here
    <div>{children}</div>
  );
};

export default Surface;
