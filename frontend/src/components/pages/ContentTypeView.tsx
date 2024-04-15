import React, { useEffect } from "react";
import { useAPI } from "../../hooks/useAPI";
import TopicCard from "../molecules/TopicCard";
import { ContentType, Topic } from "../../types/types";
import MediaType from "../molecules/MediaType";

interface Props {
  onContentTypeSelect: (contentType: string) => void;
}

const ContentTypeView: React.FC<Props> = ({ onContentTypeSelect }) => {
  const [contentTypes, setContentTypes] = React.useState<ContentType[]>([]);
  const [call, , response, error] = useAPI({
    endpoint: "getPosts",
    useAuth: true,
  });

  React.useEffect(() => {
    call("", "", { groupBy: "type" });
  }, []);

  useEffect(() => {
    if (response) {
      setContentTypes(response.data);
    }
  }, [response]);
  return (
    <div className="p-2">
      <h1 className="text-2xl pb-3">Content</h1>
      <div className="grid gap-2 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contentTypes.map((content) => (
          <div
            key={content._id}
            className="cursor-pointer"
            onClick={() => onContentTypeSelect(content.type)}
          >
            <MediaType contentType={content} type="complex" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeView;
