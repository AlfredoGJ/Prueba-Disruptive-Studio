import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { ContentType, Option, Post, UserType } from "../../../types/types";
import { Console } from "console";

interface UsersFormProps extends React.HTMLProps<HTMLFormElement> {
  initialText?: Post;
}

export const CreateTextForm = React.forwardRef<HTMLFormElement, UsersFormProps>(
  ({ onSubmit, initialText }, ref) => {
    const [content, setContent] = useState(initialText?.textContent || "");
    const [title, setTitle] = useState(initialText?.title || "");
    const [availableTopics, setAvailableTopics] = useState<Option[]>([]);
    const [currentTopic, setCurrentTopic] = useState<Option>({
      id: initialText?.topic || "",
      name: initialText?.topic || "",
    });
    const [call, , response, error] = useAPI({
      endpoint: "getTopicsThatAcceptContent",
      useAuth: true,
    });

    useEffect(() => {
      call("", "Text");
    }, []);

    useEffect(() => {
      if (response) {
        const availableTopics = response.data.map((topic: any) => ({
          id: topic.name,
          name: topic.name,
        }));

        setAvailableTopics(availableTopics);
      }
    }, [response, error]);

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setContent(event.target.value);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
      setTitle(event.target.value);
    }

    function handleTopicChange(newTopic: Option) {
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
            onChange={handleEmailChange}
          />
        </Field>
        <Field label="Content">
          <Textbox
            name="content"
            placeholder="The content of your post"
            value={content}
            onChange={handleNameChange}
          />
        </Field>
      </form>
    );
  }
);
