import React from "react";
import CreatePostComponent from "../molecules/CreatePostComponent";
import Feed from "../organisms/Feed";
import { CreateTextForm } from "../molecules/CreateTextForm/CreateTextFrom";
import { Modal } from "../molecules/Modal/Modal";
import TopicView from "./TopicView";
import ContentTypeView from "./ContentTypeView";
import Field from "../molecules/Field/Field";
import { Select } from "../molecules/Select/Select";
import { Option } from "../../types/types";
interface FeedPageProps {
  // Define your props here
}
type validViews = "topicView" | "contentTypeView" | "feedView";
const viewOptions = [
  { id: "topicView", name: "Topic" },
  { id: "contentTypeView", name: "Content Type" },
  { id: "feedView", name: "Feed" }
];
const FeedPage: React.FC<FeedPageProps> = (props) => {
  const [currentView, setCurrentView] = React.useState<Option>(viewOptions[0]);
  const [initialTopic, setInitialTopic] = React.useState<string>("");
  const [initialContentType, setInitialContentType] =
    React.useState<string>("");

  const handleContentTypeSelect = (contentType: string) => {
    setInitialContentType(contentType);
    setCurrentView({ id: "feedView", name: "Feed" });
  };

  const handleTopicSelect = (topic: string) => {
    setInitialTopic(topic);
    setCurrentView({ id: "feedView", name: "Feed" });
  }

  return (
    <>
      <Field label="View By">
        <Select
          value={currentView}
          name="viewBy"
          options={viewOptions}
          onChange={(value: Option) => setCurrentView(value)}
        />
      </Field>
      <div>
        {currentView.id === "topicView" && <TopicView onTopicSelect={handleTopicSelect} />}
        {currentView.id === "contentTypeView" && (
          <ContentTypeView onContentTypeSelect={handleContentTypeSelect} />
        )}
        {currentView.id === "feedView" && (
          <Feed
            initialContentType={initialContentType}
            initialTopic={initialTopic}
          />
        )}
        <CreatePostComponent />
      </div>
    </>
  );
};

export default FeedPage;
