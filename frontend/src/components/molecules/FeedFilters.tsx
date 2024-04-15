import React from "react";
import { Button, Textbox } from "../atoms";
import Field from "./Field/Field";

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
    <div className={`${className} flex flex-col w-full space-y-2 py-2`}>
      <div>Post search</div>
      <div className="grid grid-cols-1 w-full items-center space-x-2 sm:grid-cols-3 md:grid-cols-4">
        <div className=" basis-1/4">
          <Field label="Topic">
            <Textbox
              value={topic}
              className="w-full"
              placeholder="Write the topic to filter for"
              onChange={(evt) => {
                setTopic(evt.target.value);
              }}
            />
          </Field>
        </div>
        <div className=" basis-1/4">
          <Field label="Type">
            <Textbox
              value={type}
              className="w-full"
              placeholder="Type of post to filter for"
              onChange={(evt) => {
                setType(evt.target.value);
              }}
            />
          </Field>
        </div>
        <div className=" basis-1/4">
          <Field label="Search By Title">
            <Textbox
              className="w-full"
              placeholder="Type the title to search for"
              onChange={(evt) => {
                setSearch(evt.target.value);
              }}
            />
          </Field>
        </div>
        <div className=" basis-1/4">
          <Button
            className="w-full mt-6"
            onClick={() => onSearch(topic, type, search)}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedFilters;
