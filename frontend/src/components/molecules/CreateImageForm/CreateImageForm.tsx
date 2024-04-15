import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { ContentType, Option, Post, UserType } from "../../../types/types";
import { Console } from "console";
import FileUpload from "../../atoms/FileUpload/FileUpload";

interface UsersFormProps extends React.HTMLProps<HTMLFormElement> {
  initialImage?: Post;
}

export const CreateImageForm = React.forwardRef<
  HTMLFormElement,
  UsersFormProps
>(({ onSubmit, initialImage }, ref) => {
  const [title, setTitle] = useState(initialImage?.title || "");
  const [availableTopics, setAvailableTopics] = useState<Option[]>([]);
  const [content, setContent] = useState<File | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Option>({
    id: initialImage?.topic || "",
    name: initialImage?.topic || "",
  });
  const [call, , response, error] = useAPI({
    endpoint: "getTopicsThatAcceptContent",
    useAuth: true,
  });

  useEffect(() => {
    call("", "Image");
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

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleTopicChange(newTopic: Option) {
    setCurrentTopic(newTopic);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    setContent(file);
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
          placeholder="The email of the user"
          value={title}
          onChange={handleTitleChange}
        />
      </Field>
      <Field label="Content">
        <FileUpload
          file={content}
          name="imageContent"
          onChange={handleImageUpload}
        />
      </Field>
    </form>
  );
});
