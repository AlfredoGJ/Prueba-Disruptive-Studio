import React, { useEffect, useState } from "react";
import { Topic } from "../../types/types";
import TopicCard from "../molecules/TopicCard";
import { Modal } from "../molecules/Modal/Modal";
import { Button } from "../atoms";
import { TopicForm } from "../molecules/TopicsForm/TopicsForm";
import { useAPI } from "../../hooks/useAPI";
import { ContentType } from "../../types/types";

interface Props {
  // Define your props here
}

export const TopicsAdmin: React.FC<Props> = (props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [call, loading, response, error] = useAPI({
    endpoint: "getContentTypes",
  });
  const [callCreateTopic, , responseCreateRopic, errorCreateTopic] = useAPI({
    endpoint: "createTopic",
    useAuth: true,
  });
  const [callGetTopics, , responseGetTopics, errorGetTopics] = useAPI({
    endpoint: "getTopics",
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    call("");
    console.log("Calling API");
  }, []);

  useEffect(() => {
    callGetTopics("");
    console.log("Calling API");
  }, []);

  useEffect(() => {
    console.log(response);
    if (response) {
      setContentTypes(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log(responseGetTopics);
    if (responseGetTopics) {
      setTopics(responseGetTopics.data);
    }
  }, [responseGetTopics]);

  useEffect(() => {
    if (responseCreateRopic) {
      callGetTopics("");
      setDialogOpen(false);
    }
  }, [responseCreateRopic]);

  function handleAddTopic() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      callCreateTopic(formData);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.stopPropagation();
    event.preventDefault();
    console.log("handleSubmit");
    console.log("Submit event triggered");
    console.log(event);
  }

  return (
    <div className="p-2">
      {topics.map((topic) => (
        <TopicCard topicData={topic} />
      ))}
      <div className=" flex justify-end pt-2">
        <Button onClick={() => setDialogOpen(true)}>Add content Type</Button>
      </div>
      <Modal
        title="Add ContentType"
        onClose={() => {}}
        open={dialogOpen}
        mainActionText="Add"
        secondaryActionText="Cancel"
        handleMainAction={handleAddTopic}
        handleSecondaryAction={() => setDialogOpen(false)}
      >
        <TopicForm
          onSubmit={handleSubmit}
          ref={formRef}
          allowedContentTypes={contentTypes}
        />
        {/* {errorAddContent && (
          <p className="text-red-500 mt-2">{errorAddContent.message}</p>
        )} */}
      </Modal>
    </div>
  );
};
