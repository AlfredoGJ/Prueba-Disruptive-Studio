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
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [temporalTopic, setTemporalTopic] = useState<Topic | null>(null);
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

  const [callUpdateTopic, , responseUpdateTopic, errorUpdateTopic] = useAPI({
    endpoint: "editTopic",
    useAuth: true,
  });

  const [callDelete, , responseDelete, errorDelete] = useAPI({
    endpoint: "deleteTopic",
    useAuth: true,
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
    if (responseCreateRopic || responseUpdateTopic || responseDelete) {
      callGetTopics("");
      setDialogOpen(false);
      setDeleteDialogOpen(false);
    }
  }, [responseCreateRopic, responseUpdateTopic, responseDelete]);

  function handleAddTopic() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formEntries = Object.fromEntries(formData.entries());
      console.log("From entries", formEntries);
      let keysToDelete: string[] = [];
      let keysToChange: string[] = [];
      formData.forEach((value, key) => {
        let regExpKey = /allowedContent\[[0-9]\]\[id\]/i;
        let regExpName = /allowedContent\[[0-9]\]\[name\]/i;
        if (regExpKey.test(key)) {
          console.log("Value", value);
          keysToDelete.push(key);
        }
        if (regExpName.test(key)) {
          keysToChange.push(key);
        }
      });

      keysToDelete.forEach((key) => {
        formData.delete(key);
      });

      keysToChange.forEach((key, index) => {
        let newKey = `allowedContent[${index}]`;
        formData.set(newKey, formData.get(key)!);
        formData.delete(key);
      });

      const formEntries2 = Object.fromEntries(formData.entries());
      console.log("From entries 2", formEntries2);

      if (temporalTopic) {
        callUpdateTopic(formData, temporalTopic._id);
        setTemporalTopic(null);
      } else callCreateTopic(formData);
    }
  }

  function handleTopicEditClick(topic: Topic) {
    setTemporalTopic(topic);
    setDialogOpen(true);
  }

  function handleTopicDeleteClick(topic: Topic) {
    setTemporalTopic(topic);
    setDeleteDialogOpen(true);
  }

  function handleContentTypeDelete() {
    callDelete("", temporalTopic?._id);
  }

  return (
    <div className="p-2">
      {topics.map((topic) => (
        <TopicCard
          topicData={topic}
          admin
          onEditClick={handleTopicEditClick}
          onDeleteClick={handleTopicDeleteClick}
        />
      ))}
      <div className=" flex justify-end pt-2">
        <Button onClick={() => setDialogOpen(true)}>Add content Type</Button>
      </div>
      <Modal
        title="Add ContentType"
        onClose={() => {}}
        open={dialogOpen}
        mainActionText="Save"
        secondaryActionText="Cancel"
        handleMainAction={handleAddTopic}
        handleSecondaryAction={() => setDialogOpen(false)}
      >
        <TopicForm
          ref={formRef}
          allowedContentTypes={contentTypes}
          topicData={temporalTopic!}
        />
        {/* {errorAddContent && (
          <p className="text-red-500 mt-2">{errorAddContent.message}</p>
        )} */}
      </Modal>
      <Modal
        open={deleteDialogOpen}
        title="Delete Topic"
        mainActionText="Confirm"
        secondaryActionText="Cancel"
        handleMainAction={handleContentTypeDelete}
        handleSecondaryAction={() => setDeleteDialogOpen(false)}
      >
        <p>Are you sure you want to delete this content type?</p>
      </Modal>
    </div>
  );
};
