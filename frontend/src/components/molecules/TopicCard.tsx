import React from "react";
import { Surface } from "../atoms/Surface/Surface";
import { Topic } from "../../types/types";
import { Buffer } from "buffer";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
interface TopicCardProps {
  topicData: Topic;
  className?: string;
  admin?: boolean;
  onDeleteClick?: (topic: Topic) => void;
  onEditClick?: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topicData,
  className,
  admin,
  onEditClick,
  onDeleteClick,
}) => {
  let image;
  if (typeof topicData.cover.data === "string") {
    image = topicData.cover.data;
  } else image = Buffer.from(topicData.cover.data).toString("base64");

  return (
    <Surface className={`${className} flex flex-col p-0`}>
      <div className="pb-2 flex justify-between items-center">
        <h2 className="text-2xl font-medium">{topicData.name}</h2>
        {admin && (
          <div className="basis-1/12 flex items-end">
            <TrashIcon
              className="w-6 h-6 text-purple-500 hover:text-red-500 hover:font-bold hover:scale-110"
              onClick={() => onDeleteClick && onDeleteClick(topicData)}
            />

            <PencilSquareIcon
              className="w-6 h-6 text-purple-500 hover:text-blue-500 hover:scale-110 "
              onClick={() => onEditClick && onEditClick(topicData)}
            />
          </div>
        )}
      </div>
      <img
        className="rounded-md"
        src={`data:${topicData.cover.contentType};base64,${image}`}
        alt={topicData.name}
      />
      <div className=" p-2 flex flex-row justify-between items-center">
        <div>Posts</div>
        <div className="text-purple-400 font-medium">
          {topicData.allowedContent.map((content) => content).join(", ") ||
            "No content"}
        </div>
      </div>
      <p>{}</p>
    </Surface>
  );
};

export default TopicCard;
