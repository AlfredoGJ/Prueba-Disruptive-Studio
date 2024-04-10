import React, { useEffect } from "react";
import { Surface } from "../atoms/Surface/Surface";
import { Button } from "../atoms";
import {
  VideoCameraIcon,
  PhotoIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { CreateTextForm } from "./CreateTextForm/CreateTextFrom";
import { Modal } from "./Modal/Modal";
import { useAPI } from "../../hooks/useAPI";
import { CreateImageForm } from "./CreateImageForm/CreateImageForm";
import { CreateVideoForm } from "./CreateVideoUrlForm/CreateVideoUrlForm";

interface CreatePostProps {
  onPhotoClick?: () => void;
  onVideoClick?: () => void;
  onTextClick?: () => void;
}

enum PostType {
  Text = "Text",
  Image = "Image",
  Video = "Video",
  None = "None",
}
const CreatePostComponent: React.FC<CreatePostProps> = ({
  onPhotoClick,
  onTextClick,
  onVideoClick,
}) => {
  const [createPost, setCreatePost] = React.useState(PostType.None);
  const [callCreatePost, , responseCreatePost, errorCreatePost] = useAPI({
    endpoint: "createPost",
    useAuth: true,
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (responseCreatePost) {
      console.log(responseCreatePost);
      setCreatePost(PostType.None);
    }
  }, [responseCreatePost, errorCreatePost]);

  function handlePostCreate() {
    if (formRef.current) {
      switch (createPost) {
        case "Text": {
          const formData = new FormData(formRef.current);
          const data = {
            topic: formData.get("topic[name]"),
            textContent: formData.get("content"),
            title: formData.get("title"),
            type: "Text",
            author: "Alfredo",
          };

          console.log(`Data: ${data}`);
          callCreatePost(data);
          break;
        }
        case "Image": {
          const formData = new FormData(formRef.current);
          let topic = formData.get("topic[name]");
          formData.append("type", "Image");
          formData.append("author", "Alfredo");
          formData.delete("topic[name]");
          formData.delete("topic[id]");
          formData.append("topic", topic as string);

          callCreatePost(formData);
          break;
        }
        case "Video": {
          const formData = new FormData(formRef.current);
          const data = {
            topic: formData.get("topic[name]"),
            textContent: formData.get("textContent"),
            title: formData.get("title"),
            type: "Video",
            author: "Alfredo",
          };

          callCreatePost(data);
          break;
        }
      }
    }
  }

  const title =
    createPost === PostType.Text
      ? "Create Text Post"
      : createPost === PostType.Image
      ? "Create Image Post"
      : "Create Video Post";

  return (
    <Surface className="absolute left-0 bottom-0 w-full p-0">
      <div className="flex justify-end space-x-2">
        <Button
          className="flex space-x-2"
          onClick={() => setCreatePost(PostType.Image)}
        >
          <PhotoIcon className="h-6 w-6" />
          <span>Photo</span>
        </Button>
        <Button
          className="flex space-x-2"
          onClick={() => setCreatePost(PostType.Video)}
        >
          <VideoCameraIcon className="h-6 w-6" />
          <span>Video URL</span>
        </Button>
        <Button
          className="flex space-x-2"
          onClick={() => setCreatePost(PostType.Text)}
        >
          <DocumentIcon className="h-6 w-6" />
          <span>Text</span>
        </Button>
        <Modal
          title={title}
          open={createPost !== PostType.None}
          mainActionText="Add Post"
          secondaryActionText="Cancel"
          handleMainAction={handlePostCreate}
          handleSecondaryAction={() => setCreatePost(PostType.None)}
        >
          {createPost === PostType.Text && <CreateTextForm ref={formRef} />}
          {createPost === PostType.Image && <CreateImageForm ref={formRef} />}
          {createPost === PostType.Video && <CreateVideoForm ref={formRef} />}
        </Modal>
      </div>
    </Surface>
  );
};

export default CreatePostComponent;
