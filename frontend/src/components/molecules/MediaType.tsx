import React from "react";
import { Surface } from "../atoms/Surface/Surface";
import { ContentType, ContentTypesEnum } from "../../types/types";
import {
  VideoCameraIcon,
  PhotoIcon,
  DocumentTextIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../atoms";

interface MediaTypeProps {
  contentType: ContentType;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  type?: "simple" | "complex";
  className?: string;

}

const MediaType: React.FC<MediaTypeProps> = ({
  contentType,
  onDeleteClick,
  onEditClick,
  type = "simple",
  className,
}) => {
  const Icon =
    contentType.type === ContentTypesEnum.IMAGE
      ? PhotoIcon
      : contentType.type === ContentTypesEnum.VIDEO
      ? VideoCameraIcon
      : DocumentTextIcon;

  return (
    <Surface className={ `${className} flex`} >
      <div className="flex items-center text-purple-400 basis-1/12">
        <Icon className="h-10 w-10" />
      </div>
      <div className="flex flex-col justify-center basis-10/12">
        <h3 className="text-xl">{contentType.name}</h3>
        <p className="text-sm">{contentType.description}</p>
        {contentType.topics &&
          contentType.topics.map((topic) => <p>{topic}</p>)}
      </div>
      {type === "simple" && (
        <div className="basis-1/12 flex-col items-end">
          <TrashIcon
            className="w-6 h-6 text-purple-500 hover:text-red-500 hover:font-bold hover:scale-110"
            onClick={onDeleteClick}
          />

          <PencilSquareIcon
            className="w-6 h-6 text-purple-500 hover:text-blue-500 hover:scale-110 "
            onClick={onEditClick}
          />
        </div>
      )}
      {type === "complex" && <div>{`${contentType.count} Documents`}</div>}
    </Surface>
  );
};

export default MediaType;
