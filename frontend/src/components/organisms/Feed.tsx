import React, { useEffect } from "react";
import FeedFilters from "../molecules/FeedFilters";
import { ContentTypesEnum, Post } from "../../types/types";
import { useAPI } from "../../hooks/useAPI";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";

interface FeedProps {
  initialTopic?: string;
  initialContentType?: string;
}

const Feed: React.FC<FeedProps> = ({ initialContentType, initialTopic }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);
  const [topic, setTopic] = React.useState<string>(initialTopic || "");
  const [type, setType] = React.useState<string>(initialContentType || "");
  const [search, setSearch] = React.useState<string>("");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [call, , response, error] = useAPI({
    endpoint: "queryPosts",
    useAuth: true,
  });

  const firstMountRef = React.useRef(true);

  useEffect(() => {
    call("", "", {
      pageNumber: pageNumber,
      itemsPerPage: itemsPerPage,
      topic: topic,
      type: type,
      search: search,
    });
  }, []);

  useEffect(() => {
    if (response) {
      setPosts([...posts, ...response.data]);
    }
  }, [response]);

  // useEffect(() => {
  //   if (!firstMountRef.current) {
  //     setPosts([]);
  //     call("", "", {
  //       pageNumber: pageNumber,
  //       itemsPerPage: itemsPerPage,
  //       topic: topic,
  //       type: type,
  //       search: search,
  //     });
  //   } else {
  //     firstMountRef.current = false;
  //   }
  // }, [topic, type, search]);

  function handleSearch(topic: string, type: string, search: string) {
    setPosts([]);
    setSearch(search);
    setType(type);
    setTopic(topic);

    call("", "", {
      pageNumber: pageNumber,
      itemsPerPage: itemsPerPage,
      topic: topic,
      type: type,
      search: search,
    });
  }

  return (
    // JSX for the component goes here
    <div className="p-2">
      <FeedFilters
        onSearch={handleSearch}
        initialContentType={initialContentType}
        initialTopic={initialTopic}
      />
      <div>
        {posts.map((post) => {
          return post.type === ContentTypesEnum.VIDEO ? (
            <VideoPost post={post} />
          ) : post.type === ContentTypesEnum.IMAGE ? (
            <ImagePost post={post} />
          ) : (
            <TextPost post={post} />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
