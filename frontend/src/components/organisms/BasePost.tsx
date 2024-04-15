import React, { useContext } from "react";
import { Surface } from "../atoms/Surface/Surface";
import { Post } from "../../types/types";
import { UserContext } from "../../context/UserContext";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ImagePostProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
  onDeleteClick?: (post: Post) => void;
  onEditClick?: (post: Post) => void;
}

const BasePost: React.FC<ImagePostProps> = ({
  post,
  children,
  onDeleteClick,
  onEditClick,
}) => {
  const [currentUser] = useContext(UserContext);

  const canDelete = currentUser?.type === "ADMIN";
  const canEdit =
    currentUser?.type === "ADMIN" || currentUser?.name === post.author;

  return (
    <Surface>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">{post.title}</h2>
        <h2 className="text">
          <span>topic: </span>
          <span className="text-purple-600">{post.topic}</span>
        </h2>
      </div>

      <div className="py-4 px-2">{children}</div>
      <div className="flex p-2 justify-end">
        <span>credits to: </span>
        <span className="text-purple-300">{post.author}</span>
      </div>
      <div className="flex p-2 justify-end">
        {canDelete && (
          <TrashIcon
            className="w-6 h-6 text-purple-500 hover:text-red-500 hover:font-bold hover:scale-110"
            onClick={() => onDeleteClick && onDeleteClick(post)}
          />
        )}

        {canEdit && (
          <PencilSquareIcon
            className="w-6 h-6 text-purple-500 hover:text-blue-500 hover:scale-110 "
            onClick={() => onEditClick && onEditClick(post)}
          />
        )}
      </div>
    </Surface>
  );
};

export default BasePost;
