import React from "react";
import { Tabs } from "../molecules/Tabs/Tabs";
import { ContentAdmin } from "../organisms/ContentAdmin";
import { TopicsAdmin } from "../organisms/TopicsAdmin";
import UsersAdmin from "../organisms/UsersAdmin";
import FeedPage from "./Feedpage";

interface Props {
  // Define your props here
}

const Admin: React.FC<Props> = (props) => {
  let tabData = [
    {
      title: "Content Admin",
      tabUI: <div>Content Admin</div>,
      panelUI: <ContentAdmin />,
    },
    {
      title: "Topics Admin",
      tabUI: <div>Topics Admin</div>,
      panelUI: <TopicsAdmin />,
    },
    {
      title: "Users Admin",
      tabUI: <div>Users Admin</div>,
      panelUI: <UsersAdmin />,
    },
    {
      title: "Posts Feed",
      tabUI: <div>Feed</div>,
      panelUI: <FeedPage />,
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabsData={tabData}></Tabs>
    </div>
  );
};

export default Admin;
