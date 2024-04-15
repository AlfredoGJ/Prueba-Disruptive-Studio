import React from "react";
import { User } from "../../types/types";
import { Surface } from "../atoms/Surface/Surface";
import {
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface UserItemProps {
  user: User;
  onDeleteClick?: (user: User) => void;
  onEditClick?: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <Surface className="flex">
      <div className="flex items-center p-3 text-purple-400 basis-1/12">
        <UserIcon className="h-12 w-12 text-purple-400" />
      </div>
      <div className="flex flex-col justify-center basis-10/12">
        <h3 className="text-xl">{user.email}</h3>
        <div className="flex justify-start">
          <p>{`${user.name}  `  }</p>
          <p className="font-medium text-purple-400 ml-4">{user.type}</p>
        </div>
        <div className="flex justify-end">
          <TrashIcon
            className="w-6 h-6 text-purple-500 hover:text-red-500 hover:font-bold hover:scale-110"
            onClick={() => onDeleteClick && onDeleteClick(user)}
          />

          <PencilSquareIcon
            className="w-6 h-6 text-purple-500 hover:text-blue-500 hover:scale-110 "
            onClick={() => onEditClick && onEditClick(user)}
          />
        </div>
      </div>
    </Surface>
  );
};

export default UserItem;
