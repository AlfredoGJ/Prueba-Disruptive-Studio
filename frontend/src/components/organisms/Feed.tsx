import React, { useEffect } from "react";
import FeedFilters from "../molecules/FeedFilters";
import { ContentTypesEnum, Post } from "../../types/types";
import { useAPI } from "../../hooks/useAPI";
import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";
import TextPost from "./TextPost";
import { Modal } from "../molecules/Modal/Modal";
import { CreateImageForm } from "../molecules/CreateImageForm/CreateImageForm";
import { CreateTextForm } from "../molecules/CreateTextForm/CreateTextFrom";
import { CreateVideoForm } from "../molecules/CreateVideoUrlForm/CreateVideoUrlForm";

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
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [call, , response, error] = useAPI({
    endpoint: "queryPosts",
    useAuth: true,
  });

  const [callUpdatePost, , responseUpdatePost, errorUpdatePost] = useAPI({
    endpoint: "updatePost",
    useAuth: true,
  });

  const [callDeletePost, , responseDeletePost, errorDeletePost] = useAPI({
    endpoint: "deletePost",
    useAuth: true,
  });

  const formRef = React.useRef<HTMLFormElement>(null);

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
    if (responseUpdatePost || responseDeletePost) {
      setPosts([]);
      call("", "", {
        pageNumber: pageNumber,
        itemsPerPage: itemsPerPage,
        topic: topic,
        type: type,
        search: search,
      });
      setEditModalOpen(false);
      setDeleteDialogOpen(false);
    }
  }, [responseUpdatePost, responseDeletePost]);

  useEffect(() => {
    if (response) {
      setPosts([...posts, ...response.data]);
    }
  }, [response]);

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

  function handlePostEditClick(post: Post) {
    setSelectedPost(post);
    setEditModalOpen(true);
  }

  function handlePostDeleteClick(post: Post) {
    setSelectedPost(post);
    setDeleteDialogOpen(true);
  }

  function handlePostEdit() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      let data = {};
      if (selectedPost?.type === ContentTypesEnum.VIDEO) {
        data = {
          topic: formData.get("topic[name]"),
          textContent: formData.get("textContent"),
          title: formData.get("title"),
        };
      }

      if (selectedPost?.type === ContentTypesEnum.IMAGE) {
        data = {
          topic: formData.get("topic[name]"),
          imageContent: formData.get("imageContent"),
          title: formData.get("title"),
        };
      }
      if (selectedPost?.type === ContentTypesEnum.TEXT) {
        data = {
          topic: formData.get("topic[name]"),
          textContent: formData.get("content"),
          title: formData.get("title"),
        };
      }

      callUpdatePost(data, selectedPost?._id);
    }
  }

  function handleDeleteModalSecondaryAction() {
    setDeleteDialogOpen(false);
    setSelectedPost(null);
  }
  function handlePostDelete() {
    callDeletePost("", selectedPost?._id);
    setSelectedPost(null);
  }

  return (
    <>
      <div className="p-2">
        <FeedFilters
          onSearch={handleSearch}
          initialContentType={initialContentType}
          initialTopic={initialTopic}
        />
        <div>
          {posts.map((post) => {
            return post.type === ContentTypesEnum.VIDEO ? (
              <VideoPost
                post={post}
                onDeleteClick={handlePostDeleteClick}
                onEditClick={handlePostEditClick}
              />
            ) : post.type === ContentTypesEnum.IMAGE ? (
              <ImagePost
                post={post}
                onDeleteClick={handlePostDeleteClick}
                onEditClick={handlePostEditClick}
              />
            ) : (
              <TextPost
                post={post}
                onDeleteClick={handlePostDeleteClick}
                onEditClick={handlePostEditClick}
              />
            );
          })}
        </div>
      </div>
      <Modal
        title="Edit Video Post"
        mainActionText="Save"
        secondaryActionText="Cancel"
        handleMainAction={handlePostEdit}
        handleSecondaryAction={() => setEditModalOpen(false)}
        open={editModalOpen}
      >
        {selectedPost && selectedPost.type === ContentTypesEnum.VIDEO ? (
          <CreateVideoForm ref={formRef} initialVideo={selectedPost} />
        ) : selectedPost && selectedPost.type === ContentTypesEnum.IMAGE ? (
          <CreateImageForm ref={formRef} initialImage={selectedPost} />
        ) : selectedPost && selectedPost.type === ContentTypesEnum.TEXT ? (
          <CreateTextForm ref={formRef} initialText={selectedPost} />
        ) : (
          ""
        )}
      </Modal>
      <Modal
        open={deleteDialogOpen}
        title="Delete Post"
        mainActionText="Confirm"
        secondaryActionText="Cancel"
        handleMainAction={handlePostDelete}
        handleSecondaryAction={handleDeleteModalSecondaryAction}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </>
  );
};

export default Feed;
