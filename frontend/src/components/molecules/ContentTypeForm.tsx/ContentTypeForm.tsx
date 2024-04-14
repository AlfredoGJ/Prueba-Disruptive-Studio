import React, { useState } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { ContentType, ContentTypesEnum } from "../../../types/types";
import { Select } from "../Select/Select";

import { Option } from "../../../types/types";

interface ContentTypeFormProps {
  initialContentType?: ContentType;
}
export const ContentTypeForm = React.forwardRef<
  HTMLFormElement,
  ContentTypeFormProps
>(({ initialContentType }, ref) => {
  const [contentType, setContentType] = useState<Option>(
    initialContentType
      ? { id: initialContentType.type, name: initialContentType.type }
      : { id: "", name: "" }
  );
  const [name, setName] = useState(initialContentType?.name || "");
  const [description, setDescription] = useState(
    initialContentType?.description || ""
  );

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleContentTypeChange(option: Option) {
    setContentType(option);
  }
  return (
    <form ref={ref}>
      <Field label="Name">
        <Textbox
          name="name"
          placeholder="Content type name"
          value={name}
          onChange={handleNameChange}
        />
      </Field>
      <Field label="Desctription">
        <Textbox
          name="description"
          placeholder="Add a description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Field>
      <Field label="Type of media">
        <Select
          name="contentType"
          options={Object.values(ContentTypesEnum).map((type) => ({
            id: type,
            name: type,
          }))}
          value={contentType}
          onChange={handleContentTypeChange}
        />
      </Field>
    </form>
  );
});
