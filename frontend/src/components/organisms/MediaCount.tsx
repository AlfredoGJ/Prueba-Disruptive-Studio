import MediaType from "../molecules/MediaType";
import {
  VideoCameraIcon,
  DocumentTextIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { ContentType } from "../../types/types";

interface IMediaCountProps {
  mediaCount: ContentType[];
}

export const MediaCountList: React.FC<IMediaCountProps> = ({ mediaCount }) => {
  const iconClassName = "h-12 w-12";

  return (
    <div className="grid-cols-3 gap-6 p-2 ">
      {mediaCount.map((media) => (
        <MediaType
          contentType={media}
          type="complex"
        />
      ))}
    </div>
  );
};
