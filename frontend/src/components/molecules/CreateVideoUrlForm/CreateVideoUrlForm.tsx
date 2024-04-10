import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { Option } from "../../../types/types";

interface UsersFormProps extends React.HTMLProps<HTMLFormElement> {}

export const CreateVideoForm = React.forwardRef<HTMLFormElement, UsersFormProps>(
  ({ onSubmit }, ref) => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [availableTopics, setAvailableTopics] = useState<Option[]>([]);
    const [currentTopic, setCurrentTopic] = useState<Option>({
      id: "",
      name: "",
    });
    const [call, , response, error] = useAPI({
      endpoint: "getTopicsThatAcceptContent",
      useAuth: true,
    });

    useEffect(() => {
      call("", "Video");
    }, []);

    useEffect(() => {
      if (response) {
        console.log(response);
        const availableTopics = response.data.map((topic: any) => ({
          id: topic.name,
          name: topic.name,
        }));

        setAvailableTopics(availableTopics);
      }
    }, [response, error]);

    function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
      setContent(event.target.value);
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setTitle(event.target.value);
    }

    function handleTopicChange(newTopic: Option) {
      console.log("USERTYPE:", newTopic);
      setCurrentTopic(newTopic);
    }

    return (
      <form ref={ref} onSubmit={onSubmit}>
        <Field label="Topic">
          <Select
            multiple={false}
            name="topic"
            options={availableTopics}
            value={currentTopic}
            onChange={handleTopicChange}
          />
        </Field>
        <Field label="Title">
          <Textbox
            name="title"
            placeholder="The title of your post"
            value={title}
            onChange={handleTitleChange}
          />
        </Field>
        <Field label="Content">
          <Textbox
            name="textContent"
            placeholder="The URL to your video"
            value={content}
            onChange={handleContentChange}
          />
        </Field>
      </form>
    );
  }
);
