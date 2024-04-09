import React, { useState } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";

interface ContentTypeFormProps {
  onChange?: (name: string, description: string) => void;
  contentName?: string;
  contentDescription?: string;
}

export const ContentTypeForm: React.FC<ContentTypeFormProps> = ({
  onChange,
  contentName,
  contentDescription,
}) => {
  const [name, setName] = useState(contentName || "");
  const [description, setDescription] = useState(contentDescription || "");

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    if (onChange) onChange(event.target.value, description);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
    if (onChange) onChange(name, event.target.value);
  }
  return (
    <div>
      <Field label="Name">
        <Textbox
          placeholder="Content type name"
          value={name}
          onChange={handleNameChange}
        />
      </Field>
      <Field label="Desctription">
        <Textbox
          placeholder="Add a description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Field>
    </div>
  );
};
