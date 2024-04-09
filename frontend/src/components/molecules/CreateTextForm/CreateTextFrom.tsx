import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { Textbox } from "../../atoms";
import { Select } from "../Select/Select";
import { useAPI } from "../../../hooks/useAPI";
import { ContentType, Option, UserType } from "../../../types/types";
import { Console } from "console";
import FileUpload from "../../atoms/FileUpload/FileUpload";

interface UsersFormProps extends React.HTMLProps<HTMLFormElement> {}

export const CreateTextForm = React.forwardRef<HTMLFormElement, UsersFormProps>(
  ({ onSubmit }, ref) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
      call("", "Text");
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

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
      setName(event.target.value);
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
      setEmail(event.target.value);
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
            placeholder="The email of the user"
            value={email}
            onChange={handleEmailChange}
          />
        </Field>
        <Field label="Content">
          <Textbox
            name="content"
            placeholder="The username of the user"
            value={name}
            onChange={handleNameChange}
          />
        </Field>
      </form>
    );
  }
);
