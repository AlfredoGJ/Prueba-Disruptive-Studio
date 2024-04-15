import React from "react";
import { Post } from "../../types/types";
import BasePost from "./BasePost";

interface ImagePostProps {
  post: Post;
  onDeleteClick: (post: Post) => void;
  onEditClick: (post: Post) => void;
}

const TextPost: React.FC<ImagePostProps> = ({
  post,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <BasePost
      post={post}
      onDeleteClick={onDeleteClick}
      onEditClick={onEditClick}
    >
      <div>{post.textContent}</div>
    </BasePost>
  );
};

export default TextPost;
