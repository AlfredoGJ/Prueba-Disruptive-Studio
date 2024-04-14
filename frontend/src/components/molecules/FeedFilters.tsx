import React from "react";
import { Button, Textbox } from "../atoms";

interface FeedFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch: (topic: string, type: string, search: string) => void;
  initialTopic?: string;
  initialContentType?: string;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({
  onSearch,
  className,
  initialTopic,
  initialContentType,
}) => {
  // Component logic goes here

  const [topic, setTopic] = React.useState<string>(initialTopic || "");
  const [type, setType] = React.useState<string>(initialContentType || "");
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className={`${className} flex-col flex w-full space-y-2 py-2`}>
      <Textbox
        value={topic}
        className="w-full"
        placeholder="Topic"
        onChange={(evt) => {
          setTopic(evt.target.value);
        }}
      />
      <Textbox
        value={type}
        className="w-full"
        placeholder="Type"
        onChange={(evt) => {
          setType(evt.target.value);
        }}
      />
      <Textbox
        className="w-full"
        placeholder="Search"
        onChange={(evt) => {
          setSearch(evt.target.value);
        }}
      />
      <Button onClick={() => onSearch(topic, type, search)}>Search</Button>
    </div>
  );
};

export default FeedFilters;
