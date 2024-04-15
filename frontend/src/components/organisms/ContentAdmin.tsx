import React, { useEffect } from "react";
import { MediaCountList } from "./MediaCount";
import { ContentType, ContentTypesEnum } from "../../types/types";
import { Button } from "../atoms";
import { Modal } from "../molecules/Modal/Modal";
import { ContentTypeForm } from "../molecules/ContentTypeForm.tsx/ContentTypeForm";
import { useAPI } from "../../hooks/useAPI";
import MediaType from "../molecules/MediaType";

interface ContentAdminProps {
  //   allowedContent: ContentType[];
}

export const ContentAdmin: React.FC<ContentAdminProps> = ({}) => {
  const [allowedContent, setAllowedContent] = React.useState<ContentType[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [tempContentType, setTempContentType] = React.useState<ContentType>();
  const [toDelete, setToDelete] = React.useState<ContentType>();
  const [callDelete, , responseDelete, errorDelete] = useAPI({
    endpoint: "deleteContentType",
    useAuth: true,
  });
  const [call, loading, response, error] = useAPI({
    endpoint: "getContentTypes",
  });
  const [
    callAddContent,
    loadingAddContent,
    responseAddContent,
    errorAddContent,
  ] = useAPI({ endpoint: "createContentType", useAuth: true });

  const [callUpdateContent, , responseUpdateContent, errorUpdateContent] =
    useAPI({ endpoint: "updateContentType", useAuth: true });

  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    call("");
  }, []);

  useEffect(() => {
    if (responseAddContent || responseDelete || responseUpdateContent) {
      call("");
      setDialogOpen(false);
    }
  }, [
    responseAddContent,
    errorAddContent,
    responseDelete,
    errorDelete,
    responseUpdateContent,
    errorUpdateContent,
  ]);

  useEffect(() => {
    if (response) setAllowedContent(response.data);
  }, [response]);

  function handleAddContentType() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const newContentType = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        type: formData.get("contentType[name]") as ContentTypesEnum,
      };

      if (tempContentType) {
        callUpdateContent(newContentType, tempContentType._id);
        setTempContentType(undefined);
      } else callAddContent(newContentType);
    }
  }

  function handleDeleteClick(contentType: ContentType) {
    setDeleteDialogOpen(true);
    setToDelete(contentType);
  }
  function handleContentTypeDelete() {
    callDelete("", toDelete?._id);
  }
  function handleContentEdit(contentType: ContentType) {
    setTempContentType(contentType);
    setDialogOpen(true);
  }

  function handleAddModalSecondaryAction() {
    setDialogOpen(false);
    setTempContentType(undefined);
  }

  return (
    <div>
      {allowedContent.map((media) => (
        <MediaType
          contentType={media}
          onDeleteClick={() => handleDeleteClick(media)}
          onEditClick={() => handleContentEdit(media)}
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
        handleMainAction={handleAddContentType}
        handleSecondaryAction={handleAddModalSecondaryAction}
      >
        <ContentTypeForm ref={formRef} initialContentType={tempContentType} />
        {errorAddContent && (
          <p className="text-red-500 mt-2">{errorAddContent.message}</p>
        )}
      </Modal>
      <Modal
        open={deleteDialogOpen}
        title="Delete content type"
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
