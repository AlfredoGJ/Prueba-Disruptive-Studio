import React from "react";
import { Post } from "../../types/types";
import BasePost from "./BasePost";

interface VideoPostProps {
  post: Post;
  onDeleteClick: (post: Post) => void;
  onEditClick: (post: Post) => void;
}
const VideoPost: React.FC<VideoPostProps> = ({
  post,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <>
      <BasePost
        post={post}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      >
        <iframe
          width="100%"
          height="315"
          src={post.textContent}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </BasePost>
    </>
  );
};

export default VideoPost;
