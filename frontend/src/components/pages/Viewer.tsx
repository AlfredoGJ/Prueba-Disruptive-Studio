import React from "react";
import Feed from "../organisms/Feed";

interface ViewerProps {
  // Define your props here
}

const Viewer: React.FC<ViewerProps> = (props) => {
  return <Feed />;
};

export default Viewer;
