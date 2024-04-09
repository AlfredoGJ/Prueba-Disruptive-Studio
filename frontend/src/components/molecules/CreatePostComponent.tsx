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

interface CreatePostProps {
  onPhotoClick?: () => void;
  onVideoClick?: () => void;
  onTextClick?: () => void;
}
const CreatePostComponent: React.FC<CreatePostProps> = ({
  onPhotoClick,
  onTextClick,
  onVideoClick,
}) => {
  const [createPostOpen, setCreatePostOpen] = React.useState("none");
  const [callCreatePost, , responseCreatePost, errorCreatePost] = useAPI({
    endpoint: "createPost",
    useAuth: true,
  });

  const formRef = React.useRef<HTMLFormElement>(null);


  useEffect(() => {
    if(responseCreatePost){
      console.log(responseCreatePost)
      setCreatePostOpen("None")
    
    }


  }, [responseCreatePost, errorCreatePost]);

  function handlePostCreate() {
    if (formRef.current) {
      switch (createPostOpen) {
        case "Text": {
          const formData = new FormData(formRef.current);
          const data = {
            topic: formData.get("topic[name]"),
            content: formData.get("content"),
            title: formData.get("title"),
            type: "Text",
            author:'Alfredo'
          };

          console.log(`Data: ${data}`)
          callCreatePost(data);
          break;
        }
      }
    }
  }

  return (
    <Surface className="absolute left-0 bottom-0 w-full p-0">
      <div className="flex justify-end space-x-2">
        <Button className="flex space-x-2" onClick={onPhotoClick}>
          <PhotoIcon className="h-6 w-6" />
          <span>Photo</span>
        </Button>
        <Button className="flex space-x-2" onClick={onVideoClick}>
          <VideoCameraIcon className="h-6 w-6" />
          <span>Video URL</span>
        </Button>
        <Button
          className="flex space-x-2"
          onClick={() => setCreatePostOpen("Text")}
        >
          <DocumentIcon className="h-6 w-6" />
          <span>Text</span>
        </Button>
        <Modal
          title="Create Text Post"
          open={createPostOpen === "Text"}
          mainActionText="Add Post"
          secondaryActionText="Cancel"
          handleMainAction={handlePostCreate}
          handleSecondaryAction={() => setCreatePostOpen("none")}
        >
          <CreateTextForm open={false} ref={formRef} />
        </Modal>
      </div>
    </Surface>
  );
};

export default CreatePostComponent;
