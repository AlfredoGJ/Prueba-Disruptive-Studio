import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { ContentType, Option } from "../../../types/types";
import { Console } from "console";
import FileUpload from "../../atoms/FileUpload/FileUpload";

interface TopicFormProps extends React.HTMLProps<HTMLFormElement> {
  topicName?: string;
  allowedContentTypes: ContentType[];
  topicDescription?: string;
}

export const TopicForm = React.forwardRef<HTMLFormElement, TopicFormProps>(
  ({ topicName, allowedContentTypes, onSubmit }, ref) => {
    const [name, setName] = useState(topicName || "");
    const [description, setDescription] = useState("");
    const [allowedTypes, setAllowedTypes] = useState<Option[]>([]);
    const [cover, setCover] = useState<File | null>(null);
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setName(event.target.value);
    }

    function handleDescriptionChange(
      event: React.ChangeEvent<HTMLInputElement>
    ) {
      setDescription(event.target.value);
    }

    function handleAllowedContentChange(contentTypes: Option[]) {
      setAllowedTypes(contentTypes);
    }

    function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files && event.target.files[0];
      setCover(file);
    }

    return (
      <form ref={ref} onSubmit={onSubmit}>
        <Field label="Name">
          <Textbox
            name="name"
            placeholder="Write the topic name"
            value={name}
            onChange={handleNameChange}
          />
        </Field>
        <Field label="Allowed Content Types">
          <Select
            multiple
            name="allowedContent"
            options={allowedContentTypes.map((content) => ({
              id: content.name,
              name: content.name,
            }))}
            value={allowedTypes}
            onChange={handleAllowedContentChange}
          />
        </Field>
        <Field label="description">
          <Textbox
            id="description"
            name="Description"
            placeholder="Write a short description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Field>
        <Field label="File upload">
          <FileUpload file={cover} name="cover" onChange={handleImageUpload} />
        </Field>
      </form>
    );
  }
);
