import React from "react";
import { User } from "../../types/types";
import { Surface } from "../atoms/Surface/Surface";
import { UserIcon } from "@heroicons/react/24/outline";

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <Surface>
      <div className="flex items-center p-3 text-purple-400">
        <UserIcon className="h-12 w-12 text-purple-400" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl">{user.email}</h3>
        <div className="flex justify-between">
          <p>{user.name}</p>
          <p className="font-medium text-purple-400">{user.type}</p>
        </div>
      </div>
    </Surface>
  );
};

export default UserItem;
