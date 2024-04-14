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
      <div className="grid-flow-row">
        {topics.map((topic) => (
          <div
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
