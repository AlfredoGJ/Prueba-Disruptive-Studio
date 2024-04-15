import React, { useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import TopicCard from "../molecules/TopicCard";
import { Topic } from "../../types/types";

interface Props {
  onTopicSelect: (topic: string) => void;
}

const TopicView: React.FC<Props> = ({ onTopicSelect }) => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [call, , response, error] = useAPI({
    endpoint: "getTopics",
    useAuth: true,
  });

  React.useEffect(() => {
    call("", "", { contentCount: "true" });
  }, []);

  useEffect(() => {
    if (response) {
      setTopics(response.data);
    }
  }, [response]);
  return (
    // JSX markup goes here
    <div className="p-2">
      <h1 className="text-2xl pb-3">Topics</h1>
      <div className="grid gap-2 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className="cursor-pointer"
            onClick={() => onTopicSelect(topic.name)}
          >
            <TopicCard key={topic.name} topicData={topic} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicView;
