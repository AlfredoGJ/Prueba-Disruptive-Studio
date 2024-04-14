import React from "react";
import { Post } from "../../types/types";
import BasePost from "./BasePost";
import { Buffer } from "buffer";

interface ImagePostProps {
  post: Post;
}

const ImagePost: React.FC<ImagePostProps> = ({ post }) => {
  const image = Buffer.from(post.imageContent.data).toString("base64");
  return (
    <BasePost post={post}>
      <img
        src={`data:${post.imageContent.contentType};base64,${image}`}
        alt={post.title}
      />
    </BasePost>
  );
};

export default ImagePost;
