import React from "react";
import { User } from "../../../types/types";
import { Button } from "../../atoms";
import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../../../utils/session/SessionUtils";

interface UserBannerProps {
  user: User;
}

export const UserBanner: React.FC<UserBannerProps> = ({ user }) => {
  const navigate = useNavigate();

  function handleLogout() {
    clearAccessToken();
    navigate("/");
  }
  const adminBgStyle = "bg-gradient-to-r from-sky-600 to-indigo-700";
  const creatorBgStyle = "bg-gradient-to-r from-sky-600 to-indigo-700";
  const readerBgStyle = "bg-gradient-to-r from-sky-600 to-indigo-700";
  const currentUserBgStyle =
    user.type === "ADMIN"
      ? adminBgStyle
      : user.type === "CREATOR"
      ? creatorBgStyle
      : readerBgStyle;
  return (
    <section className={`flex flex-col p-4 ${currentUserBgStyle}`}>
      <div className="flex flex-row justify-around">
        <div className="p-2 border-2 border-gray-500 rounded-full">
          <UserIcon className="h-20 w-20" />
        </div>
        <div className=" flex flex-col content-center">
          <div className="text-2xl font-semibold">{user.email}</div>
          <div>{user.name}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </section>
  );
};
