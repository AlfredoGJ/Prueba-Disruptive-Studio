import React, { useEffect } from "react";
import { MediaCountList } from "./MediaCount";
import { ContentType } from "../../types/types";
import { Button } from "../atoms";
import { Modal } from "../molecules/Modal/Modal";
import { ContentTypeForm } from "../molecules/ContentTypeForm.tsx/ContentTypeForm";
import { useAPI } from "../../hooks/useAPI";

interface ContentAdminProps {
  //   allowedContent: ContentType[];
}

export const ContentAdmin: React.FC<ContentAdminProps> = ({}) => {
  const [allowedContent, setAllowedContent] = React.useState<ContentType[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newContentType, setNewContentType] = React.useState<ContentType>();

  const [call, loading, response, error] = useAPI({
    endpoint: "getContentTypes",
  });
  const [
    callAddContent,
    loadingAddContent,
    responseAddContent,
    errorAddContent,
  ] = useAPI({ endpoint: "createContentType", useAuth: true });

  useEffect(() => {
    call("");
  }, []);

  useEffect(() => {
    if (responseAddContent) {
      call("");
      setDialogOpen(false);
    }
  }, [responseAddContent, errorAddContent]);

  useEffect(() => {
    console.log("Response:", response);
    if (response) setAllowedContent(response.data);
  }, [response]);

  function handleAddContentType() {
    if (newContentType) {
      callAddContent(newContentType);
    }
  }

  return (
    <div>
      <MediaCountList mediaCount={allowedContent} />
      <div className=" flex justify-end pt-2">
        <Button onClick={() => setDialogOpen(true)}>Add content Type</Button>
      </div>
      <Modal
        title="Add ContentType"
        onClose={() => {}}
        open={dialogOpen}
        mainActionText="Add"
        secondaryActionText="Cancel"
        handleMainAction={handleAddContentType}
        handleSecondaryAction={() => setDialogOpen(false)}
      >
        <ContentTypeForm
          onChange={(name, description) =>
            setNewContentType({ name, description })
          }
        />
        {errorAddContent && (
          <p className="text-red-500 mt-2">{errorAddContent.message}</p>
        )}
      </Modal>
    </div>
  );
};
