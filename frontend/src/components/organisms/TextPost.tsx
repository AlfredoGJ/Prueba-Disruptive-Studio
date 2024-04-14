import React from "react";
import { Post } from "../../types/types";
import BasePost from "./BasePost";

interface ImagePostProps {
  post: Post;
}

const TextPost: React.FC<ImagePostProps> = ({ post }) => {
  return (
    <BasePost post={post}>
      <div>{post.textContent}</div>
    </BasePost>
  );
};

export default TextPost;
