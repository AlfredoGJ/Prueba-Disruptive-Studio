import React from "react";
import { Post } from "../../types/types";
import BasePost from "./BasePost";

interface VideoPostProps {
  post: Post;
}
const VideoPost: React.FC<VideoPostProps> = ({ post }) => {
  return (
    <BasePost post={post}>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/V4Z8EdiJxgk?si=GGKjoYW_PHl1S0sx"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </BasePost>
  );
};

export default VideoPost;
