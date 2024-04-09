import React from "react";
import CreatePostComponent from "../molecules/CreatePostComponent";
import Feed from "../organisms/Feed";
import { CreateTextForm } from "../molecules/CreateTextForm/CreateTextFrom";
import { Modal } from "../molecules/Modal/Modal";
interface FeedPageProps {
  // Define your props here
}
const FeedPage: React.FC<FeedPageProps> = (props) => {
  // Component logic goes here
//   const [createPostOpen, setCreatePostOpen] = React.useState("none");

 

  return (
    // JSX markup goes here
    <div>
      <Feed />
      <CreatePostComponent />
      {/* <Modal
        title="Create Text Post"
        open={createPostOpen === "Text"}
        mainActionText="Add Post"
        secondaryActionText="Cancel"
        handleMainAction={handlePostCreate}
      >
        <CreateTextForm open={false} />
      </Modal> */}
    </div>
  );
};

export default FeedPage;
