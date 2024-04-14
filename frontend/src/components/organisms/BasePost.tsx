import React from "react";
import { Surface } from "../atoms/Surface/Surface";
import { Post } from "../../types/types";

interface ImagePostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

const BasePost: React.FC<ImagePostProps> = ({ post, children }) => {
  return (
    <Surface>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">{post.title}</h2>
        <h2 className="text">
          <span>topic: </span>
          <span className="text-purple-600">{post.topic}</span>
        </h2>
      </div>

      <div className="py-4 px-2">{children}</div>
      <div className="flex p-2 justify-end">
        <span>credits to: </span>
        <span className="text-purple-300">{post.author}</span>
      </div>
    </Surface>
  );
};

export default BasePost;
