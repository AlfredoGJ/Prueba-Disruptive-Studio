import React from "react";
import { Surface } from "../atoms/Surface/Surface";
import { Topic } from "../../types/types";
import { Buffer } from "buffer";
interface TopicCardProps {
  topicData: Topic;
  className?: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ topicData, className }) => {
  let image;
  if (typeof topicData.cover.data === "string") {
    image = topicData.cover.data;
  } else image = Buffer.from(topicData.cover.data).toString("base64");

  return (
    <Surface className={`${className} flex flex-col p-0`}>
      <img
        src={`data:${topicData.cover.contentType};base64,${image}`}
        alt={topicData.name}
      />
      <div className=" p-2 flex flex-row justify-between items-center">
        <h2 className="text-2xl font-medium">{topicData.name}</h2>
        <div>
          {topicData.allowedContent.map((content) => content).join(", ") ||
            "No content"}
        </div>
      </div>
      <p>{}</p>
    </Surface>
  );
};

export default TopicCard;
